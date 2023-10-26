const {  DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Genre', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            valdate: {
                len: [2,25]
            }
        }
    },{timestamps: false})
}