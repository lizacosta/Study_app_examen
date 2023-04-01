const { sequelize } = require("../../connection");
const { UserModel } = require("../../model/user.model");
const UserService = require("../../service/users.service");

const listar = async function (req, res) {
  console.log("listar usuarios controller");
  try {
    const users = await UserService.listar(req.query.filtro || '')

    if (users) {
      res.json({
        success: true,
        usuarios: users,
      });
    } else {
      res.json({
        success: true,
        usuarios: [],
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const consultarPorCodigo = async function (req, res) {
  console.log("consultar usuario por código ");
  try {
    const user = await UserService.consultarPorCodigo(req.params.id);
    console.log("users", user);
    if (user && user[0] && user[0][0]) {
      res.json({
        success: true,
        usuario: user[0][0],
      });
    } else {
      res.json({
        success: true,
        usuario: user,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const actualizar = async function (req, res) {
  console.log("actualizar usuarios");
  //res.send("actualizción de usuarios");
  //Variables
  let usuarioRetorno = null; //Guarda el usuario que se va a incluir o editar.
  const data = req.body; //Se obtienen datos del cuerpo de la petición
  const id = req.body.id;
  try {
    usuarioRetorno = await UserService.actualizar(req.body.id,
      req.body.name,
      req.body.last_name,
      req.body.avatar,
      req.body.email,
      req.body.password,
      req.body.deleted)
    
    res.json({
      success: true,
      user: usuarioRetorno,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
};

const eliminar = async function (req, res) {
  console.log("eliminar usuarios");
  //res.send("eliminar de usuarios");

  await UserService.eliminar(req.params.id)

  res.json({
    success: true,
  });
};

module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo,
};