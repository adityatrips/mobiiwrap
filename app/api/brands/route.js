import Phone from "@/models/Phone";

export const GET = async (req, res) => {
	try {
		const brands = await Phone.distinct("brand");
		return Response.json(brands, { status: 200 });
	} catch (error) {
		return Response.json(
			{ message: "Failed to fetch brands" },
			{ status: 500 }
		);
	}
};
