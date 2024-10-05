"use client";
import { useParams } from "next/navigation";
import Category from "./Category";

const Cate = () => {
	const { id } = useParams();
	return (
		<div>
			<Category params={id} />
		</div>
	);
};

export default Cate;
