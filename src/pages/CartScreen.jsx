import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useGetCart, useRemoveFromCartMut } from "@/services";
import CustomLoading from "@/components/Loader";
import withAuth from "@/components/withAuth";
import { toTitleCase } from "@/utils/strFunctions";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IndianRupee } from "lucide-react";
import axios from "axios";

const CartPage = () => {
  const userId = useSelector((state) => state.auth.user?._id);
  const getCart = useGetCart();
  const removeFromCart = useRemoveFromCartMut();
  const navigate = useNavigate();
  const { toast } = useToast();

  const cart = getCart.data?.data.cart || [];

  useEffect(() => {
    getCart.mutate(userId);
  }, []);

  const handleRemoveFromCart = async (productId) => {
    await removeFromCart.mutateAsync(
      { userId: userId, productId },
      {
        onSuccess: async () => {
          toast({
            title: "Success",
            description: "Product removed from cart",
          });
          getCart.mutate(userId);
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
        variant: "destructive",
      });
      return;
    }
    navigate("/checkout");
  };

  if (getCart.isError) {
    return (
      <div className="px-2 flex min-h-nav-full justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Error Fetching Products</h1>
          <p className="text-lg mt-4">
            An error occurred while fetching products. Please try again later
          </p>
        </div>
      </div>
    );
  }

  if (getCart.data?.data.cart.products.length === 0) {
    return (
      <div className="px-2 flex min-h-nav-full justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Cart is Empty</h1>
          <p className="text-lg mt-4">You have no products in your cart</p>
        </div>
      </div>
    );
  }

  return getCart.isPending || getCart.data == undefined ? (
    <CustomLoading />
  ) : (
    <div className="flex gap-10 min-h-nav-full">
      <div className="hidden md:w-1/2 md:flex items-center justify-center">
        <h1>Shopping Cart</h1>
      </div>

      <div className="md:w-1/2 w-full flex flex-col justify-center gap-5">
        {cart.products.map((product, index) => (
          <div key={index} className="w-full flex gap-5 border rounded-md p-5">
            <div className="relative w-1/2 rounded overflow-hidden">
              <img src={product.item.image} alt={product.item.name} />
              <X
                onClick={() => {
                  handleRemoveFromCart(product._id);
                }}
                className="bg-red-700 rounded absolute top-0 right-0 cursor-pointer"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <h3>{product.item.name}</h3>
                <small>
                  {toTitleCase(product.phoneBrand)}&nbsp;
                  {toTitleCase(product.phoneModel.replace("_", " "))}
                </small>
              </div>

              <div className="flex flex-col justify-between">
                <span className="flex flex-col">
                  <h4 className="flex items-center gap-2">
                    <IndianRupee />
                    {product.cost}
                  </h4>
                  <div className="rounded flex justify-between items-center mt-2">
                    <Button
                      onClick={async () => {
                        await axios.post(
                          `${import.meta.env.VITE_API_URL}/cart/quantity`,
                          {
                            user: userId,
                            product: product._id,
                            type: "dec",
                            itemId: product.item._id,
                          }
                        );
                        window.location.reload();
                      }}
                    >
                      -
                    </Button>
                    <div className="px-5">Qty: {product.quantity}</div>
                    <Button
                      onClick={async () => {
                        await axios.post(
                          `${import.meta.env.VITE_API_URL}/cart/quantity`,
                          {
                            user: userId,
                            product: product._id,
                            type: "inc",
                            itemId: product.item._id,
                          }
                        );
                        window.location.reload();
                      }}
                    >
                      +
                    </Button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <h2>Total</h2>
          <h2>{cart.total}</h2>
        </div>
        {/* <Button onClick={() => navigate('/checkout')}>Checkout</Button> */}
        <Button onClick={handleCheckout} className="w-full mt-4">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default withAuth(CartPage);
