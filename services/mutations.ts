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
