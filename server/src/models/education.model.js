const mongoose = require("mongoose");

const educationSchema = mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String },
    portfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
    },
  },
  { timestamps: true }
);

educationSchema.index({ portfolio: 1 });

const Education = mongoose.model("Education", educationSchema);
module.exports = Education;
