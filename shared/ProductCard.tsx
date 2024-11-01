import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeSliceState } from "@/types";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface ProductCardProps {
  slug: string;
  img: string;
  price: number;
  title: string;
}

const ProductCard = ({ slug, img, price, title }: ProductCardProps) => {
  const router = useRouter();
  const {} = useSelector((state: ThemeSliceState) => state.theme);

  return (
    <Card
      className={`hover:shadow-foreground shadow-lg cursor-pointer transition-all`}
      onClick={() => {
        router.push(`/products/${slug}`);
      }}
    >
      <CardHeader>
        <CardTitle>
          <h4 className="heading">{title}</h4>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          width={720}
          height={1280}
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
