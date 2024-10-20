export interface AuthSliceState {
  auth: {
    user: User | null;
    isLoggedIn: boolean;
  };
}

export interface ThemeSliceState {
  theme: {
    isDark: boolean;
  };
}

export interface User {
  _id: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  email: string;
  name: string;
  password: string;
  phone: {
    code: string;
    number: string;
  };
  role: string;
  token: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  slug: string;
  image: string;
  deviceType: string;
  rating: number;
  category: Category;
  description: string;
  stock: number;
  sold: number;
  __v: number;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
  __v: number;
}

export interface CartProduct {
  item: {
    _id: string;
    name: string;
    price: number;
    slug: string;
    image: string;
    category: string;
    rating: number;
    reviews: number[] | [];
  };
  quantity: number;
  cost: number;
  _id: string;
}

export interface UserCart {
  user: string;
  cart: Cart;
}

export interface Cart {
  _id: string;
  user: string;
  phoneBrand: string;
  phoneModel: string;
  products: CartProduct[];
  totalItems: number;
  total: number;
}
