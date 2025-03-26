const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    password: { type: String, required: true, select: false }, // `select: false` ensures password isn't included in queries by default
    name: { type: String, required: true },
    location: { type: String },
    username: { type: String, required: true, unique: true },
    portfolio: {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.index({ portfolio: 1 });

const User = model("User", userSchema);
module.exports = User;
