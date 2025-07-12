module.exports = (sequelize, DataTypes) => {
  const Experience = sequelize.define(
    "Experience",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
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
      technologies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
    },
    {
      tableName: "experiences",
      timestamps: true,
      underscored: true,
    }
  );

  Experience.associate = (models) => {
    Experience.belongsTo(models.Portfolio, {
      foreignKey: "portfolio_id",
      as: "portfolio",
      onDelete: "CASCADE",
    });
  };

  return Experience;
};
