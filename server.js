const express = require('express');
const app = express();
const multer = require('multer');
const mimeTypes = require('mime-types');
const PORT = process.env.PORT || 5000;

let generador = require('./script.js');

const storage = multer.diskStorage({
    destination: 'input-files/',
    filename: function (req, file, cb) {
        cb("", "contraseñas" + "." + mimeTypes.extension(file.mimetype));
    }
})

const upload = multer({
    storage: storage
})

app.set('view engine','ejs');

app.get("/", (req, res) => {
    res.render('index');
})

app.get("/dexcel", (req, res) => {
    res.render('dexcel');
})

app.post("/envios", upload.single('excel'), (req, res) => {
    generador.genPass();
    res.redirect('/dexcel');
})

app.post("/download", (req, res) => {
    res.download(__dirname + "/output-files/Contraseñas_generadas.xlsx");
})

app.listen(PORT, () => console.log("Server started"));