import Phone from "@/models/Phone";

export const GET = async (req, { params: { brand } }) => {
	try {
		const models = await Phone.find({ brand }).select("model -_id");
		return Response.json(
			models.map((phone) => phone.model),
			{ status: 200 }
		);
	} catch (error) {
		return Response.json(
			{ message: "Failed to fetch models" },
			{ status: 500 }
		);
	}
};
