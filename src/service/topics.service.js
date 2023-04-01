const { sequelize } = require("../connection");
const { TopicModel } = require("../model/topics.model");

const listar = async function (textoBuscar) {
  console.log("listar topicos");
  try {
    const topics = await sequelize.query(`SELECT *
                                          FROM topics
                                          WHERE 1=1
                                            AND name LIKE '%${textoBuscar}%'
                                            AND deleted IS false
                                          ORDER BY id`);
    if (topics && topics[0]){
      return topics[0];
    } else {
      return [];
    }
  } catch (error) {
    console.log(error)
  }
};

const consultarPorCodigo = async function (codiBuscar) {
  console.log("consultar topico por código ");
  try {
    const topics = await sequelize.query(`SELECT * 
                                            FROM topics 
                                            WHERE 1=1
                                            AND id = ${codiBuscar}
                                            AND deleted IS false`);
    console.log("topics", topics);
    if (topics && topics[0] && topics[0][0]) {
      return topics[0]
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
  }
};

const actualizar = async function (id, create_date, name, topic_id,
order, priority, color, owner_user_id, deleted) {
  console.log("actualizar topicos");
  //res.send("actualizción de topicos");
  //Variables
  let topicoRetorno = null; //Guarda el topico que se va a incluir o editar.
  const data = {id, create_date, name, topic_id, order, priority,
    color, owner_user_id, deleted}
  try {
    let tpcExiste = null;
    if (id) {
      tpcExiste = await TopicModel.findByPk(id);
    }
    if (tpcExiste) {
      //Asegurar que el topico existe, entonces actualizar
      topicoRetorno = await TopicModel.update(data, { where: { id: id }});
      topicoRetorno = data;
    } else {
      //Incluir
      topicoRetorno = await TopicModel.create(data);
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
};

const eliminar = async function (codiBorrar) {
  console.log("eliminar topicos");
  //res.send("eliminar de topicos");

  await sequelize.query(
    "UPDATE topics SET deleted=true WHERE id = " + codiBorrar
  );
};

module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo,
};