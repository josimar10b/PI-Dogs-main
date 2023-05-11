
const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('Temperaments', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    })
}
