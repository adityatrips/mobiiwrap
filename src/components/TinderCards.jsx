"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

import CustomLoading from "@/components/Loader";

import { useGetNProducts } from "@/services";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TinderCards = ({ className }) => {
  const [products, setProducts] = useState(null);
  const nProducts = useGetNProducts(5);

  useEffect(() => {
    setProducts(null);
    nProducts.mutate(5, {
      onSuccess: (data) => {
        setProducts(data.data.products);
      },
    });
  }, []);

  useEffect(() => {
    if (products?.length == 0) {
      setProducts(null);
      nProducts.mutate(5, {
        onSuccess: (data) => {
          setProducts(data.data.products);
        },
      });
    }
  });

  if (nProducts.isError) {
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

  return nProducts.isPending ? (
    <CustomLoading />
  ) : (
    <div className="w-full">
      <h4 className="heading text-center pb-5">Swipe em like it&apos;s hot</h4>
      <div className={`${className} grid h-full w-full place-items-center`}>
        {products?.map((card) => {
          return (
            <Card
              key={card.slug}
              cards={card}
              id={card.slug}
              setProducts={setProducts}
            />
          );
        })}
      </div>
      <div className="flex gap-5 mt-10 w-full items-center justify-center">
        <ArrowLeft />
        <span>Swipe till you find a match!</span>
        <ArrowRight />
      </div>
    </div>
  );
};

const Card = ({ key, id, setProducts, cards }) => {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-200, 0, 200], [-8, 0, 8]);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      setProducts((pv) => pv.filter((v) => v.slug !== id));
    }
  };

  return (
    <motion.img
      key={key}
      alt="Placeholder alt"
      className="h-[calc(100vh-15rem)] origin-bottom rounded-lg object-cover hover:cursor-grab active:cursor-grabbing"
      drag={"x"}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      src={cards.image}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        rotate,
        opacity,
        transition: "0.125s transform",
      }}
      onClick={() => {
        navigate(`/products/${id}`);
      }}
      onDragEnd={handleDragEnd}
    />
  );
};

export default TinderCards;
