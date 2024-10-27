/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";

import { toTitleCase } from "@/utils/str_fuctions";
import { mobiles } from "@/app/models";
import { useGetOneProduct } from "@/services/mutations";
import { AuthSliceState, Product } from "@/types";
import CustomLoading from "@/shared/CustomLoading";
import Image from "next/image";
import { useAddToCartMut } from "@/services/mutations";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface OneProductPageProps {
  params: {
    productId: string;
  };
}

const OneProductPage = ({ params: { productId } }: OneProductPageProps) => {
  const { toast } = useToast();

  const [brand, setBrand] = useState<keyof typeof mobiles>("apple");
  const [model, setModel] = useState("16_pro");
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCartMut();
  const { isLoggedIn, user } = useSelector(
    (state: AuthSliceState) => state.auth
  );

  const { data, isSuccess, isError, isPending, mutate } = useGetOneProduct();

  const product: Product = data?.data;

  useEffect(() => {
    mutate(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const rzpPaymentForm = document.getElementById("rzp_payment_form");

    if (!rzpPaymentForm?.hasChildNodes()) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.async = true;
      script.dataset.payment_button_id = "pl_PCy6jdzV9SFLCC";
      rzpPaymentForm?.appendChild(script);
    }
  });

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

  return !isSuccess || isPending ? (
    <CustomLoading />
  ) : (
    <>
      <div className="flex flex-col md:flex-row gap-4 justify-start items-center">
        <Image
          alt={"Apple iPhone"}
          className="h-auto w-full md:w-2/6 rounded-lg object-cover"
          height={1280}
          src={product.image}
          width={720}
        />
        <div className="flex flex-col w-full md:w-4/6 max-w-[30%] justify-start gap-2">
          <p className="text-sm text-primary my-0 py-0 font-[900] tracking-widest">
            {product.category.name.toLowerCase()}
          </p>
          <h2 className="mt-0 pt-0">
            {toTitleCase(productId!.replaceAll("-", " "))}
          </h2>
          <div className="flex items-start">
            <span className="mr-1">₹</span>
            <span className="flex items-end">
              <span className="text-4xl">{product.price}</span>
              <span className="ml-1 line-through">899</span>
            </span>
          </div>

          <Select
            value={brand}
            onValueChange={(e: any) => {
              setBrand(e);
            }}
          >
            <SelectTrigger>{toTitleCase(brand)}</SelectTrigger>
            <SelectContent>
              {Object.keys(mobiles).map((product) => (
                <SelectItem key={product} value={product}>
                  {toTitleCase(product)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={model}
            onValueChange={(e: any) => {
              setModel(e);
            }}
          >
            <SelectTrigger>
              {toTitleCase(model.replaceAll("_", " "))}
            </SelectTrigger>
            <SelectContent>
              {mobiles[brand].map((product) => (
                <SelectItem key={product} value={product}>
                  {toTitleCase(product.replaceAll("_", " "))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="border border-white rounded-lg w-full  gap-5 flex items-center justify-between">
            <Button
              className="rounded-r-none"
              onClick={() => {
                if (quantity > 1) setQuantity(quantity - 1);
              }}
            >
              <Minus size={28} />
            </Button>
            <span className="text-center">{quantity}</span>
            <Button
              className="rounded-l-none"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              <Plus size={28} />
            </Button>
          </div>
          <div className="flex flex-row md:flex-col w-full">
            <form id="rzp_payment_form"></form>
            <Button
              className="flex w-full justify-between"
              onClick={() => {
                if (!isLoggedIn) {
                  toast({
                    title: "Error",
                    description: "Please login to add to cart",
                    variant: "destructive",
                  });
                  return;
                }
                addToCart.mutate({
                  productId: product._id,
                  quantity: quantity,
                  phoneBrand: brand,
                  phoneModel: model,
                  cost: product.price * quantity,
                  userId: user!._id,
                });
                toast({
                  title: "Success",
                  description: "Product added to cart",
                });
              }}
            >
              Add to cart
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="flex flex-col mb-5 w-full md:w-[30%]">
        <h3 className="text-lg font-semibold">
          Watch our expert apply the skin.
        </h3>
        <small className="text-sm">(because why not?)</small>
      </div>
      <iframe
        className="w-full h-auto aspect-video rounded-lg"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      <h4 className="mt-5 text-lg font-semibold">
        Some use&ldquo;less&rdquo; information
      </h4>
      <p className="text-sm leading-relaxed">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ipsum in
        quia quaerat culpa ipsa sunt deserunt modi sapiente eos, numquam nulla
        adipisci tempora eveniet veniam error neque? At facilis nulla,
        reprehenderit eligendi omnis et delectus tenetur ab aspernatur voluptate
        placeat quidem quisquam dolorum neque cupiditate ipsam quaerat eos amet
        ratione consectetur fugiat consequuntur quo? Nesciunt, totam alias?
        Laudantium vitae ullam a culpa, accusamus optio ut ad. Molestias ab
        libero veritatis laudantium, consequuntur nemo maxime aspernatur optio
        minus praesentium nihil, voluptas nam esse debitis! Nemo, perferendis!
        Quam ad cumque atque magni? Optio commodi harum laudantium sapiente
        ullam maxime obcaecati eaque.
      </p>
    </>
  );
};

export default OneProductPage;
