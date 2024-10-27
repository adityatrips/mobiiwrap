"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetCart } from "@/services/mutations";
import withAuth from "@/shared/withAuth";
import { AuthSliceState, UserCart } from "@/types";
import { Check, IndianRupee } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useSelector } from "react-redux";

const CheckoutOneProduct = () => {
  const { user } = useSelector((state: AuthSliceState) => state.auth);
  const oneProduct = useGetCart();
  const productData = oneProduct.data?.data as UserCart;
  const [selectedTab, setSelectedTab] = useState("overview");
  const [formData, setFormData] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  useEffect(() => {
    oneProduct.mutate(user!._id);
  }, [user]);

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

  console.log(productData);

  return (
    !oneProduct.isPending &&
    !oneProduct.isError && (
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
          <div className="flex flex-col gap-2 justify-between items-center">
            {productData.cart.products.map((product) => {
              console.log(product);
              return (
                <div
                  className="flex w-full items-center justify-between gap-5 border rounded-lg py-5"
                  key={product._id}
                >
                  <div>
                    <Image
                      src={product.item.image}
                      alt={product.item.name}
                      className="rounded"
                      width={100}
                      height={100}
                    />
                    <h4>{product.item.name}</h4>
                  </div>
                  <div>
                    <p className="text-right">{product.quantity} nos.</p>
                    <p className="text-right flex gap-1 items-center">
                      <IndianRupee size={16} /> {product.cost}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <span className="mt-5 flex justify-between items-center">
            <h3>Grand Total</h3>
            <h3 className="flex items-center gap-1">
              <IndianRupee /> {productData.cart.total}
            </h3>
          </span>
          <span className="mb-5 flex justify-between items-center">
            <h3>Total Quantity</h3>
            <h3 className="flex items-center gap-1">
              {productData.cart.totalItems} nos.
            </h3>
          </span>
          <Button
            onClick={() => {
              setSelectedTab("payment");
            }}
            className="mt-4 w-full"
          >
            Confirm the purchase
          </Button>
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
    )
  );
};

export default withAuth(CheckoutOneProduct);
