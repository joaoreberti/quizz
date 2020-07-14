"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /* Add altering commands here.
      Return a promise to correctly handle asynchronicity. */

    return queryInterface.bulkInsert(
      "User",
      [
        {
          username: "reberti",
          avatar_url: "https://api.adorable.io/avatars/face/51",
          password:
            "$2b$10$l5exUgPkYtEQHazuILTlduVMvUhIfe7XrjtMW9XZG/ou4OdgbNzp2",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
