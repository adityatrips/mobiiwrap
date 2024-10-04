import { Schema, models, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},

		role: {
			type: String,
			enum: ["Admin", "Customer", "Guest"],
			default: "Customer",
		}, // Added role field
		address: {
			street: String,
			city: String,
			state: String,
			zip: String,
			country: String,
		},
		phoneNumber: String,
		dateJoined: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = bcrypt.hashSync(this.password, 10);
	next();
});

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

const User = models.User || model("User", userSchema);
export default User;
