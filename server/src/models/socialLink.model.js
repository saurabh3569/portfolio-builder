const mongoose = require("mongoose");

const socialLinkSchema = mongoose.Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
    portfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
    },
  },
  { timestamps: true }
);

socialLinkSchema.index({ portfolio: 1 });

const SocialLink = mongoose.model("SocialLink", socialLinkSchema);
module.exports = SocialLink;
