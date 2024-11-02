"use client";

import { ThemeSliceState } from "@/types";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { brandName } from "./constants";
import { ShoppingCart, Phone, ShieldCheck } from "lucide-react"; // Importing icons
import Footer from "@/components/ui/Footer";
import { Button } from "@/components/ui/button";
import { useGetFeaturedProducts } from "@/services/mutations";
import CustomLoading from "@/shared/CustomLoading";
import { useRouter } from "next/navigation";
import TinderCards from "@/shared/TinderCards";
import { AuroraBackground } from "@/components/aurora-background";

const IndexPage = () => {
  const { isDark } = useSelector((state) => state.theme);
  const featuredProducts = useGetFeaturedProducts();
  const router = useRouter();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const renderFeaturedProducts = () => {
    if (featuredProducts.isPending) {
      return <CustomLoading />;
    }

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredProducts.data?.data.products.map((product) => (
          <div
            onClick={() => router.push(`/products/${product.slug}`)}
            className="w-full border p-4 rounded-lg flex flex-col justify-between"
            key={product._id}
          >
            <Image
              className="w-full h-auto object-cover"
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
            />
            <h3 className="text-center mb-5">{product.name}</h3>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/products/${product.slug}`)}
            >
              View Product
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const renderCustomerReviews = () => {
    const reviews = [
      {
        quote:
          "I absolutely love my new phone wrap! It's a perfect fit and looks amazing!",
        author: "- Priya S.",
      },
      {
        quote:
          "The quality is fantastic, and I was impressed with the fast shipping.",
        author: "- Rajesh M.",
      },
      {
        quote:
          "So many design options! I found the perfect wrap to match my style.",
        author: "- Sneha K.",
      },
    ];

    return reviews.map((review, index) => (
      <div className="border w-full p-6 rounded-lg shadow-lg" key={index}>
        <p className="italic text-foreground">{`“${review.quote}”`}</p>
        <p className="mt-4 font-semibold text-foreground">{review.author}</p>
      </div>
    ));
  };

  return (
    <div className="transition-all duration-300 font-sans">
      <AuroraBackground>
        <section className="flex flex-col justify-center items-center h-screen relative text-center px-4">
          <h1 className="tracking-wider uppercase text-5xl md:text-6xl font-extrabold text-foreground mb-6">
            {brandName}
          </h1>
          <p className="mb-12 text-foreground text-lg max-w-2xl leading-relaxed">
            Welcome to {brandName}! Discover premium mobile wraps and cases that
            offer both style and protection for your devices.
          </p>
          <Button onClick={() => (window.location.href = "/products")}>
            Shop Now
          </Button>
        </section>
      </AuroraBackground>

      <section className="mx-auto container px-2">
        <h2 className="mt-10 text-3xl font-bold mb-10 text-foreground">
          Featured Products
        </h2>
        {renderFeaturedProducts()}
      </section>

      <section className="py-20 text-center mx-auto container px-2">
        <h2 className="text-3xl font-bold mb-10 text-foreground">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              Icon: ShoppingCart,
              title: "Wide Selection",
              description:
                "Explore a wide variety of designs and styles to match your personality.",
            },
            {
              Icon: Phone,
              title: "Top-Notch Quality",
              description:
                "Our products are made with attention to detail, ensuring both durability and style.",
            },
            {
              Icon: ShieldCheck,
              title: "Satisfaction Guaranteed",
              description:
                "We stand behind our products, ensuring your satisfaction with every purchase.",
            },
          ].map(({ Icon, title, description }, index) => (
            <div
              className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              key={index}
            >
              <Icon className="mx-auto mb-4 h-10 w-10 text-foreground" />
              <h3 className="text-xl font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 mx-auto container px-2">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-10 text-foreground">
            What Our Customers Say
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
            {renderCustomerReviews()}
          </div>
        </div>
      </section>

      <section className="md:hidden py-20 border-y">
        <div className="min-h-nav-full flex flex-col items-center justify-center">
          <TinderCards />
        </div>
      </section>

      <section className="py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Ready to Customize Your Device?
          </h2>
          <p className="mb-8 text-foreground">
            Explore our collection and give your device a fresh, new look today!
          </p>
          <Button onClick={() => (window.location.href = "/products")}>
            Shop Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
