
//customer facing application for SQL table: Products.

//require sql
var sql = require('mysql');

//require inquirer
var inquirer = require('inquirer');


//create connection to the SQL table 
var connection = sql.createConnection({

	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon'

});

connection.connect(function(err){

	if (err) throw err;

	startPurchase();

});


function startPurchase(){

var query = "SELECT * FROM bamazon";

connection.query(query, function(err, res){



});



inquirer.
	prompt({
	[
		type: 'input',
		name: 'productId',
		message: 'What is the product ID number?'

	], 

	[

		type: 'input',
		name: 'userQuantity',
		message: 'How many would you like?'

	]

	}).then(function(response){

		var query = 


	})


}





connection.end();