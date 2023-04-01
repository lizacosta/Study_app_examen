const { sequelize } = require("../connection");
const { UserModel } = require("../model/user.model");

const listar = async function (textoBuscar) {
  console.log("listar usuarios");
  try {
    const users = await sequelize.query(`SELECT *
                                          FROM users
                                          WHERE 1=1
                                            AND (name LIKE '%${textoBuscar}%'
                                            OR last_name LIKE '%${textoBuscar}%')
                                            AND deleted IS false
                                          ORDER BY id`);
    if (users && users[0]){
      return users[0];
    } else {
      return [];
    }
  } catch (error) {
    console.log(error)
  }
};

const consultarPorCodigo = async function (codiBuscar) {
  console.log("consultar usuario por código ");
  try {
    const users = await sequelize.query(`SELECT * 
                                            FROM users 
                                            WHERE 1=1
                                            AND id = ${codiBuscar}
                                            AND deleted IS false`);
    console.log("users", users);
    if (users && users[0] && users[0][0]) {
      return users[0]
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
  }
};

const actualizar = async function (id, name, last_name, avatar, email, password, deleted) {
  console.log("actualizar usuarios");
  //res.send("actualizción de usuarios");
  //Variables
  let usuarioRetorno = null; //Guarda el usuario que se va a incluir o editar.
  const data = {id, name, last_name, avatar, email, password, deleted}
  try {
    let usrExiste = null;
    if (id) {
      usrExiste = await UserModel.findByPk(id);
    }
    if (usrExiste) {
      //Asegurar que el usuario existe, entonces actualizar
      usuarioRetorno = await UserModel.update(data, { where: { id: id }});
      usuarioRetorno = data;
    } else {
      //Incluir
      usuarioRetorno = await UserModel.create(data);
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
};

const eliminar = async function (codiBorrar) {
  console.log("eliminar usuarios");
  //res.send("eliminar de usuarios");

  await sequelize.query(
    "UPDATE users SET deleted=true WHERE id = " + codiBorrar
  );
};

module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo,
};