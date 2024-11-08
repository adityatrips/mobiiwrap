import { Input } from "@/components/ui/input";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { useGetAllCategories, useGetProducts } from "@/services";
import CustomLoading from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { Filter, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

const categoryNameMap = {
  "6713e23a97fba66950fec8a9": "Brands and Logos",
  "6713e23a97fba66950fec8aa": "Superheroes",
  "6713e23a97fba66950fec8ab": "Travel",
  "6713e23a97fba66950fec8ac": "Vehicles",
  "6713e23a97fba66950fec8ad": "Anime and Cartoons",
};

const initialFilters = {
  search: "",
  category: "all",
  price: [0, 2000],
  rating: "all",
  sort: "name_asc",
};

const AllProductsPage = () => {
  const productsQuery = useGetProducts();
  const categoriesQuery = useGetAllCategories();

  const [filters, setFilters] = useState(initialFilters);
  const [tempFilters, setTempFilters] = useState(filters);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("20");

  useEffect(() => {
    applyFilter(initialFilters);
  }, [page, itemsPerPage, filters]);

  const handleResetFilter = () => {
    setTempFilters(initialFilters);
    setPage(1);
    applyFilter(initialFilters);
  };

  const applyFilter = (acceptedFilters) => {
    productsQuery.mutate(
      {
        page: page.toString(),
        limit: itemsPerPage.toString(),
        category:
          acceptedFilters.category !== "all"
            ? acceptedFilters.category
            : undefined,
        minPrice: acceptedFilters.price[0].toString(),
        maxPrice: acceptedFilters.price[1].toString(),
        rating:
          acceptedFilters.rating !== "all" ? acceptedFilters.rating : undefined,
        sort: acceptedFilters.sort,
        search: acceptedFilters.search,
      },
      {
        onSuccess: (data) => {
          setTotalPages(data.data.totalPages);
        },
      }
    );
  };

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

  const handleTempFilterChange = (key, value) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return productsQuery.isPending ? (
    <CustomLoading />
  ) : (
    <div className="px-2 flex flex-col items-center justify-center gap-5">
      <div className="w-full flex gap-5 justify-end">
        <Sheet>
          <SheetTrigger>
            <Button>
              <Filter size={28} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <SheetDescription className="mb-5">
              Tune your search results to get your desired product.
            </SheetDescription>
            <div className="flex flex-col gap-5">
              <Input
                value={tempFilters.search}
                onChange={(e) =>
                  handleTempFilterChange("search", e.target.value)
                }
                placeholder="Search..."
              />
              <Select
                value={filters.category}
                onValueChange={(e) => handleTempFilterChange("category", e)}
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
                  {categoriesQuery.data?.data?.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.rating}
                onValueChange={(e) => handleTempFilterChange("rating", e)}
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

              <div className="w-full flex flex-col gap-1">
                <Slider
                  step={50}
                  defaultValue={tempFilters.price}
                  min={0}
                  max={2000}
                  onValueChange={(value) => {
                    handleTempFilterChange("price", [0, 2000]);
                    handleTempFilterChange("price", [value[0], 2000]);
                  }}
                />
                <div className="flex justify-between items-center">
                  <span>Price</span>
                  <span className="flex gap-2 items-center">
                    <IndianRupee size={18} />
                    {tempFilters.price[0].toString()}, 2000
                  </span>
                </div>
              </div>

              {/* Sort Options */}
              <Select
                value={filters.sort}
                onValueChange={(value) => {
                  handleTempFilterChange("sort", value);
                  console.log(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue>
                    Sort by: {filters.sort.replace("_", " ").toUpperCase()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                  <SelectItem value="rating_asc">
                    Rating (Low to High)
                  </SelectItem>
                  <SelectItem value="rating_desc">
                    Rating (High to Low)
                  </SelectItem>
                  <SelectItem value="price_asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price_desc">
                    Price (High to Low)
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={itemsPerPage}
                onValueChange={(value) => {
                  setItemsPerPage(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full border py-2 px-5 rounded">
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

              <Button
                className="w-full"
                onClick={() => {
                  applyFilter(tempFilters);
                }}
              >
                Apply
              </Button>
              <Button className="w-full" onClick={handleResetFilter}>
                Reset
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Product Grid and Pagination */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {productsQuery.data?.data.products.map((product) => (
          <ProductCard
            key={product.slug}
            img={product.image}
            price={product.price}
            slug={product.slug}
            title={product.name}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          />
          <PaginationItem>
            <Input
              type="number"
              min={1}
              max={totalPages}
              value={page}
              onChange={(e) =>
                setPage(
                  Math.max(1, Math.min(totalPages, Number(e.target.value)))
                )
              }
            />
          </PaginationItem>
          <PaginationNext
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AllProductsPage;
