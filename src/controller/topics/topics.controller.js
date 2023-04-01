const TopicService = require("../../service/topics.service");

const listar = async function (req, res) {
  console.log("listar topicos controller");
  try {
    const topics = await TopicService.listar(req.query.filtro || '')

    if (topics) {
      res.json({
        success: true,
        topicos: topics,
      });
    } else {
      res.json({
        success: true,
        topicos: [],
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
  console.log("consultar topico por código ");
  try {
    const topic = await TopicService.consultarPorCodigo(req.params.id);
    console.log("topics", topic);
    if (topic && topic[0] && topic[0][0]) {
      res.json({
        success: true,
        topico: topic[0][0],
      });
    } else {
      res.json({
        success: true,
        topico: topic,
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
  console.log("actualizar topicos");
  //res.send("actualizción de topicos");
  //Variables
  let topicoRetorno = null; //Guarda el topico que se va a incluir o editar.
  const data = req.body; //Se obtienen datos del cuerpo de la petición
  const id = req.body.id;
  try {
    topicoRetorno = await TopicService.actualizar(req.body.id,
      req.body.create_date,
      req.body.name,
      req.body.topic_id,
      req.body.order,
      req.body.priority,
      req.body.color,
      req.body.owner_user_id,
      req.body.deleted)
    
    res.json({
      success: true,
      topic: topicoRetorno,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
};

const eliminar = async function (req, res) {
  console.log("eliminar topicos");
  //res.send("eliminar de topicos");

  await TopicService.eliminar(req.params.id)

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