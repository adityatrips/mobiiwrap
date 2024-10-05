import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
	brand: {
		type: String,
		required: true,
	},
	model: {
		type: String,
		required: true,
	},
});

const Phone = mongoose.models.Phone || mongoose.model("Phone", phoneSchema);

export default Phone;
