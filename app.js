const express = require('express');
const app = express();

/* Cors no está instalado en el proyecto, pero escribo el código en caso de habilitar la comunicación cruzada */

// const cors = require("cors");

// app.use(
//     cors({
//         credentials: true,
//         origin: [process.env.FRONTEND_POINT, 'http://localhost:3000', process.env.FRONTEND_CPANEL]
//     })
// );

const routes = require('./routes');
app.use('/api', routes);

app.listen(3000, () => console.log('App listening on port 3000!'));