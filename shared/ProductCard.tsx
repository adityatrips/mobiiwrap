import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  slug: string;
  img: string;
  price: number;
  title: string;
}

const ProductCard = ({ slug, img, price, title }: ProductCardProps) => {
  const router = useRouter();

  return (
    <Card
      className="hover:shadow-[rgba(0,0,0,0.5)] hover:shadow-lg cursor-pointer transition-all"
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
        From &nbsp;
        <IndianRupee size={16} /> {price}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
