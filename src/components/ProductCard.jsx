import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define a pricing function (optional)
const getDiscountedPrice = (slug) => {
  switch (slug) {
    case "dirty-money":
      return 2000; // original price for "dirty-money"
    default:
      return 899; // default original price
  }
};

const ProductCard = ({ slug, img, price = 0, title }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="hover:scale-105 cursor-pointer transition-all"
      onClick={() => {
        navigate(`/products/${slug}`);
      }}
    >
      <CardHeader>
        <CardTitle>
          <h4 className="heading">{title}</h4>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img
          alt={`Image of ${title}`} // More descriptive alt text
          className="h-auto w-full aspect-[3/4] object-cover"
          src={img}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        {/* Discounted Price (if applicable) */}
        <span className="flex line-through gap-1 items-center">
          <IndianRupee size={16} />
          <span className="mr-3">{getDiscountedPrice(slug)}</span>
        </span>
        {/* Current Price */}
        <span className="flex gap-1 items-center">
          <IndianRupee size={16} />
          <span className="mr-3">{price}</span>
        </span>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
