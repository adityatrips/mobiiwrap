"use client";

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
	const [categories, setCategories] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get("/api/category");
				setCategories(response.data.categories);
			} catch (error) {
				console.error(`Error fetching categories: ${error}`);
				setCategories([]);
			}
		};

		fetchCategories();
	}, []);

	return (
		<CategoryContext.Provider
			value={{
				categories,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
};

export { CategoryContext, CategoryProvider };
