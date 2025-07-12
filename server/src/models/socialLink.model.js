module.exports = (sequelize, DataTypes) => {
  const SocialLink = sequelize.define(
    "SocialLink",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "social_links",
      timestamps: true,
      underscored: true,
    }
  );

  SocialLink.associate = (models) => {
    SocialLink.belongsTo(models.Portfolio, {
      foreignKey: "portfolio_id",
      as: "portfolio",
      onDelete: "CASCADE",
    });
  };

  return SocialLink;
};
