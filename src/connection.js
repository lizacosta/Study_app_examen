const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("bd_study_app", 'postgres', 'admin',{
    host : 'localhost' ,
    port : 5432,
    dialect : 'postgres'
});

const testConnection = function (){
    try {
        sequelize.authenticate();
        console.log("Conectado con exito");
    }catch(error){
        console.log("Error de Conexion".error);
    }
}
testConnection()
module.exports= {Sequelize, sequelize}