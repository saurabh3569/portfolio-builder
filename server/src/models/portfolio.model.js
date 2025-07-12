module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define(
    "Portfolio",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      summary: {
        type: DataTypes.TEXT,
      },
      resume: {
        type: DataTypes.STRING,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_public",
      },
    },
    {
      tableName: "portfolios",
      timestamps: true,
      underscored: true,
    }
  );

  Portfolio.associate = (models) => {
    Portfolio.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });

    Portfolio.hasMany(models.Skill, {
      foreignKey: "portfolio_id",
      as: "skills",
    });

    Portfolio.hasMany(models.Experience, {
      foreignKey: "portfolio_id",
      as: "experiences",
    });

    Portfolio.hasMany(models.Education, {
      foreignKey: "portfolio_id",
      as: "educations",
    });

    Portfolio.hasMany(models.Project, {
      foreignKey: "portfolio_id",
      as: "projects",
    });

    Portfolio.hasMany(models.SocialLink, {
      foreignKey: "portfolio_id",
      as: "socialLinks",
    });
  };

  return Portfolio;
};
