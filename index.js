const Configuration = require('./config');

const bodyParser = require('body-parser')
const express = require('express')
const revendeur = require('./src/routes/revendeur.routes')
const winston = require('winston'),  expressWinston = require('express-winston');


const app = express();
const port = process.env.PORT || "8000";

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; }
}));

app.use("/revendeur", revendeur)


app.listen(Configuration.PORT, () => {
    console.log(`Listening to requests on port:${port}`);
})