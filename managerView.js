
// require packages 
var sql = require('mysql');

var inquirer = require('inquirer');


//establish connection to sql database 
var connection = sql.createConnection({

host: 'localhost',
port: 3306,
user: 'root',
password: '',
database: 'bamazon'

});


//start connection 
connection.connect(function(err){

	if (err) throw err;

	promptManager();

});

//prompt manager with list of actions
function promptManager() {

	inquirer.
		prompt({

			name: 'action',
			type: 'list',
			message: 'What would you like to do?',
			choices: [
			'View products for sale',
			'View low inventory',
			'Add to inventory',
			'Add new product',
			]
		})//end of prompt
		.then(function(answer){

			switch (answer.action){

				case 'View products for sale':
				productDisplay();
				break;

				case 'View low inventory':
				lowInventory();
				break;

				case 'Add to inventory':
				addInventory();
				break;

				case 'Add new product':
				addProduct();
				break;

			}

		}); //end switch statement 
}//end promptManager


//displays product list 
function productDisplay(){
	
	var productQuery = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products";

	connection.query(productQuery, function(err, result){

		
		console.log(""); // for spacing in the console
		console.log("Welcome to the Manager view");
		console.log("");
		console.log("Here are the items in stock: ");
		console.log("----------------------------");


		for (var i = 0; i < result.length; i++) {
		
			console.log("Product ID: " + result[i].item_id + " || Product Name: " + result[i].product_name + 
						" || Department: " + result[i].department_name + " || Price: $" + result[i].price + 
						" || Remaining Stock: " + result[i].stock_quantity);

			console.log("----------------------------");


		}

		promptManager();
	});

}

//displays products with quantity <= 5
function lowInventory(){
	
	var lowInvFactor = 5;
	var lowInvQuery = 'SELECT * FROM products WHERE stock_quantity <= ?'

	connection.query(lowInvQuery, lowInvFactor, function(err, res){

			for (var i = 0; i < res.length; i++) {
				
				console.log("Product ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + 
						" || Department: " + res[i].department_name + " || Price: $" + res[i].price + 
						" || Remaining Stock: " + res[i].stock_quantity);

				console.log("----------------------------");
			}//end of for loop


		promptManager();
	});

}

//add to inventory 
function addInventory(){

inquirer.
	prompt([{

	name: 'productId',
	type: 'input',
	message: 'What is the ID of the product you want to add inventory to?'

	},
	{

	name: 'quantity',
	type: 'input',
	message: 'How many do you want to add?'

	}
	]).then(function(answer){

		var addInvQuery = 'UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?';

		connection.query(addInvQuery,[answer.quantity, answer.productId], function(req,res){

		console.log('');
		console.log('');
		console.log('// Added inventory to ' + answer.productId + ' by ' + answer.quantity + ' units.'  );
		console.log('');

		promptManager();

		});//end query

	});//end callback function 


}//end addInventory();

function addProduct(){

	inquirer.
		prompt([
		{
			name: 'productName',
			type: 'input',
			message: 'What is the name of the product? (Add spaces!)'

		},

		{
			name: 'productDept',
			type: 'input',
			message: 'What department is this item in?'

		},

		{
			name: 'price',
			type: 'input',
			message: "How much will this item cost? (Don't add dollar sign)"

		}

		]).then(function(answer){

			var addProdQuery = 'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)';

			connection.query(addProdQuery,[answer.productName, answer.productDept, answer.price, 10] ,function(err, res){

				console.log('///////');
				console.log('');
				console.log('Added ' + answer.productName + ' to table products!');
				console.log('');
				console.log('///////');

				promptManager();

			});


		});


}// ends addProduct










