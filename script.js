var xlsx = require("xlsx");

function genPass() {
    var wb = xlsx.readFile(__dirname + '/input-files/contraseñas.xlsx');
    var ws = wb.Sheets["Hoja1"];
    var data = xlsx.utils.sheet_to_json(ws);


    var newData = data.map(function (record) {
        var numero = String(record.Numero);
        var nombre = record.Nombre;
        var puesto = record.Puesto;

        var n = nombre.length - 1;
        var c = numero.length - 1;
        var p = puesto.length - 1;

        var c1 = puesto[0];
        var c2 = numero[0];
        var c3 = nombre[0];
        var c4 = nombre[n];
        var c5 = nombre[2];
        var c6 = numero[c];
        var c7 = puesto[p];

        record.Contraseña = c1 + c2 + c3 + c4 + c5 + c6 + c7;
        return record;
    });

    var newWB = xlsx.utils.book_new();
    var newWS = xlsx.utils.json_to_sheet(newData);
    xlsx.utils.book_append_sheet(newWB, newWS, "Contraseñas")

    xlsx.writeFile(newWB, __dirname + "./output-files/Contraseñas_generadas.xlsx");
}
module.exports = {genPass};