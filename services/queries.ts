import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return axios.get(`/api/products`);
    },
  });
};

export const useGetOneProduct = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      return axios.get(`/api/products/${id}`);
    },
  });
};

export const useGetNProducts = (n: number) => {
  return useQuery({
    queryKey: ["products", n],
    queryFn: async () => {
      return axios.get(`/api/products?qty=${n}`);
    },
  });
};

export const useGetCart = (id: string) => {
  return useQuery({
    queryKey: ["cart", id],
    queryFn: async () => {
      return axios.get(`/api/cart?user=${id}`);
    },
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return axios.get(`/api/categories`);
    },
  });
};
