const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,30]
      }
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
        isExtension(value) {
          if (!/\.(jpg|jpeg|png)$/.test(value)) {
            throw new Error("Must be a valid image URL");
          }
        }
      }
    },

    released: {
      type: DataTypes.DATEONLY,
      allowNull: false,

    },

    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
        max: 5
      }
    }

  }, { timestamps: false });
};
