const ThemeService = require("../../service/themes.service");

const listar = async function (req, res) {
  console.log("listar temas controller");
  try {
    const themes = await ThemeService.listar(req.query.filtro || '')

    if (themes) {
      res.json({
        success: true,
        temas: themes,
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
  console.log("consultar tema por código ");
  try {
    const theme = await ThemeService.consultarPorCodigo(req.params.id);
    console.log("themes", theme);
    if (theme && theme[0] && theme[0][0]) {
      res.json({
        success: true,
        tema: theme[0][0],
      });
    } else {
      res.json({
        success: true,
        tema: theme,
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
  console.log("actualizar temas");
  //res.send("actualizción de temas");
  //Variables
  let temaRetorno = null; //Guarda el tema que se va a incluir o editar.
  const data = req.body; //Se obtienen datos del cuerpo de la petición
  const id = req.body.id;
  try {
    temaRetorno = await ThemeService.actualizar(req.body.id,
      req.body.create_date,
      req.body.name,
      req.body.description,
      req.body.keywords,
      req.body.owner_user_id,
      req.body.deleted)
    
    res.json({
      success: true,
      theme: temaRetorno,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
};

const eliminar = async function (req, res) {
  console.log("eliminar temas");
  //res.send("eliminar de temas");

  await ThemeService.eliminar(req.params.id)

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