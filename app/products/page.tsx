/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useGetCategory, useProductFilter } from "@/services/mutations";
import { useGetAllCategories, useGetProducts } from "@/services/queries";
import CustomLoading from "@/shared/CustomLoading";
import ProductCard from "@/shared/ProductCard";
import { Category, Product } from "@/types";
import { IndianRupee } from "lucide-react";
import { useState } from "react";

const categoryNameMap: { [key: string]: string } = {
  "6713e23a97fba66950fec8a9": "Brands and Logos",
  "6713e23a97fba66950fec8aa": "Superheroes",
  "6713e23a97fba66950fec8ab": "Travel",
  "6713e23a97fba66950fec8ac": "Vehicles",
  "6713e23a97fba66950fec8ad": "Anime and Cartoons",
};

const Products = () => {
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetAllCategories();
  const products = productsQuery?.data?.data || [];
  const categoryQuery = useGetCategory();
  const filterQuery = useProductFilter();

  const [filters, setFilters] = useState({
    category: "all",
    price: [0, 1000],
    rating: "",
    deviceType: "",
  });

  const [page, setPage] = useState(1);

  if (productsQuery.isError) {
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

  return !productsQuery.isSuccess ? (
    <CustomLoading />
  ) : (
    <div className="flex flex-col items-center justify-center gap-5">
      <Select
        value={filters.category}
        onValueChange={(e) => {
          setPage(1);
          setFilters((pv) => ({ ...pv, category: e }));
          categoryQuery.mutate({ id: e });
          filterQuery.mutate({
            category: e,
            price: `${filters.price[0]}_${filters.price[1]}`,
            rating: filters.rating,
            deviceType: filters.deviceType,
          });
        }}
      >
        <SelectTrigger>
          <SelectValue>
            {filters.category === "all"
              ? "Choose a category"
              : categoryNameMap[filters.category]}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={"all"} value={"all"}>
            All
          </SelectItem>
          {categoriesQuery.data?.data?.map((category: Category) => (
            <SelectItem
              aria-label={category.name}
              key={category.name}
              value={category._id}
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.rating}
        onValueChange={(e) => {
          setPage(1);
          setFilters((pv) => ({ ...pv, rating: e }));
          filterQuery.mutate({
            category: filters.category,
            price: `${filters.price[0]}_${filters.price[1]}`,
            rating: e,
            deviceType: filters.deviceType,
          });
        }}
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
          aria-label="price"
          step={50}
          defaultValue={[filters.price[1] || 1000]}
          min={0}
          max={1000}
          onValueCommit={(value) => {
            setPage(1);
            setFilters((pv: any) => ({ ...pv, price: [0, value] }));
            filterQuery.mutate({
              category: filters.category,
              rating: filters.rating,
              price: `0_${value}`,
              deviceType: filters.deviceType,
            });
          }}
        />
        <div className="flex justify-between items-center">
          <span>Price</span>
          <span className="flex gap-2 items-center">
            <IndianRupee size={18} />
            {filters.price[0]} - {filters.price[1]}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {!filterQuery.data &&
          products.slice((page - 1) * 10, page * 10).map((product: Product) => {
            return (
              <ProductCard
                key={product.slug}
                img={product.image}
                price={product.price}
                slug={product.slug}
                title={product.name}
              />
            );
          })}
        {filterQuery.data &&
          filterQuery.data.data
            .slice((page - 1) * 10, page * 10)
            .map((product: Product) => {
              return (
                <ProductCard
                  key={product.slug}
                  img={product.image}
                  price={product.price}
                  slug={product.slug}
                  title={product.name}
                />
              );
            })}
      </div>
      <Pagination
      // total={Math.ceil(
      //   (filterQuery.data?.data
      //     ? filterQuery.data.data.length
      //     : products.length) / 10
      // )}
      // page={page}
      // onChange={(e) => {
      //   window.location.href = "#";
      //   setPage(e);
      // }}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Products;
