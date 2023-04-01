const {DataTypes} = require('sequelize');
const {sequelize} = require("../connection");

const ThemeModel = sequelize.define('Theme',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, primaryKey:true, autoIncrement:  true
    },
    create_date: {
        type: DataTypes.TIME, allowNull: false
    },
    name: {
        type: DataTypes.STRING, allowNull: false
    },
    description: {
        type: DataTypes.STRING, allowNull: false
    },
    keywords: {
        type: DataTypes.STRING, allowNull: true
    },
    owner_user_id: {
        type: DataTypes.INTEGER, allowNull: true
    },
    deleted: {
        type: DataTypes.BOOLEAN, allowNull: false
    }
},{
    tableName: 'themes',
    timestamps: false
});

module.exports = {
    ThemeModel
};