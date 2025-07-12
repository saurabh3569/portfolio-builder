module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
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
      description: {
        type: DataTypes.TEXT,
      },
      startDate: {
        type: DataTypes.DATE,
        field: "start_date",
      },
      endDate: {
        type: DataTypes.DATE,
        field: "end_date",
      },
      technologies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      liveLink: {
        type: DataTypes.STRING,
        field: "live_link",
      },
      sourceCodeLink: {
        type: DataTypes.STRING,
        field: "source_code_link",
      },
    },
    {
      tableName: "projects",
      timestamps: true,
      underscored: true,
    }
  );

  Project.associate = (models) => {
    Project.belongsTo(models.Portfolio, {
      foreignKey: "portfolio_id",
      as: "portfolio",
      onDelete: "CASCADE",
    });
  };

  return Project;
};
