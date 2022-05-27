const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  return sequelize.define('cars', {
    id: {
      primaryKey: true,
      type: Sequelize.STRING,
    },
    registrationNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    color: {
        type: Sequelize.STRING,
    },
    model: {
        type: Sequelize.STRING,
    },
    make: {
        type: Sequelize.STRING,
    },
    categoriesId: {
        type: Sequelize.STRING,
        references: {
            model: 'categories',
            key: 'id',
            allowNull: false,
        }
    }
  }, {
    timestamps: true,
  });
};
