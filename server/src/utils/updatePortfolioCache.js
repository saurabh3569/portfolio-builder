const {
  Portfolio,
  User,
  Education,
  Experience,
  Project,
  Skill,
  SocialLink,
} = require("../models");
const redis = require("../config/redis");

const updatePortfolioCache = async (req, user) => {
  const methodsToCache = ["POST", "PUT", "DELETE"];

  if (!methodsToCache.includes(req.method)) return;

  try {
    const portfolio = await Portfolio.findByPk(user.portfolio.id, {
      include: [
        { model: User, as: "user" },
        { model: Education, as: "educations" },
        {
          model: Experience,
          as: "experiences",
          order: [["startDate", "DESC"]],
        },
        { model: Project, as: "projects" },
        { model: Skill, as: "skills" },
        { model: SocialLink, as: "socialLinks" },
      ],
    });

    if (portfolio) {
      await redis.set(user.username, JSON.stringify(portfolio), "EX", 60 * 60); // 1 hour
    }
  } catch (err) {
    console.error("❌ Error updating Redis cache:", err);
  }
};

module.exports = updatePortfolioCache;
