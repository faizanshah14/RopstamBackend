const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  return sequelize.define('categories', {
    id: {
      primaryKey: true,
      type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    }
  }, {
    timestamps: true,
  });
};
