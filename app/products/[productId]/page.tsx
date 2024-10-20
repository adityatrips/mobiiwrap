/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { IndianRupee, Minus, Plus, ShoppingCart } from "lucide-react";

import { toTitleCase } from "@/utils/str_fuctions";
import { mobiles } from "@/app/models";
import { useGetOneProduct } from "@/services/queries";
import { AuthSliceState, Product } from "@/types";
import CustomLoading from "@/shared/CustomLoading";
import Image from "next/image";
import { useAddToCartMut } from "@/services/mutations";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface OneProductPageProps {
  params: {
    productId: string;
  };
}

const OneProductPage = ({ params: { productId } }: OneProductPageProps) => {
  const [brand, setBrand] = useState<keyof typeof mobiles>("apple");
  const [model, setModel] = useState("16_pro");
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCartMut();
  const router = useRouter();
  const { user } = useSelector((state: AuthSliceState) => state.auth);

  const { data, isSuccess, isError, isPending } = useGetOneProduct(productId);

  const product: Product = data?.data;

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
      <div className="flex flex-col md:flex-row gap-4 container justify-between items-center mx-auto">
        <Image
          alt={"Apple iPhone"}
          className="h-auto w-full md:w-2/6 rounded-lg object-cover"
          height={1280}
          src={product.image}
          width={720}
        />
        <div className="flex flex-col w-full md:w-4/6 justify-start gap-2">
          <p className="text-sm text-primary my-0 py-0 font-[900] tracking-widest">
            {product.category.name.toLowerCase()}
          </p>
          <h2 className="mt-0 pt-0">
            {toTitleCase(productId!.replaceAll("-", " "))}
          </h2>
          <div className="flex items-start">
            <span>₹</span>
            <span className="flex items-end">
              <span className="text-4xl">{product.price}</span>
              <span>00</span>
            </span>
          </div>

          <Select
            value={brand}
            onValueChange={(e: any) => {
              setBrand(e.currentKey!);
            }}
          >
            <SelectContent>
              {Object.keys(mobiles).map((product) => {
                return (
                  <SelectItem key={product} value={product}>
                    {toTitleCase(product)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select
            value={model}
            onValueChange={(e: any) => {
              setModel(e.currentKey);
            }}
          >
            <SelectContent>
              {mobiles[brand].map((product) => {
                return (
                  <SelectItem key={product} value={product}>
                    {toTitleCase(product.replaceAll("_", " "))}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <div className="w-full gap-5 flex items-center justify-between">
            <Button
              className="flex-[0.2]"
              onClick={() => {
                if (quantity > 1) setQuantity(quantity - 1);
              }}
            >
              <Minus size={28} />
            </Button>
            <span className="flex-[0.6] text-center">{quantity}</span>
            <Button
              className="flex-[0.2]"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              <Plus size={28} />
            </Button>
          </div>
          <div className="flex gap-4 w-full">
            <Button
              className="flex w-full justify-between"
              color="primary"
              variant="outline"
              onClick={() => {
                router.push(`/checkout/${product.slug}`);
              }}
            >
              Buy Now
              <IndianRupee />
            </Button>
            <Button
              className="flex w-full justify-between"
              onClick={() => {
                addToCart.mutate({
                  productId: product._id,
                  quantity: quantity,
                  phoneBrand: brand,
                  phoneModel: model,
                  cost: product.price * quantity,
                  userId: user!._id,
                });
                toast.success("Added to cart");
              }}
            >
              Add to cart
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </div>
      <Separator className="my-5" />
      <h3>You might also like (WIP)</h3>
    </>
  );
};

export default OneProductPage;
