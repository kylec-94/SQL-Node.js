
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

	var productQuery = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products";

	connection.query(productQuery, function(err, result){

		
		console.log(""); // for spacing in the console
		console.log("Welcome to Bamazon!");
		console.log("");
		console.log("Here are the items for sale: ");
		console.log("----------------------------");


		for (var i = 0; i < result.length; i++) {
		
			console.log("Product ID: " + result[i].item_id + " || Product Name: " + result[i].product_name + 
						" || Department: " + result[i].department_name + " || Price: $" + result[i].price + 
						" || Remaining Stock: " + result[i].stock_quantity);

			console.log("----------------------------");


		}

		askUser();
	});
	

	

}


function askUser(){


inquirer.
	prompt([
	{
		type: 'input',
		name: 'productId',
		message: 'What is the product ID number?'

	}, 

	{

		type: 'input',
		name: 'userQuantity',
		message: 'How many would you like?'

	}

	]).then(function(answer){

		var idQuery = "SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?";

		connection.query(idQuery, {item_id: answer.productId}, function(err,res){


			if (res[0].stock_quantity - answer.userQuantity > 0){

				var stockQuery = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?';

				connection.query(stockQuery, [(res[0].stock_quantity - answer.userQuantity), answer.productId], function(err, result){
			
		
				});//end table stock reduce query
			

			console.log("");
			console.log("Product name: " + res[0].product_name);
			console.log(""); // for spacing in the console
			console.log("Price per unit: $" + res[0].price);
			console.log(""); // for spacing in the console
			console.log("Your total is: $" + (res[0].price * answer.userQuantity));
			console.log("");
			console.log("|| STARTING NEW PURCHASE ||");
			startPurchase();
			}//end if statment
			else{

				console.log("Sorry, insufficient stock to complete your order, please try again!");
				startPurchase();

			}


		});//closes connection.query


		

		

	});//closes the function(answer) function 




}//closes askUser function










