module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "skills",
      timestamps: true,
      underscored: true,
    }
  );

  Skill.associate = (models) => {
    Skill.belongsTo(models.Portfolio, {
      foreignKey: "portfolio_id",
      as: "portfolio",
      onDelete: "CASCADE",
    });
  };

  return Skill;
};
