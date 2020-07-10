module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: { allowNull: false, type: DataTypes.STRING, unique: true },
      avatar_url: { allowNull: false, type: DataTypes.STRING },
      password: { allowNull: false, type: DataTypes.STRING },
    },
    {
      timestamps: false,
      freezeTableName: false, // Model tableName will be the same as the model name
      tableName: "users",
    }
  );

  return User;
};
