"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import CustomLoading from "../components/Loader";
import { useGetNProducts } from "../services";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TinderCards = ({ className }) => {
  const [products, setProducts] = useState(null);
  const [swipedCount, setSwipedCount] = useState(0); // Track the number of swipes
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index of the displayed product
  const nProducts = useGetNProducts(5);

  // Fetch products when the component loads or when swipedCount reaches 5
  const fetchProducts = useCallback(() => {
    nProducts.mutate(5, {
      onSuccess: (data) => {
        setProducts(data.data.products);
        setSwipedCount(0); // Reset the swipe count for the new set of products
        setCurrentIndex(0); // Reset the current product index
      },
    });
  }, []);

  useEffect(() => {
    if (products === null || swipedCount >= 5) {
      fetchProducts();
    }
  }, [fetchProducts, swipedCount, products]);

  const handleSwipe = (direction) => {
    if (products && currentIndex < products.length) {
      const newIndex =
        direction === "left" ? currentIndex + 1 : currentIndex - 1;
      if (newIndex >= 0 && newIndex < products.length) {
        setCurrentIndex(newIndex);
        setSwipedCount((prevCount) => prevCount + 1); // Increment swipe count
      }
    }
  };

  if (nProducts.isError) {
    return (
      <div className="flex min-h-nav-full justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Error Fetching Products</h1>
          <p className="text-lg mt-4">
            An error occurred while fetching products. Please try again later
          </p>
          <button
            onClick={fetchProducts}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Retry
          </button>
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
        {products?.[currentIndex] && (
          <Card
            key={products[currentIndex].slug}
            card={products[currentIndex]}
            setProducts={setProducts}
            setSwipedCount={setSwipedCount}
            swipedCount={swipedCount}
          />
        )}
      </div>
      <div className="flex gap-5 mt-10 w-full items-center justify-center">
        <motion.div
          className="p-2 rounded-full border-2 border-gray-500 cursor-pointer"
          onClick={() => handleSwipe("left")}
        >
          <ArrowLeft />
        </motion.div>
        <span>Swipe till you find a match!</span>
        <motion.div
          className="p-2 rounded-full border-2 border-gray-500 cursor-pointer"
          onClick={() => handleSwipe("right")}
        >
          <ArrowRight />
        </motion.div>
      </div>
    </div>
  );
};

const Card = ({ card, setProducts, setSwipedCount, swipedCount }) => {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-200, 0, 200], [-8, 0, 8]);

  const handleDragEnd = useCallback(() => {
    if (Math.abs(x.get()) > 50) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.slug !== card.slug)
      );
      setSwipedCount((prevCount) => prevCount + 1); // Increment the swipe count
    }
  }, [x, card.slug, setProducts, setSwipedCount]);

  return (
    <motion.img
      alt={card.title}
      className="h-[calc(100vh-15rem)] origin-bottom rounded-lg object-cover hover:cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      src={card.image}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        rotate,
        opacity,
        transition: "0.125s transform",
      }}
      onClick={() => {
        navigate(`/products/${card.slug}`);
      }}
      onDragEnd={handleDragEnd}
    />
  );
};

export default TinderCards;
