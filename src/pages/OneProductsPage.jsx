import { useEffect, useState } from "react";
import { IndianRupee, Minus, Plus, ShoppingCart } from "lucide-react";

import { toTitleCase } from "@/utils/strFunctions";
import { mobiles } from "@/models";
import CustomLoading from "@/components/Loader";
import { useAddToCartMut, useGetOneProduct } from "@/services";
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
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const OneProductPage = () => {
  const { toast } = useToast();
  const { id } = useParams();

  const [brand, setBrand] = useState("apple");
  const [model, setModel] = useState("16_pro");
  const [quantity, setQuantity] = useState(1);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const addToCart = useAddToCartMut();
  const getOneProduct = useGetOneProduct();
  const product = getOneProduct.data?.data;

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast({
        title: "Error",
        description: "Please login to add to cart",
        variant: "destructive",
      });
      return;
    }

    console.log({
      productId: product._id,
      quantity,
      phoneBrand: brand,
      phoneModel: model,
      cost: product.price,
      userId: user._id,
    });
    addToCart.mutate({
      productId: product._id,
      quantity,
      phoneBrand: brand,
      phoneModel: model,
      cost: product.price,
      userId: user._id,
    });
    toast({
      title: "Success",
      description: "Product added to cart",
    });
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Error",
        description: "Please login to buy",
        variant: "destructive",
      });
      return;
    }
    addToCart.mutate(
      {
        productId: product._id,
        quantity,
        phoneBrand: brand,
        phoneModel: model,
        cost: product.price,
        userId: user._id,
      },
      {
        onSettled: (data, error) => {
          console.log({
            data,
            error,
          });
          navigate("/checkout");
        },
      }
    );
  };

  useEffect(() => {
    getOneProduct.mutate(id);
  }, []);

  if (getOneProduct.isError) {
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

  return getOneProduct.isPending ? (
    <CustomLoading />
  ) : (
    <>
      <div className="px-2 flex flex-col md:flex-row gap-4 justify-start items-center">
        <img
          alt={"Apple iPhone"}
          className="h-auto w-full md:w-2/6 rounded-lg object-cover"
          src={getOneProduct.data?.data?.image}
        />
        <div className="flex flex-col w-full md:w-4/6 md:max-w-[30%] justify-start gap-2">
          <p className="text-sm text-primary my-0 py-0 font-[900] tracking-widest">
            {getOneProduct.data?.data.category.name.toLowerCase()}
          </p>
          <h2 className="mt-0 pt-0">{toTitleCase(id.replaceAll("-", " "))}</h2>
          <div className="flex items-start">
            <span className="mr-1">₹</span>
            <span className="flex items-end">
              <span className="text-4xl">{getOneProduct.data?.data.price}</span>
              <span className="ml-1 line-through">
                {getOneProduct.data?.data.slug === "dirty-money"
                  ? "2000"
                  : "899"}
              </span>
            </span>
          </div>

          <Select
            value={brand}
            onValueChange={(e) => {
              setBrand(e);
              setModel(mobiles[e][0]);
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
            onValueChange={(e) => {
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
          <div className="flex gap-2 flex-row w-full">
            <Button
              className="flex w-full justify-between"
              onClick={handleAddToCart}
            >
              Add to cart
              <ShoppingCart />
            </Button>
            <Button
              variant={"secondary"}
              className="flex w-full justify-between"
              onClick={handleBuyNow}
            >
              Buy Now
              <IndianRupee />
            </Button>
          </div>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="mx-auto container p-6 rounded-lg shadow-lg">
        <h4 className="mt-5 text-lg font-semibold text-center ">
          Why Mobiiwrap?
        </h4>
        <p className="text-sm leading-relaxed mt-3 text-center">
          Discover our premium phone skins, designed to provide both style and
          protection. Each Mobiiwrap skin offers a precision fit, enhancing your
          device with a sleek look, without the bulk of a traditional case.
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✔
            </span>
            <div>
              <strong className="text-md font-semibold ">
                High-Quality Materials
              </strong>
              <p className="text-sm">
                Durable and resilient, offering long-lasting style for any
                lifestyle.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✔
            </span>
            <div>
              <strong className="text-md font-semibold ">Precision Fit</strong>
              <p className="text-sm">
                Designed to fit perfectly, giving your device a sleek, premium
                look.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✔
            </span>
            <div>
              <strong className="text-md font-semibold ">
                Residue-Free Removal
              </strong>
              <p className="text-sm">
                Easily removable without leaving any residue behind.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h5 className="text-md font-semibold ">Application Tips</h5>
          <p className="text-sm mt-2">
            Ensure a smooth, bubble-free application by starting from the center
            and pressing outward. Align carefully and press firmly for a
            flawless finish.
          </p>
        </div>

        <div className="mt-6">
          <h5 className="text-md font-semibold ">Our Guarantee</h5>
          <p className="text-sm mt-2">
            Each Mobiiwrap skin is crafted with quality, ensuring you get the
            best combination of style and protection.
          </p>
        </div>
      </div>
    </>
  );
};

export default OneProductPage;
