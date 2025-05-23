const mongoose = require("mongoose");

const skillSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    portfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
    },
  },
  { timestamps: true }
);

skillSchema.index({ portfolio: 1 });

const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;
