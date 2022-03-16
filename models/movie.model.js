const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Movie = sequelize.define('movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  decription: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'active'
  }
});

module.exports = { Movie };
