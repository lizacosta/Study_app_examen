const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser());

const userRoute = require("./src/route/users/users.route");
const themeRoute = require("./src/route/themes/themes.route");
const themePropertyRoute = require("./src/route/themes/themes_properties.route");
const topicsRoute = require("./src/route/topics/topics.route");
 
//Ruta raiz
app.get('/', function (req, res) {
    //Logica.
    res.send(`<div style=color:red><h1>Hello World</h1></div>
                <h2>Hola mundo</h2>`);
});

app.get('/pagina2', function (req, res) {
    //Logica de negocios
    //esta aqui -Controller

    res.json({application: 'Study APP', version: '1.0.0'});
});

//Llamadas a los routes de los UCs
userRoute(app);
themeRoute(app);
themePropertyRoute(app)
topicsRoute(app);

//puerto en el cual se "escucha"
app.listen(4000);