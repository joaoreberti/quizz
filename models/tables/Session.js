module.exports = function (sequelize, DataTypes) {
  var Session = sequelize.define(
    "Session",
    {
      game_session_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      users_id: { allowNull: false, type: DataTypes.INTEGER },
      points: { type: DataTypes.STRING },
    },
    {
      timestamps: false,
      freezeTableName: false, // Model tableName will be the same as the model name
      tableName: "session_players",
    }
  );

  return Session;
};
