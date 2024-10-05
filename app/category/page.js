"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

const CategoryPage = () => {
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

	return categories === null ? (
		<div>loading...</div>
	) : (
		<div className="w-full md:w-10/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
				{categories?.map((category) => (
					<li key={category.name}>
						<Link
							href={`/category/${category._id}`}
							className="group relative block"
						>
							<Image
								height={300}
								width={300}
								src={`${category.mainImage}?format=jpg`}
								alt="category"
								className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90 rounded-md"
							/>

							<div className="absolute inset-0 flex flex-col items-start justify-end p-6">
								<h3 className="text-xl font-medium text-white">
									{category.name}
								</h3>

								<span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded">
									Shop Now
								</span>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryPage;
