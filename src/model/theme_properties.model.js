const {DataTypes} = require('sequelize');
const {sequelize} = require("../connection");

const ThemePropertyModel = sequelize.define('Theme_property',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, primaryKey:true, autoIncrement:  true
    },
    theme_id: {
        type: DataTypes.TIME, allowNull: false
    },
    property_name: {
        type: DataTypes.STRING, allowNull: false
    },
    property_value: {
        type: DataTypes.STRING, allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN, allowNull: false
    }
},{
    tableName: 'themes_properties',
    timestamps: false
});

module.exports = {
    ThemePropertyModel
};