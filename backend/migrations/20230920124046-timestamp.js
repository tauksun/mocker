"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn("userCode", "createdAt", {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }),

      queryInterface.addColumn("userCode", "updatedAt", {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
