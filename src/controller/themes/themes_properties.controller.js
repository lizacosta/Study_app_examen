const ThemePropertyService = require("../../service/themes_properties.service");

const listar = async function (req, res) {
  console.log("listar propiedades de temas controller");
  try {
    const themes_properties = await ThemePropertyService.listar(req.query.filtro || '')

    if (themes_properties) {
      res.json({
        success: true,
        temas: themes_properties,
      });
    } else {
      res.json({
        success: true,
        temas: [],
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
  console.log("consultar propiedad de tema por código ");
  try {
    const theme_property = await ThemePropertyService.consultarPorCodigo(req.params.id);
    console.log("themes_properties", theme_property);
    if (theme_property && theme_property[0] && theme_property[0][0]) {
      res.json({
        success: true,
        tema: theme_property[0][0],
      });
    } else {
      res.json({
        success: true,
        tema: theme_property,
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
  console.log("actualizar propiedades de temas");
    //Variables
  let propTemaRetorno = null; //Guarda la propiedad de tema que se va a incluir o editar.
  const data = req.body; //Se obtienen datos del cuerpo de la petición
  const id = req.body.id;
  try {
    propTemaRetorno = await ThemePropertyService.actualizar(req.body.id,
      req.body.theme_id,
      req.body.property_name,
      req.body.property_value,
      req.body.deleted)
    
    res.json({
      success: true,
      theme: propTemaRetorno,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
};

const eliminar = async function (req, res) {
  console.log("eliminar propiedades de temas");
  //res.send("eliminar de temas");

  await ThemePropertyService.eliminar(req.params.id)

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