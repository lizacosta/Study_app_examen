const themeController = require('../../controller/themes/themes_properties.controller');

module.exports = function(app) {

    app.get("/themes_properties/list", themeController.listar);
    app.get("/themes_properties/:id", themeController.consultarPorCodigo);
    app.post("/themes_properties/update", themeController.actualizar);
    app.delete("/themes_properties/delete/:id", themeController.eliminar);
}