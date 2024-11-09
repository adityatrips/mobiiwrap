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
      <div className="flex min-h-screen justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">
            Error Fetching Product
          </h1>
          <p className="text-lg mt-4 text-gray-500">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return getOneProduct.isPending &&
    getOneProduct.data != undefined &&
    getOneProduct.data != null ? (
    <CustomLoading />
  ) : (
    <>
      <div className="px-6 md:px-12 flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            alt={product?.name}
            className="w-full max-w-xs rounded-lg shadow-lg hover:scale-110 transition-all duration-300"
            src={product?.image}
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-start gap-6">
          <p className="text-sm text-primary font-bold tracking-wide uppercase">
            {product?.category.name}
          </p>
          <h2 className="text-3xl font-semibold">
            {toTitleCase(id.replaceAll("-", " "))}
          </h2>
          <div className="flex items-baseline gap-2 text-lg">
            <span className="text-xl font-bold">₹</span>
            <span className="text-4xl font-extrabold">{product?.price}</span>
            <span className="text-sm line-through text-gray-500">
              {product?.slug === "dirty-money" ? "2000" : "899"}
            </span>
          </div>

          <Select
            value={brand}
            onValueChange={(e) => {
              setBrand(e);
              setModel(mobiles[e][0]);
            }}
          >
            <SelectTrigger className="h-10 border rounded-md shadow-sm">
              {toTitleCase(brand)}
            </SelectTrigger>
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
            <SelectTrigger className="h-10 border rounded-md shadow-sm">
              {toTitleCase(model.replaceAll("_", " "))}
            </SelectTrigger>
            <SelectContent>
              {mobiles[brand].map((product) => (
                <SelectItem key={product} value={product}>
                  {toTitleCase(product?.replaceAll("_", " "))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center justify-between gap-4 border border-gray-300 rounded-lg">
            <Button
              className="aspect-square size-10"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <Minus size={24} />
            </Button>
            <span className="text-2xl font-semibold">{quantity}</span>
            <Button
              className="aspect-square size-10"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={24} />
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Button onClick={handleAddToCart} className="md:w-full">
              Add to Cart
              <ShoppingCart />
            </Button>
            <Button
              variant={"secondary"}
              onClick={handleBuyNow}
              className="md:w-full"
            >
              Buy Now
              <IndianRupee />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 container mx-auto p-8 border rounded-lg shadow-lg space-y-8">
        <h3 className="text-2xl font-semibold text-center">Why Mobiiwrap?</h3>
        <p className="text-lg text-center">
          Discover premium phone skins designed to enhance style and protect
          your device.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "High-Quality Materials",
              description:
                "Durable and resilient, providing long-lasting style.",
            },
            {
              title: "Precision Fit",
              description:
                "Designed to fit your device perfectly, adding a sleek premium look.",
            },
            {
              title: "Residue-Free Removal",
              description:
                "Easily removable without leaving any residue behind.",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <span className="text-green-500 text-2xl">✔</span>
              <div>
                <h4 className="text-xl font-semibold">{item.title}</h4>
                <p className="text-lg">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h5 className="text-xl font-semibold">Application Tips</h5>
          <p className="text-lg mt-2">
            Start from the center and press outward for a smooth, bubble-free
            application. Align carefully for a flawless finish.
          </p>
        </div>

        <div>
          <h5 className="text-xl font-semibold">Our Guarantee</h5>
          <p className="text-lg mt-2">
            Crafted with quality in mind, Mobiiwrap skins provide the best
            combination of style, protection, and durability.
          </p>
        </div>
      </div>
    </>
  );
};

export default OneProductPage;
