"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetOneProduct } from "@/services/queries";
import CustomLoading from "@/shared/CustomLoading";
import { toTitleCase } from "@/utils/str_fuctions";
import { Check } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const CheckoutOneProduct = ({
  params: { productId },
}: {
  params: {
    productId: string;
  };
}) => {
  const oneProduct = useGetOneProduct(productId);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [formData, setFormData] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e: any) => {
    setFormData({ ...formData, focus: e.target.name });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (oneProduct.isError) {
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

  console.log(oneProduct.data?.data);

  return oneProduct.isPending ? (
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
        <TabsTrigger className="flex-1" value="payment">
          Payment
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="acknowledgement">
          Acknowledgement
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="flex flex-col md:flex-row gap-4 container justify-between items-center mx-auto">
          <Image
            alt={"Apple iPhone"}
            className="h-auto w-full md:w-2/6 rounded-lg object-cover"
            height={1280}
            src={oneProduct.data.data.image}
            width={720}
          />
          <div className="flex flex-col w-full md:w-4/6 justify-start gap-2">
            <p className="text-sm text-primary my-0 py-0 font-[900] tracking-widest">
              {oneProduct.data.data.category.name.toLowerCase()}
            </p>
            <h2 className="mt-0 pt-0">
              {toTitleCase(productId!.replaceAll("-", " "))}
            </h2>
            <div className="flex items-start">
              <span>₹</span>
              <span className="flex items-end">
                <span className="text-4xl">{oneProduct.data.data.price}</span>
                <span>00</span>
              </span>
            </div>
            <Button
              onClick={() => {
                setSelectedTab("payment");
              }}
              className="mt-4 w-full"
            >
              Confirm the purchase
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="payment">
        <Cards
          cvc={formData.cvc}
          expiry={formData.expiry}
          // @ts-expect-error This works don't touch.
          focused={formData.focus}
          name={formData.name}
          number={formData.number}
        />
        <form className="mt-6 w-full flex flex-col gap-2">
          <Input
            type="tel"
            name="number"
            placeholder="Card Number"
            className="w-full"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            type="text"
            name="expiry"
            placeholder="Expiry (MM/YY)"
            className="w-full"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            type="tel"
            name="cvc"
            placeholder="CVC"
            className="w-full"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />

          <Button
            onClick={() => {
              setSelectedTab("acknowledgement");
            }}
            className="w-full"
          >
            Pay Now
          </Button>
        </form>
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

export default CheckoutOneProduct;
