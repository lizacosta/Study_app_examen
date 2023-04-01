const { sequelize } = require("../connection");
const { ThemeModel } = require("../model/theme.model");

const listar = async function (textoBuscar) {
  console.log("listar temas");
  try {
    const themes = await sequelize.query(`SELECT *
                                          FROM themes
                                          WHERE 1=1
                                            AND name LIKE '%${textoBuscar}%'
                                            AND deleted IS false
                                          ORDER BY id`);
    if (themes && themes[0]){
      return themes[0];
    } else {
      return [];
    }
  } catch (error) {
    console.log(error)
  }
};

const consultarPorCodigo = async function (codiBuscar) {
  console.log("consultar tema por código ");
  try {
    const themes = await sequelize.query(`SELECT * 
                                            FROM themes 
                                            WHERE 1=1
                                            AND id = ${codiBuscar}
                                            AND deleted IS false`);
    console.log("themes", themes);
    if (themes && themes[0] && themes[0][0]) {
      return themes[0]
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
  }
};

const actualizar = async function (id, create_date, name, description,
keywords, owner_user_id, deleted) {
  console.log("actualizar temas");
  //res.send("actualizción de temas");
  //Variables
  let temaRetorno = null; //Guarda el tema que se va a incluir o editar.
  const data = {id, create_date, name, description, keywords,
    owner_user_id, deleted}
  try {
    let tmExiste = null;
    if (id) {
      tmExiste = await ThemeModel.findByPk(id);
    }
    if (tmExiste) {
      //Asegurar que el tema existe, entonces actualizar
      temaRetorno = await ThemeModel.update(data, { where: { id: id }});
      temaRetorno = data;
    } else {
      //Incluir
      temaRetorno = await ThemeModel.create(data);
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
};

const eliminar = async function (codiBorrar) {
  console.log("eliminar temas");
  //res.send("eliminar de temas");

  await sequelize.query(
    "UPDATE themes SET deleted=true WHERE id = " + codiBorrar
  );
};

module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo,
};