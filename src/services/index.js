import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

import { updateUser } from "../stores/authSlice";

export const useLoginMut = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["sign-in-user"],
    mutationFn: (variables) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email: variables.email,
        password: variables.password,
      });
    },
    onSuccess: ({ data }) => {
      dispatch(updateUser(data));
      localStorage.setItem("token", data.token);
      localStorage.setItem("uid", data._id);
    },
  });
};

export const useSignupMut = () => {
  return useMutation({
    mutationKey: ["sign-up-user"],
    mutationFn: (variables) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
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
    mutationFn: (variables) => {
      return axios.delete(`${import.meta.env.VITE_API_URL}/cart`, {
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
    mutationFn: (variables) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
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
    mutationFn: async (variables) => {
      return axios.get(
        `${import.meta.env.VITE_API_URL}/categories/${variables.id}`
      );
    },
  });
};

export const useProductFilter = () => {
  return useMutation({
    mutationKey: ["product-filter"],
    mutationFn: async (variables) => {
      return axios.get(
        `${import.meta.env.VITE_API_URL}/products?category=${
          variables.category === "all" ? "" : variables.category
        }&price=${variables.price}&rating=${
          variables.rating === "all" ? "" : variables.rating
        }&deviceType=${variables.deviceType}`
      );
    },
  });
};

export const useGetProducts = () => {
  return useMutation({
    mutationKey: ["product-with-page-and-limit"],
    mutationFn: async (variables) => {
      return axios.get(
        encodeURI(
          `${import.meta.env.VITE_API_URL}/products?search=${
            variables.search ?? ""
          }&page=${variables.page ?? ""}&limit=${
            variables.limit ?? ""
          }&category=${variables.category ?? ""}&minPrice=${
            variables.minPrice ?? ""
          }&maxPrice=${variables.maxPrice ?? ""}&rating=${
            variables.rating ?? ""
          }&sort=${variables.sort ?? ""}`
        )
      );
    },
  });
};

export const useGetOneProduct = () => {
  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (id) => {
      return axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
    },
  });
};

export const useGetNProducts = () => {
  return useMutation({
    mutationKey: ["list-n-products"],
    mutationFn: async (n) => {
      return axios.get(
        `${import.meta.env.VITE_API_URL}/feeling-lucky?qty=${n}`
      );
    },
  });
};

export const useGetCart = () => {
  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async (id) => {
      return axios.get(`${import.meta.env.VITE_API_URL}/cart?user=${id}`);
    },
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    },
  });
};

export const useSubmitContactForm = () => {
  return useMutation({
    mutationKey: ["contact-form"],
    mutationFn: async (variables) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/contact-us`,
        variables
      );
    },
  });
};

export const useGetOrder = (id) => {
  return useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      return axios.get(`${import.meta.env.VITE_API_URL}/orders/${id}`);
    },
  });
};

export const usePlaceOrder = () => {
  return useMutation({
    mutationKey: ["place-order"],
    mutationFn: async (variables) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
        products: variables.products,
        userId: variables.userId,
        address: variables.address,
        phone: variables.phone,
        pincode: variables.pincode,
        total: variables.total,
      });
    },
  });
};

export const useGetFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      return axios.get(`${import.meta.env.VITE_API_URL}/products/featured`);
    },
  });
};

export const useClearCart = () => {
  return useMutation({
    mutationKey: ["clear-cart"],
    mutationFn: async (userId) => {
      return axios.delete(`${import.meta.env.VITE_API_URL}/cart/clear`, {
        data: {
          userId,
        },
      });
    },
  });
};
