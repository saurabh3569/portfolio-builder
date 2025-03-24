const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

contactSchema.index({ user: 1 });

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
