import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useGetFeaturedProducts } from "./services";

import { ShoppingCart, Phone, ShieldCheck } from "lucide-react";
import { Button } from "./components/ui/button";
import CustomLoading from "./components/Loader";
import TinderCards from "./components/TinderCards";

const IndexPage = () => {
  const { isDark } = useSelector((state) => state.theme);
  const featuredProducts = useGetFeaturedProducts();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const renderFeaturedProducts = () => {
    if (featuredProducts.isPending) return <CustomLoading />;

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredProducts.data?.data?.products.map((product) => (
          <div
            onClick={() => navigate(`/products/${product.slug}`)}
            className="w-full border p-4 rounded-lg flex flex-col justify-between"
            key={product._id}
          >
            <img
              className="w-full h-auto object-cover"
              src={product.image}
              alt={product.name}
            />
            <h3 className="text-center mb-5">{product.name}</h3>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate(`/products/${product.slug}`)}
            >
              View Product
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const renderCustomerReviews = () =>
    [
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
    ].map((review, index) => (
      <div
        className="hover:scale-110 transition-all border w-full p-6 rounded-lg shadow-lg"
        key={index}
      >
        <p className="italic text-foreground">{`“${review.quote}”`}</p>
        <p className="mt-4 font-semibold text-foreground">{review.author}</p>
      </div>
    ));

  const featureItems = [
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
  ];

  return (
    <div className="transition-all duration-300 font-sans">
      <Slider
        className="min-h-nav-full mt-20"
        dots={false}
        infinite
        speed={500}
        slidesToScroll={1}
        slidesToShow={1}
        arrows={false}
      >
        <div className="relative w-full h-nav-full">
          <img
            className="z-[-1] absolute w-full h-nav-full opacity-60 object-cover"
            src="/1.jpg"
            alt="Slide 1"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto flex flex-col items-center p-5 bg-secondary rounded-2xl">
            <h2 className="text-center">
              Elevate Your Device&apos;s Look with MobiiWrap
            </h2>
            <p className="text-center">
              Discover our premium skins designed to enhance both style and
              protection. Available in a variety of designs, MobiiWrap fits your
              phone seamlessly, offering the perfect combination of form and
              function.
            </p>
          </div>
        </div>
        <div className="relative w-full h-nav-full">
          <img
            className="z-[-1] absolute w-full h-nav-full opacity-60 object-cover"
            src="/2.jpg"
            alt="Slide 2"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto flex flex-col items-center p-5 bg-secondary rounded-2xl">
            <h2 className="text-center">Precision Fit for Every Model</h2>
            <p className="text-center">
              Our phone skins are meticulously crafted to fit your device like a
              glove. Slim, sleek, and ultra-lightweight, MobiiWrap adds no
              unnecessary bulk.
            </p>
          </div>
        </div>
        <div className="relative w-full h-nav-full">
          <img
            className="z-[-1] absolute w-full h-nav-full opacity-60 object-cover"
            src="/3.jpg"
            alt="Slide 3"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto flex flex-col items-center p-5 bg-secondary rounded-2xl">
            <h2 className="text-center">
              Built to Last with Premium Materials
            </h2>
            <p className="text-center">
              MobiiWrap skins are made from durable materials, ensuring
              long-lasting protection against scratches and scuffs while
              maintaining a smooth finish.
            </p>
          </div>
        </div>
        <div className="relative w-full h-nav-full">
          <img
            className="z-[-1] absolute w-full h-nav-full opacity-60 object-cover"
            src="/4.jpg"
            alt="Slide 4"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto flex flex-col items-center p-5 bg-secondary rounded-2xl">
            <h2 className="text-center">No Mess, Just Perfection</h2>
            <p className="text-center">
              Easily apply or remove your MobiiWrap skin without leaving any
              sticky residue behind. Perfect for those who like to change things
              up.
            </p>
          </div>
        </div>
        <div className="relative w-full h-nav-full">
          <img
            className="z-[-1] absolute w-full h-nav-full opacity-60 object-cover"
            src="/5.jpg"
            alt="Slide 5"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto flex flex-col items-center p-5 bg-secondary rounded-2xl">
            <h2 className="text-center">
              Sustainable Style with Eco-Friendly Materials
            </h2>
            <p className="text-center">
              Not only do MobiiWrap skins offer premium protection, but
              they&spos;re also made with eco-conscious materials, giving you
              style that&spos;s kind to the planet.
            </p>
          </div>
        </div>
        <div className="relative w-full h-nav-full">
          <img
            className="z-[-1] absolute w-full h-nav-full opacity-60 object-cover"
            src="/6.jpg"
            alt="Slide 6"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto flex flex-col items-center p-5 bg-secondary rounded-2xl">
            <h2 className="text-center">Stand Out with Custom Designs</h2>
            <p className="text-center">
              Personalize your device with our wide range of colors, textures,
              and designs. Whether you&apos;re into minimalistic, bold, or
              creative styles, we&apos;ve got you covered.
            </p>
          </div>
        </div>
      </Slider>

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
          {featureItems.map(({ Icon, title, description }, index) => (
            <div
              className="hover:scale-110 transition-all border p-6 rounded-lg shadow-lg hover:shadow-xl"
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
