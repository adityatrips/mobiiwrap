"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useClearCart, useGetCart, usePlaceOrder } from "@/services/mutations";
import CustomLoading from "@/shared/CustomLoading";
import withAuth from "@/shared/withAuth";
import { AuthSliceState, UserCart } from "@/types";
import { Check, IndianRupee } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CheckoutOneProduct = () => {
  const { user } = useSelector((state: AuthSliceState) => state.auth);
  const { mutate, isPending, isSuccess, isError, data } = useGetCart();
  const [selectedTab, setSelectedTab] = useState("overview");
  const placeOrder = usePlaceOrder();
  const clearCart = useClearCart();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    totalPrice: 0,
    totalQuantity: 0,
  });

  useEffect(() => {
    mutate(user!._id, {
      onSuccess: (data) => {
        setUserData((pv) => ({
          ...pv,
          totalPrice: data?.data?.cart.total,
          totalQuantity: data?.data?.cart.totalItems,
        }));
      },
    });
  }, []);

  if (isError) {
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

  return isPending ? (
    <CustomLoading />
  ) : (
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
        <TabsTrigger className="flex-1" value="acknowledgement">
          Acknowledgement
        </TabsTrigger>
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
                placeOrder.mutate(
                  {
                    address: userData.address,
                    userId: user!._id,
                    payment: "cod",
                    phone: userData.phone,
                    pincode: userData.pincode,
                    products: data?.data.cart.products.map((product: any) => {
                      for (let i = 0; i < product.quantity; i++) {
                        return {
                          product: product.item._id,
                          quantity: product.quantity,
                        };
                      }
                    }),
                    total: userData.totalPrice.toString(),
                  },
                  {
                    onSuccess: () => {
                      clearCart.mutate(user!._id);
                      setSelectedTab("acknowledgement");
                    },
                  }
                );
              }}
            >
              Continue
            </Button>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-2 justify-between items-center">
              {data?.data.cart.products.map((product: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="border rounded-md flex w-full gap-2 p-2"
                  >
                    <Image
                      className="aspect-square rounded-md"
                      src={product.item.image}
                      alt={product.item.name}
                      height={100}
                      width={100}
                    />
                    <div className="w-full flex justify-center flex-col gap-2">
                      {product.item.name}
                      <div className="flex justify-between items-center">
                        <span className="mr-3">Qty: {product.quantity}</span>
                        <span>$ {product.item.price}</span>
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

      <TabsContent value="acknowledgement">
        <Check size={64} className="text-primary mx-auto" />
        <h3 className="text-center">Thank you for placing your order!</h3>
        <p className="text-center">
          Your order has been successfully placed. You will receive an email
          confirmation shortly.
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default withAuth(CheckoutOneProduct);
