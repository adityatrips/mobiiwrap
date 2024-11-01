"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { getBase64 } from "@/lib/utils";
import { useClearCart, useGetCart, usePlaceOrder } from "@/services/mutations";
import CustomLoading from "@/shared/CustomLoading";
import withAuth from "@/shared/withAuth";
import { AuthSliceState } from "@/types";
import { encodeBase64 } from "bcryptjs";
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
  const [orderId, setOrderId] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [upiError, setUpiError] = useState("");

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
  }, [mutate, user]);

  // useEffect(() => {
  //   // Check if all required fields are filled
  //   const { name, email, phone, address, pincode } = userData;
  //   setIsFormComplete(name && email && phone && address && pincode);
  // }, [userData]);

  useEffect(() => {
    // Check if all required fields are filled
    const { name, email, phone, address, pincode } = userData;
    // Make sure all required fields are checked and set to boolean
    const allFieldsFilled =
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      address.trim() !== "" &&
      pincode.trim() !== "";
    setIsFormComplete(allFieldsFilled);
  }, [userData]);

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
    <div className="container mx-auto px-2 mt-20 flex flex-col">
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
          {userData.pincode !== "" && (
            <TabsTrigger className="flex-1" value="payment">
              Payment
            </TabsTrigger>
          )}
          {file != null && (
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
                  setSelectedTab("payment");
                }}
                disabled={!isFormComplete} // Disable button if form is incomplete
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
        <TabsContent value={"payment"}>
          <h1>Payment</h1>
          <p>
            Scan the QR and send the <b>Rs. {userData.totalPrice}</b> to the
            following QR code via UPI or to this API handle{" "}
            <b>7838880955@ptsbi</b>
          </p>
          <b>
            <small>We will make a RazorPay gateway soon!</small>
          </b>
          <Image
            width={1000}
            height={1000}
            alt="QR Code"
            src={"/paytm_qr.jpeg"}
            className="w-full h-auto"
          />
          <div className="flex flex-col gap-4">
            <Label className="mt-10">
              Upload the transaction detail (pdf/image)
              <Input
                onChange={(e) => {
                  const file = e.target.files![0];
                  if (!file) return;
                  setFile(file);
                }}
                className="mt-2"
                type="file"
              />
            </Label>
            <Label>
              <Input
                value={upiError}
                onChange={(e) => setUpiError(e.target.value)}
                placeholder="For any UPI related issues, write below."
              />
            </Label>
            <Button
              onClick={async () => {
                if (file != null) {
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
                            phoneBrand: product.phoneBrand,
                            phoneModel: product.phoneModel,
                            product: product.item._id,
                            quantity: product.quantity,
                          };
                        }
                      }),
                      total: userData.totalPrice.toString(),
                      paymentProof: await getBase64(file),
                    },
                    {
                      onSuccess: (data) => {
                        setSelectedTab("acknowledgement");
                        clearCart.mutate(user!._id);
                        setOrderId(data?.data.id);
                      },
                    }
                  );
                } else
                  toast({
                    title: "Error",
                    description: "Please upload the transaction detail.",
                    variant: "destructive",
                  });
              }}
            >
              Proceed!
            </Button>
          </div>
        </TabsContent>
        {isFormComplete && (
          <TabsContent value="acknowledgement">
            <Check size={64} className="text-primary mx-auto" />
            <h3 className="text-center">Thank you for placing your order!</h3>
            <p className="text-center">
              Your order has been successfully placed. You will receive an email
              confirmation shortly.
            </p>
            <p className="text-center mt-5">
              Your order ID is <strong>{orderId}</strong> <br />
              Keep this ID for future reference.
            </p>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default withAuth(CheckoutOneProduct);

// 'use client';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Textarea } from '@/components/ui/textarea';
// import { useClearCart, useGetCart, usePlaceOrder } from '@/services/mutations';
// import CustomLoading from '@/shared/CustomLoading';
// import withAuth from '@/shared/withAuth';
// import { AuthSliceState, UserCart } from '@/types';
// import { Check, IndianRupee } from 'lucide-react';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// const CheckoutOneProduct = () => {
//   const { user } = useSelector((state: AuthSliceState) => state.auth);
//   const { mutate, isPending, isSuccess, isError, data } = useGetCart();
//   const [selectedTab, setSelectedTab] = useState('overview');
//   const placeOrder = usePlaceOrder();
//   const clearCart = useClearCart();

//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     pincode: '',
//     totalPrice: 0,
//     totalQuantity: 0,
//   });

//   useEffect(() => {
//     mutate(user!._id, {
//       onSuccess: (data) => {
//         setUserData((pv) => ({
//           ...pv,
//           totalPrice: data?.data?.cart.total,
//           totalQuantity: data?.data?.cart.totalItems,
//         }));
//       },
//     });
//   }, []);

//   if (isError) {
//     return (
//       <div className='flex min-h-nav-full justify-center items-center'>
//         <div className='text-center'>
//           <h1 className='text-3xl font-bold'>Error Fetching Products</h1>
//           <p className='text-lg mt-4'>
//             An error occurred while fetching products. Please try again later
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return isPending ? (
//     <CustomLoading />
//   ) : (
//     <Tabs
//       onValueChange={(value) => {
//         setSelectedTab(value);
//       }}
//       value={selectedTab}
//     >
//       <TabsList className='w-full'>
//         <TabsTrigger className='flex-1' value='overview'>
//           Overview
//         </TabsTrigger>
//         <TabsTrigger className='flex-1' value='acknowledgement'>
//           Acknowledgement
//         </TabsTrigger>
//       </TabsList>
//       <TabsContent value='overview'>
//         <h1>Confirm your details</h1>

//         <div className='flex flex-col md:flex-row justify-between gap-2'>
//           <div className='w-full flex flex-col gap-2'>
//             <Input
//               placeholder='Name'
//               value={userData.name}
//               onChange={(e) => {
//                 setUserData((pv) => ({
//                   ...pv,
//                   name: e.target.value,
//                 }));
//               }}
//             />
//             <Input
//               placeholder='Email'
//               value={userData.email}
//               onChange={(e) => {
//                 setUserData((pv) => ({
//                   ...pv,
//                   email: e.target.value,
//                 }));
//               }}
//             />
//             <Input
//               placeholder='Phone'
//               value={userData.phone}
//               onChange={(e) => {
//                 setUserData((pv) => ({
//                   ...pv,
//                   phone: e.target.value,
//                 }));
//               }}
//             />
//             <Textarea
//               rows={10}
//               placeholder='Address'
//               value={userData.address}
//               onChange={(e) => {
//                 setUserData((pv) => ({
//                   ...pv,
//                   address: e.target.value,
//                 }));
//               }}
//             />
//             <Input
//               placeholder='Pincode'
//               value={userData.pincode}
//               onChange={(e) => {
//                 setUserData((pv) => ({
//                   ...pv,
//                   pincode: e.target.value,
//                 }));
//               }}
//             />
//             <Button
//               onClick={() => {
//                 placeOrder.mutate(
//                   {
//                     address: userData.address,
//                     userId: user!._id,
//                     payment: 'cod',
//                     phone: userData.phone,
//                     pincode: userData.pincode,
//                     products: data?.data.cart.products.map((product: any) => {
//                       for (let i = 0; i < product.quantity; i++) {
//                         return {
//                           product: product.item._id,
//                           quantity: product.quantity,
//                         };
//                       }
//                     }),
//                     total: userData.totalPrice.toString(),
//                   },
//                   {
//                     onSuccess: () => {
//                       clearCart.mutate(user!._id);
//                       setSelectedTab('acknowledgement');
//                     },
//                   }
//                 );
//               }}
//             >
//               Continue
//             </Button>
//           </div>
//           <div className='w-full'>
//             <div className='flex flex-col gap-2 justify-between items-center'>
//               {data?.data.cart.products.map((product: any, index: number) => {
//                 return (
//                   <div
//                     key={index}
//                     className='border rounded-md flex w-full gap-2 p-2'
//                   >
//                     <Image
//                       className='aspect-square rounded-md'
//                       src={product.item.image}
//                       alt={product.item.name}
//                       height={100}
//                       width={100}
//                     />
//                     <div className='w-full flex justify-center flex-col gap-2'>
//                       {product.item.name}
//                       <div className='flex justify-between items-center'>
//                         <span className='mr-3'>Qty: {product.quantity}</span>
//                         <span>INR {product.item.price}</span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             <span className='mt-5 flex justify-between items-center'>
//               <h3>Grand Total</h3>
//               <h3 className='flex items-center gap-1'>
//                 <IndianRupee /> {userData.totalPrice}
//               </h3>
//             </span>
//             <span className='mb-5 flex justify-between items-center'>
//               <h3>Total Quantity</h3>
//               <h3 className='flex items-center gap-1'>
//                 {userData.totalQuantity} nos.
//               </h3>
//             </span>
//           </div>
//         </div>
//       </TabsContent>

//       <TabsContent value='acknowledgement'>
//         <Check size={64} className='text-primary mx-auto' />
//         <h3 className='text-center'>Thank you for placing your order!</h3>
//         <p className='text-center'>
//           Your order has been successfully placed. You will receive an email
//           confirmation shortly.
//         </p>
//       </TabsContent>
//     </Tabs>
//   );
// };

// export default withAuth(CheckoutOneProduct);
