import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ slug, img, price, title }) => {
  const navigate = useNavigate();

  return (
    <Card
      className={`hover:shadow-foreground shadow-lg cursor-pointer transition-all`}
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
          alt={title}
          className="h-auto w-full aspect-[3/4] object-cover"
          src={img}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        <span className="flex line-through gap-1 items-center">
          <IndianRupee size={16} />
          <span className="mr-3">{slug === "dirty-money" ? 2000 : 899}</span>
        </span>
        <span className="flex gap-1 items-center">
          <IndianRupee size={16} />
          <span className="mr-3">{price}</span>
        </span>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
