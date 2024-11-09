import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { getBase64 } from "@/lib/utils";
import { useClearCart, useGetCart, usePlaceOrder } from "@/services";
import CustomLoading from "@/components/Loader";
import withAuth from "@/components/withAuth";
import { Check, IndianRupee } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const CheckOutPage = () => {
  const { user } = useSelector((state) => state.auth);
  const getCart = useGetCart();
  const data = getCart.data;
  const [selectedTab, setSelectedTab] = useState("overview");
  const placeOrder = usePlaceOrder();
  const clearCart = useClearCart();
  const [orderId, setOrderId] = useState("");

  const [file, setFile] = useState(null);
  const [payError, setPayError] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    totalPrice: 0,
    totalQuantity: 0,
  });

  const [isFormComplete, setIsFormComplete] = useState(false); // New state for form completion
  const [isPaymentComplete, setIsPaymentComplete] = useState(false); // New state for payment completion

  useEffect(() => {
    getCart.mutate(user._id, {
      onSuccess: (data) => {
        setUserData((pv) => ({
          ...pv,
          totalPrice: data?.data?.cart.total,
          totalQuantity: data?.data?.cart.totalItems,
        }));
      },
    });
  }, [user]);

  useEffect(() => {
    const { name, email, phone, address, pincode } = userData;
    const allFieldsFilled =
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      address.trim() !== "" &&
      pincode.trim() !== "";
    setIsFormComplete(allFieldsFilled);
  }, [userData]);

  const handlePayemnt = async () => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/payment`,
      {
        amount: userData.totalPrice * 100,
      }
    );

    console.log(data);

    const options = {
      key: import.meta.env.VITE_RZP_KEY_ID,
      currency: data.currency,
      amount: data.amount,
      name: "MobiiWrap",
      description: "MobiiWrap Payment",
      image: "https://www.mobiiwrap.in/favicon.ico",
      order_id: data.id,
      handler: function (response) {
        if (response.razorpay_payment_id) {
          setIsPaymentComplete(true);
          setSelectedTab("acknowledgement");
          placeOrder.mutate({
            /* order data */
          });
        } else {
          setPayError(true);
          toast({
            title: "Payment Failed",
            description:
              "There was an issue processing your payment. Please try again.",
            variant: "destructive",
          });
        }
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (getCart.isError) {
    return (
      <div className="flex min-h-nav-full justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Error Fetching Products</h1>
          <p className="text-lg mt-4">
            An error occurred while fetching products. Please try again later
          </p>
        </div>
      </div>
    );
  }

  return getCart.isPending ? (
    <CustomLoading />
  ) : (
    <div className="px-2 flex flex-col">
      <Tabs
        onValueChange={(value) => {
          setSelectedTab(value);
        }}
        value={selectedTab}
      >
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value="overview">
            Overview
          </TabsTrigger>
          {isFormComplete && (
            <TabsTrigger className="flex-1" value="acknowledgement">
              Acknowledgement
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="overview">
          <h1>Confirm your details</h1>
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div className="w-full flex flex-col gap-2">
              <Input
                placeholder="Name"
                value={userData.name}
                onChange={(e) => {
                  setUserData((pv) => ({
                    ...pv,
                    name: e.target.value,
                  }));
                }}
              />
              <Input
                placeholder="Email"
                value={userData.email}
                onChange={(e) => {
                  setUserData((pv) => ({
                    ...pv,
                    email: e.target.value,
                  }));
                }}
              />
              <Input
                placeholder="Phone"
                value={userData.phone}
                onChange={(e) => {
                  setUserData((pv) => ({
                    ...pv,
                    phone: e.target.value,
                  }));
                }}
              />
              <Textarea
                rows={10}
                placeholder="Address"
                value={userData.address}
                onChange={(e) => {
                  setUserData((pv) => ({
                    ...pv,
                    address: e.target.value,
                  }));
                }}
              />
              <Input
                placeholder="Pincode"
                value={userData.pincode}
                onChange={(e) => {
                  setUserData((pv) => ({
                    ...pv,
                    pincode: e.target.value,
                  }));
                }}
              />
              <Button
                onClick={() => {
                  handlePayemnt({
                    currency: "INR",
                    amount: userData.totalPrice * 100,
                    id: uuidv4(),
                  });
                }}
                disabled={!isFormComplete}
              >
                Continue
              </Button>
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-2 justify-between items-center">
                {data?.data.cart.products.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-md flex w-full gap-2 p-2"
                    >
                      <img
                        className="h-auto w-1/2 aspect-square rounded-md"
                        src={product.item.image}
                        alt={product.item.name}
                      />
                      <div className="w-full flex justify-center flex-col gap-2">
                        {product.item.name}
                        <div className="flex justify-between items-center">
                          <span className="mr-3">Qty: {product.quantity}</span>
                          <span>INR {product.item.price}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <span className="mt-5 flex justify-between items-center">
                <h3>Grand Total</h3>
                <h3 className="flex items-center gap-1">
                  <IndianRupee /> {userData.totalPrice}
                </h3>
              </span>
              <span className="mb-5 flex justify-between items-center">
                <h3>Total Quantity</h3>
                <h3 className="flex items-center gap-1">
                  {userData.totalQuantity} nos.
                </h3>
              </span>
            </div>
          </div>
        </TabsContent>

        {isFormComplete && (
          <TabsContent value="acknowledgement">
            {/* {error ? (
              <>
                <X size={64} className="text-primary mx-auto" />
                <h3 className="text-center">
                  There was an error processing your payment
                </h3>
                <p className="text-center">
                  Your payment was unsuccessful. Please try again. If the amount
                  has been deducted from your account, it will be refunded
                  within 7-10 business days.
                </p>
              </>
            ) : ( */}
            <>
              <Check size={64} className="text-primary mx-auto" />
              <h3 className="text-center">Thank you for placing your order!</h3>
              <p className="text-center">
                Your order has been successfully placed. You will receive an
                email confirmation shortly.
              </p>
              <p className="text-center mt-5">
                Your order ID is{" "}
                <Link
                  className="text-blue-500"
                  to={`/order-details/${orderId}`}
                >
                  <strong>{orderId}</strong>
                </Link>
                <br />
                Keep this ID for future reference.
              </p>
            </>
            {/* )} */}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default withAuth(CheckOutPage);
