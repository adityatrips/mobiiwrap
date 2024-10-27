"use client";

import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Slider } from "@/components/ui/slider";
import { useGetAllCategories, useGetProducts } from "@/services/mutations";
import CustomLoading from "@/shared/CustomLoading";
import ProductCard from "@/shared/ProductCard";
import // CartProduct,
// Category,
// Product,
"@/types";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
// import { useQueryClient } from "@tanstack/react-query";
import { Filter } from "lucide-react";
// import { toTitleCase } from "@/utils/str_fuctions";
// import { Filter, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";

// const categoryNameMap: { [key: string]: string } = {
//   "6713e23a97fba66950fec8a9": "Brands and Logos",
//   "6713e23a97fba66950fec8aa": "Superheroes",
//   "6713e23a97fba66950fec8ab": "Travel",
//   "6713e23a97fba66950fec8ac": "Vehicles",
//   "6713e23a97fba66950fec8ad": "Anime and Cartoons",
// };

const Products = () => {
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetAllCategories();

  // const [products, setProducts] = useState<Product[]>([]);
  // const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  // const [filters, setFilters] = useState({
  // category: "all",
  // price: [0, 1000],
  // rating: "all",
  //   sort: { by: "name", order: "asc" },
  // });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("5");

  useEffect(() => {
    productsQuery.mutate(
      {
        page,
        limit: Number(itemsPerPage),
      },
      {
        onSuccess: (data) => {
          setTotalPages(data.data.totalPages);
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, itemsPerPage]);

  if (productsQuery.isError || categoriesQuery.isError) {
    return (
      <div className="flex min-h-nav-full justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Error Fetching Products</h1>
          <p className="text-lg mt-4">
            An error occurred while fetching products. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // const sortProducts = (by: string, order: string) => {
  //   const sorted = [...products].sort((a, b) => {
  //     if (by === "price" || by === "rating") {
  //       const fieldA = a[by as keyof Product] as number;
  //       const fieldB = b[by as keyof Product] as number;
  //       return order === "asc" ? fieldA - fieldB : fieldB - fieldA;
  //     } else {
  //       const fieldA = a.name.toLowerCase();
  //       const fieldB = b.name.toLowerCase();
  //       return order === "asc"
  //         ? fieldA.localeCompare(fieldB)
  //         : fieldB.localeCompare(fieldA);
  //     }
  //   });
  //   setSortedProducts(sorted);
  // };

  // const handleSortChange = (value: string) => {
  //   const [by, order] = value.split("-");
  //   // setFilters((prev) => ({ ...prev, sort: { by, order } }));
  //   sortProducts(by, order);
  // };

  // const handleFilterChange = (key: string, value: any) => {
  //   setFilters((prev) => ({ ...prev, [key]: value }));
  //   setPage(1);
  //   applyFilters();
  // };

  // const applyFilters = () => {
  //   let filtered = [...products];

  //   if (filters.category !== "all") {
  //     filtered = filtered.filter(
  //       (product) => product.category._id === filters.category
  //     );
  //   }

  //   if (filters.rating !== "all") {
  //     filtered = filtered.filter(
  //       (product) => product.rating >= Number(filters.rating)
  //     );
  //   }

  //   filtered = filtered.filter(
  //     (product) =>
  //       product.price >= filters.price[0] && product.price <= filters.price[1]
  //   );

  //   setSortedProducts(filtered);
  // };

  // Calculate the current page products using slice
  // const currentProducts = sortedProducts.slice(
  //   (page - 1) * itemsPerPage,
  //   page * itemsPerPage
  // );

  return productsQuery.isPending ? (
    <CustomLoading />
  ) : (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="w-full flex gap-5 justify-end">
        <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
          <SelectTrigger className="border py-2 px-5 rounded">
            <SelectValue>Products per page: {itemsPerPage}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 15, 20].map((item) => (
              <SelectItem key={item} value={`${item}`}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Sheet>
          <SheetTrigger>
            <Filter />
          </SheetTrigger>
          <SheetContent>
            {/* <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <SheetDescription className="mb-5">
              Tune your search results to get your desired product.
            </SheetDescription>
            <div className="flex flex-col justify-center items-center gap-5">
              <Select
                value={`${filters.sort.by}-${filters.sort.order}`}
                onValueChange={handleSortChange}
              >
                <SelectTrigger>
                  <SelectValue>
                    {toTitleCase(filters.sort.by)} ({filters.sort.order})
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {["name", "price", "rating"].map((field) => (
                    <>
                      <SelectItem key={field + "-asc"} value={`${field}-asc`}>
                        {toTitleCase(field)} (ascending)
                      </SelectItem>
                      <SelectItem key={field + "-desc"} value={`${field}-desc`}>
                        {toTitleCase(field)} (descending)
                      </SelectItem>
                    </>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.category}
                onValueChange={(e) => handleFilterChange("category", e)}
              >
                <SelectTrigger>
                  <SelectValue>
                    {filters.category === "all"
                      ? "Choose a category"
                      : categoryNameMap[filters.category]}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {categoriesQuery.data?.data?.map((category: Category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.rating}
                onValueChange={(e) => handleFilterChange("rating", e)}
              >
                <SelectTrigger>
                  <SelectValue>
                    {filters.rating === "all"
                      ? "Choose a rating"
                      : `${filters.rating}+`}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {["all", 1, 2, 3, 4, 5].map((rating) => (
                    <SelectItem key={rating} value={String(rating)}>
                      {rating === "all" ? "All" : `${rating}+`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex w-full flex-col gap-1">
                <Slider
                  step={50}
                  defaultValue={[filters.price[1]]}
                  min={0}
                  max={1000}
                  onValueCommit={(value) =>
                    handleFilterChange("price", [0, value])
                  }
                />
                <div className="flex justify-between items-center">
                  <span>Price</span>
                  <span className="flex gap-2 items-center">
                    <IndianRupee size={18} />
                    {filters.price[0]} - {filters.price[1]}
                  </span>
                </div>
              </div>
            </div> */}
          </SheetContent>
        </Sheet>
      </div>

      {!productsQuery.isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {productsQuery.data?.data?.products.map((product: any) => (
            <ProductCard
              key={product.slug}
              img={product.image}
              price={product.price}
              slug={product.slug}
              title={product.name}
            />
          ))}
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              href="#"
            />
          </PaginationItem>
          <PaginationItem>
            <Input
              min={1}
              onChange={(e) => {
                if (
                  Number(e.target.value) < 0 ||
                  Number(e.target.value) > totalPages
                )
                  return;
                setPage(Math.max(1, Number(e.target.value)));
              }}
              className="w-20 text-center"
              type="number"
              value={page}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setPage((prev) => prev + 1);
                console.log(totalPages, Math.min(totalPages, page + 1));
              }}
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Products;
