module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define(
    "Education",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      degree: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "start_date",
      },
      endDate: {
        type: DataTypes.DATE,
        field: "end_date",
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "educations",
      timestamps: true,
      underscored: true,
    }
  );

  Education.associate = (models) => {
    Education.belongsTo(models.Portfolio, {
      foreignKey: "portfolio_id",
      as: "portfolio",
      onDelete: "CASCADE",
    });
  };

  return Education;
};
