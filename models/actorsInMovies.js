const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const ActorsInMovies = sequelize.define('actorsinmovie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { ActorsInMovies };
