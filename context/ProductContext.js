"use client";

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get("/api/product");
				setProducts(response.data);
				console.log(`ProductContext: ${JSON.stringify(response.data)}`);
			} catch (error) {
				console.error(`Error fetching products: ${error}`);
				setProducts([]);
			}
		};

		fetchCategories();
	}, []);

	return (
		<ProductContext.Provider
			value={{
				products,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export { ProductContext, ProductProvider };
