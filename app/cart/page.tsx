// "use client";

// import { useSelector } from "react-redux";

// import { AuthSliceState, CartProduct } from "@/types";
// import { useGetCart } from "@/services/mutations";
// import Image from "next/image";
// import CustomLoading from "@/shared/CustomLoading";
// import { toTitleCase } from "@/utils/str_fuctions";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useRemoveFromCartMut } from "@/services/mutations";
// import { useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import withAuth from "../../shared/withAuth";

// const CartPage = () => {
// const userId = useSelector((state: AuthSliceState) => state.auth.user?._id);
// const { data, isSuccess, isError } = useGetCart();
// const cart = data?.data.cart || [];
// const queryClient = useQueryClient();
// const removeFromCart = useRemoveFromCartMut();
// const router = useRouter();

// if (isError) {
//   return (
//     <div className="flex min-h-nav-full justify-center items-center">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold">Error Fetching Products</h1>
//         <p className="text-lg mt-4">
//           An error occurred while fetching products. Please try again later
//         </p>
//       </div>
//     </div>
//   );
// }

// return !isSuccess ? (
//   <CustomLoading />
//   ) : (
//     <section className="container mx-auto flex min-h-nav-full items-start gap-5 pt-10">
//       <div className="flex flex-col gap-5 w-full">
//         <Table className="w-full">
//           <TableHeader>
//             <TableRow>
//               <TableHead>Product</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead>Quantity</TableHead>
//               <TableHead>Total</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {cart.products.length == 0 ? (
//               <TableRow>
//                 <TableCell>-</TableCell>
//                 <TableCell>-</TableCell>
//                 <TableCell>-</TableCell>
//                 <TableCell>-</TableCell>
//                 <TableCell>-</TableCell>
//               </TableRow>
//             ) : (
//               cart.products.map((product: CartProduct, index: number) => {
//                 console.log(product);

//                 return (
//                   <TableRow key={index}>
//                     <TableCell className="flex items-center gap-2">
//                       <Image
//                         height={1280}
//                         width={720}
//                         alt={product.item.name}
//                         className="object-cover h-auto size-20 rounded-large"
//                         src={product.item.image}
//                       />
//                       <Link
//                         className="flex flex-col items-start justify-start gap-1"
//                         href={`/products/${product.item.slug}`}
//                       >
//                         <span>{product.item.name}</span>
//                         <span className="text-sm text-muted-foreground">
//                           {/* @ts-expect-error model error */}
//                           {toTitleCase(product.phoneBrand)}&nbsp;
//                           {/* @ts-expect-error model error */}
//                           {toTitleCase(product.phoneModel.split("_").join(" "))}
//                         </span>
//                       </Link>
//                     </TableCell>
//                     <TableCell>{product.cost}</TableCell>
//                     <TableCell>{product.quantity}</TableCell>
//                     <TableCell>{product.quantity * product.cost}</TableCell>
//                     <TableCell>
//                       <Button
//                         onClick={() => {
//                           removeFromCart.mutate(
//                             {
//                               productId: product._id,
//                               userId: userId || "",
//                             },
//                             {
//                               onSuccess: async () => {
//                                 await queryClient.invalidateQueries({
//                                   queryKey: ["cart", userId],
//                                 });
//                                 toast.success("Product removed from cart");
//                               },
//                             }
//                           );
//                         }}
//                         variant={"destructive"}
//                       >
//                         Remove
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })
//             )}
//           </TableBody>
//         </Table>
//         <div className="flex justify-between items-center p-5 rounded-large bg-[hsl(var(--nextui-content1))]">
//           <div className="flex flex-col gap-2">
//             <span>Subtotal</span>
//             <span>Taxes</span>
//             <span>Grand total</span>
//           </div>
//           <div className="flex flex-col gap-2">
//             <span className="text-right">{cart.total}</span>
//             <span className="text-right">{Math.ceil(cart.total * 0.18)}</span>
//             <span className="text-right text-4xl heading">
//               {Math.ceil(cart.total + cart.total * 0.18)}
//             </span>
//           </div>
//         </div>
//         <Button
//           onClick={() => {
//             router.push("/checkout");
//           }}
//           className="w-full"
//         >
//           Proceed to Checkout
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default withAuth(CartPage);

'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useGetCart, useRemoveFromCartMut } from '@/services/mutations';
import CustomLoading from '@/shared/CustomLoading';
import withAuth from '@/shared/withAuth';
import { AuthSliceState } from '@/types';
import { toTitleCase } from '@/utils/str_fuctions';
import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
            title: 'Success',
            description: 'Product removed from cart',
          });
          mutate(userId!);
        },
      }
    );
  };

  if (isError) {
    return (
      <div className='flex min-h-nav-full justify-center items-center'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Error Fetching Products</h1>
          <p className='text-lg mt-4'>
            An error occurred while fetching products. Please try again later
          </p>
        </div>
      </div>
    );
  }

  return isPending || data == undefined ? (
    <CustomLoading />
  ) : (
    <div className='flex min-h-nav-full'>
      <div className='hidden md:w-1/2 md:flex items-center justify-center'>
        <h1>Shopping Cart</h1>
      </div>

      <div className='flex flex-col justify-center gap-5'>
        {cart.products.map((product: any, index: number) => (
          <div key={index} className='flex gap-5 border rounded-md p-5'>
            <div className='relative'>
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
                className='bg-red-700 absolute top-0 right-0 cursor-pointer'
              />
            </div>
            <div className='flex w-full justify-between'>
              <div className='flex flex-col gap-2'>
                <h3>{product.item.name}</h3>
                <small>
                  {toTitleCase(product.phoneBrand)}&nbsp;
                  {toTitleCase(product.phoneModel.replace('_', ' '))}
                </small>
              </div>

              <div className='flex flex-col items-end justify-between'>
                <span className='flex flex-col gap-2'>
                  <h4>{product.cost}</h4>
                  <small>Qty: {product.quantity}</small>
                </span>
                <h3>Total: {product.cost * product.quantity}</h3>
              </div>
            </div>
          </div>
        ))}
        <Separator />
        <div className='flex justify-between'>
          <h2>Total</h2>
          <h2>{cart.total}</h2>
        </div>
        <Button onClick={() => router.push('/checkout')}>Checkout</Button>
      </div>
    </div>
  );
};

export default withAuth(CartPage);
