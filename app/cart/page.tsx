"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useGetCart, useRemoveFromCartMut } from "@/services/mutations";
import CustomLoading from "@/shared/CustomLoading";
import withAuth from "@/shared/withAuth";
import { AuthSliceState } from "@/types";
import { toTitleCase } from "@/utils/str_fuctions";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const userId = useSelector((state: AuthSliceState) => state.auth.user?._id);
  const { data, isPending, isError, mutate } = useGetCart();
  const queryClient = useQueryClient();
  const removeFromCart = useRemoveFromCartMut();
  const router = useRouter();
  const { toast } = useToast();

  const cart = data?.data.cart || [];

  useEffect(() => {
    mutate(userId!);
  }, []);

  const handleRemoveFromCart = async (productId: string) => {
    await removeFromCart.mutateAsync(
      { userId: userId!, productId },
      {
        onSuccess: async () => {
          toast({
            title: "Success",
            description: "Product removed from cart",
          });
          mutate(userId!);
        },
      }
    );
  };
  const isCartEmpty = () => {
    return cart.products.length === 0;
  };

  const handleCheckout = () => {
    if (isCartEmpty()) {
      toast({
        title: "Cart is Empty",
        description: "You cannot proceed to checkout with an empty cart.",
        variant: "destructive", // Assuming you have a destructive toast variant
      });
      return;
    }
    router.push("/checkout");
  };

  if (isError) {
    return (
      <div className="container mx-auto px-2 mt-20 flex min-h-nav-full justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Error Fetching Products</h1>
          <p className="text-lg mt-4">
            An error occurred while fetching products. Please try again later
          </p>
        </div>
      </div>
    );
  }

  return isPending || data == undefined ? (
    <CustomLoading />
  ) : (
    <div className="flex min-h-nav-full">
      <div className="hidden md:w-1/2 md:flex items-center justify-center">
        <h1>Shopping Cart</h1>
      </div>

      <div className="flex flex-col justify-center gap-5">
        {cart.products.map((product: any, index: number) => (
          <div key={index} className="flex gap-5 border rounded-md p-5">
            <div className="relative">
              <Image
                src={product.item.image}
                alt={product.item.name}
                width={150}
                height={150}
              />
              <X
                onClick={() => {
                  handleRemoveFromCart(product._id);
                }}
                className="bg-red-700 absolute top-0 right-0 cursor-pointer"
              />
            </div>
            <div className="flex w-full justify-between">
              <div className="flex flex-col gap-2">
                <h3>{product.item.name}</h3>
                <small>
                  {toTitleCase(product.phoneBrand)}&nbsp;
                  {toTitleCase(product.phoneModel.replace("_", " "))}
                </small>
              </div>

              <div className="flex flex-col items-end justify-between">
                <span className="flex flex-col gap-2">
                  <h4>{product.cost}</h4>
                  <small>Qty: {product.quantity}</small>
                </span>
                <h3>Total: {product.cost * product.quantity}</h3>
              </div>
            </div>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <h2>Total</h2>
          <h2>{cart.total}</h2>
        </div>
        {/* <Button onClick={() => router.push('/checkout')}>Checkout</Button> */}
        <Button onClick={handleCheckout} className="w-full mt-4">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default withAuth(CartPage);
