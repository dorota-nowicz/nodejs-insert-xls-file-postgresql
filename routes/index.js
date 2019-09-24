var express = require('express');
var router = express.Router();
var formidable = require('formidable');
const path = require("path")
const readXlsxFile = require('read-excel-file/node');
const fs = require("fs")
const models  = require('../models');

const schema = {
  'Contador': {
    prop: 'contador',
    type: Number,
    required: true
  },
  'Fecha': {
    prop: 'fecha',
    type: Date
    // Excel stores dates as integers.
    // E.g. '24/03/2018' === 43183.
    // Such dates are parsed to UTC+0 timezone with time 12:00 .
  },
  'Consumo': {
    prop: 'consumo',
	type: Number,
    required: true,
  }
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET upload page. */
router.get('/uploadfile', function(req, res, next) {
	 res.render('uploadfile', { title: 'Upload Data Test' });

});

/* POST Data. */
router.post('/uploadfile', function(req, res, next) {
	
	 var form = new formidable.IncomingForm();
	 
	 form.parse(req, function (err, fields, files) {
		 var oldpath = files.filetoupload.path;
		 var newpath = './public/uploads/' + files.filetoupload.name;

		// Read the file
		fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            console.log('File read!');

			 // Write the file
			fs.writeFile(newpath, data, function (err) {
					if (err) throw err;
				});

			// Delete the file
			fs.unlink(oldpath, function (err) {
					if (err) throw err;
					console.log('File deleted!');
				});

		});
		
		Promise.all([newpath,oldpath]).then(function(responses){

				var newpath = JSON.parse(JSON.stringify(responses[0]));
				readXlsxFile(newpath).then((rows) => {
				  // `rows` is an array of rows
				  // each row being an array of cells.
				  console.log(rows);
				});
				
				readXlsxFile(newpath, { schema }).then(({ rows, errors }) => {
					// `errors` have shape `{ row, column, error, value }`.
					errors.length === 0
					console.log(rows);
				  

					rows.forEach(function(row, index, array) {
						
								models.maestrobomba.findOne({ 
															where: {contador: row.contador},
															attributes: ['idbomba','fk_bombeo'],
														  }).then(bomba => {
/
															  models.exportlectura.findOrCreate(
																								{
																									where:{
																										contador: Number(row.contador),
																										consumo: Number(row.consumo),
																										fecha: row.fecha,
																										//fk_bombeo: bomba.fk_bombeo,
																										fk_bomba: bomba.idbomba,
																									}
																								})
														  })
						
						
							
					});
	 
				});	
				
				
                 res.render(
                    'uploadfile',  { 
								title: 'test',
								msg: 'se ha acutliazado varas filas'
                                },
                    );
					
		});
	
	});
			

});
module.exports = router;