module.exports = function (sequelize, DataTypes) {
  var Game = sequelize.define(
    "Game",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      winner: { type: DataTypes.STRING },
      points: { type: DataTypes.STRING },
      active : { type: DataTypes.BOOLEAN },
      name : {        allowNull: false, type: DataTypes.STRING },

    },
    {
      timestamps: false,
      freezeTableName: false, // Model tableName will be the same as the model name
      tableName: "game_session",
    }
  );

  return Game;
};
