'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'title',
      {
        allowNull: false,
        type: Sequelize.STRING,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tasks', 'title');
  }
};
