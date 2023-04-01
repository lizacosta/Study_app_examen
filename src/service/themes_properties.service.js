const { sequelize } = require("../connection");
const { ThemePropertyModel } = require("../model/theme_properties.model");

const listar = async function (textoBuscar) {
  console.log("listar propiedades de temas");
  try {
    const themesProperties = await sequelize.query(`SELECT *
                                          FROM themes_properties
                  
                                          ORDER BY id`);
    if (themesProperties && themesProperties[0]){
      return themesProperties[0];
    } else {
      return [];
    }
  } catch (error) {
    console.log(error)
  }
};

const consultarPorCodigo = async function (codiBuscar) {
  console.log("consultar propiedad de tema por código ");
  try {
    const themesProperties = await sequelize.query(`SELECT * 
                                            FROM themes_properties 
                                            WHERE 1=1
                                            AND id = ${codiBuscar}
                                            AND deleted IS false`);
    console.log("themesProperties", themesProperties);
    if (themesProperties && themesProperties[0] && themesProperties[0][0]) {
      return themesProperties[0]
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
  }
};

const actualizar = async function (id, theme_id, property_name, property_value, deleted) {
  console.log("actualizar propiedades de temas");
  //res.send("actualizción de temas");
  //Variables
  let temaPropiedadRetorno = null; //Guarda la propiedad de tema que se va a incluir o editar.
  const data = {id, theme_id, property_name, property_value, deleted}
  try {
    let tmProExiste = null;
    if (id) {
      tmProExiste = await ThemePropertyModel.findByPk(id);
    }
    if (tmProExiste) {
      //Asegurar que el tema existe, entonces actualizar
      temaPropiedadRetorno = await ThemePropertyModel.update(data, { where: { id: id }});
      temaPropiedadRetorno = data;
    } else {
      //Incluir
      temaPropiedadRetorno = await ThemePropertyModel.create(data);
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
};

const eliminar = async function (codiBorrar) {
  console.log("eliminar propiedades de temas");
  //res.send("eliminar de temas");

  await sequelize.query(
    "delete from themes_properties WHERE id = " + codiBorrar
  );
};

module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo,
};