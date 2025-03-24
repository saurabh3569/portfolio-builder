const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String },
    technologies: [{ type: String }],
    portfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
    },
  },
  { timestamps: true }
);

experienceSchema.index({ portfolio: 1 });

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
