const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    technologies: [{ type: String }],
    portfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
    },
  },
  { timestamps: true }
);

projectSchema.index({ portfolio: 1 });

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
