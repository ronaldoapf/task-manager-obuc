'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Tasks extends Model {
		static associate(models) {
      this.belongsTo(models.Tags, {
        foreignKey: 'tagId',
        as: 'tags',
      });
    }
	}
	
	Tasks.init(
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
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			tagId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Tags',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
			status: {
				type: DataTypes.ENUM('pending', 'inProgress', 'completed'),
				allowNull: false,
				defaultValue: 'pending',
			},
			assignedTo: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.fn('NOW'),
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.fn('NOW'),
			},
		},
		{
			sequelize,
			modelName: 'Tasks',
			tableName: 'Tasks',
		}
	);
	
	return Tasks;
};
