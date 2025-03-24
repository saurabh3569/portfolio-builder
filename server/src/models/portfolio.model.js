const mongoose = require("mongoose");

const portfolioSchema = mongoose.Schema(
  {
    summary: { type: String },
    resume: { type: String },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }],
    educations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    socialLinks: [{ type: mongoose.Schema.Types.ObjectId, ref: "SocialLink" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

portfolioSchema.index({ user: 1 });

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
