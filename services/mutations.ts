import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

import { User } from "@/types";
import { updateUser } from "@/stores/authSlice";

export const useLoginMut = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["sign-in-user"],
    mutationFn: (variables: { email: string; password: string }) => {
      return axios.post(`/api/auth/login`, {
        email: variables.email,
        password: variables.password,
      });
    },
    onSuccess: ({ data }: { data: User }) => {
      dispatch(updateUser(data));
      localStorage.setItem("token", data.token);
      localStorage.setItem("uid", data._id);
    },
  });
};

export const useSignupMut = () => {
  return useMutation({
    mutationKey: ["sign-up-user"],
    mutationFn: (variables: {
      name: string;
      email: string;
      password: string;
    }) => {
      return axios.post(`/api/auth/register`, {
        email: variables.email,
        name: variables.name,
        password: variables.password,
      });
    },
  });
};

export const useRemoveFromCartMut = () => {
  return useMutation({
    mutationKey: ["remove-from-cart"],
    mutationFn: (variables: { productId: string; userId: string }) => {
      return axios.delete(`/api/cart`, {
        data: {
          productId: variables.productId,
          userId: variables.userId,
        },
      });
    },
  });
};

export const useAddToCartMut = () => {
  return useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: (variables: {
      productId: string;
      quantity: number;
      userId: string;
      cost: number;
      phoneModel: string;
      phoneBrand: string;
    }) => {
      return axios.post(`/api/cart`, {
        item: variables.productId,
        quantity: variables.quantity,
        userId: variables.userId,
        cost: variables.cost,
        phoneModel: variables.phoneModel,
        phoneBrand: variables.phoneBrand,
      });
    },
  });
};

export const useGetCategory = () => {
  return useMutation({
    mutationKey: ["category"],
    mutationFn: async (variables: { id: string }) => {
      return axios.get(`/api/categories/${variables.id}`);
    },
  });
};

export const useProductFilter = () => {
  return useMutation({
    mutationKey: ["product-filter"],
    mutationFn: async (variables: {
      category: string;
      price: string;
      rating: string;
      deviceType: string;
    }) => {
      return axios.get(
        `/api/products?category=${
          variables.category === "all" ? "" : variables.category
        }&price=${variables.price}&rating=${
          variables.rating === "all" ? "" : variables.rating
        }&deviceType=${variables.deviceType}`
      );
    },
  });
};

export const useSortByName = () => {
  return useMutation({
    mutationKey: ["sort-by-name"],
    mutationFn: async (variables: { order: string }) => {
      return axios.get(`/api/products?nameSort=${variables.order}`);
    },
  });
};

export const useSortByPrice = () => {
  return useMutation({
    mutationKey: ["sort-by-price"],
    mutationFn: async (variables: { order: string }) => {
      return axios.get(`/api/products?priceSort=${variables.order}`);
    },
  });
};

export const useSortByRating = () => {
  return useMutation({
    mutationKey: ["sort-by-rating"],
    mutationFn: async (variables: { order: string }) => {
      return axios.get(`/api/products?ratingSort=${variables.order}`);
    },
  });
};

export const useGetProducts = () => {
  return useMutation({
    mutationKey: ["product-with-page-and-limit"],
    mutationFn: async ({ page, limit }: { page: number; limit: number }) => {
      return axios.get(`/api/products?page=${page}&limit=${limit}`);
    },
  });
};

export const useGetOneProduct = () => {
  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (id: string) => {
      return axios.get(`/api/products/${id}`);
    },
  });
};

export const useGetNProducts = () => {
  return useMutation({
    mutationKey: ["list-n-products"],
    mutationFn: async (n: number) => {
      return axios.get(`/api/feeling-lucky?qty=${n}`);
    },
  });
};

export const useGetCart = () => {
  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async (id: string) => {
      return axios.get(`/api/cart?user=${id}`);
    },
  });
};

export const useGetAllCategories = () => {
  return useMutation({
    mutationKey: ["categories"],
    mutationFn: async () => {
      return axios.get(`/api/categories`);
    },
  });
};

export const useSubmitContactForm = () => {
  return useMutation({
    mutationKey: ["contact-form"],
    mutationFn: async (variables: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      return axios.post(`/api/contact-us`, variables);
    },
  });
};
