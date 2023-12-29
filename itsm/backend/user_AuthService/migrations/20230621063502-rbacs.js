'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('rbacs', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
       },
       user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Assuming there is a 'users' table
          key: 'user_id'
        }
    },
      role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'roles', // Assuming there is a 'roles' table
        key: 'role_id'
      }
  },
     resource_id: {
     type: Sequelize.INTEGER,
     allowNull: false,
     references: {
      model: 'resources', // Assuming there is a 'resources' table
      key: 'resource_id'
    }
},
     })
  },
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
 

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('rbacs');
  }
};
