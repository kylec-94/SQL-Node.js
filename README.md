# SQL-Node.js
SQL schema with Node.js inputs


**Description**

This app is designed to take in commands from the CLI, and display content from the SQL database regarding lists of products and their characteristics. 

The user will be prompted via inquirer prompts to designate what the user would like to do with the data. 

From the Customer View, the user will be prompted with a list of the items for sale, and the respective properties. The user will then be asked which product they would like to purchase, and at what quantity.
	-if there is an insufficient amount of product, the console will display "Insufficient quantity!"
	-if there is enough quantity, the reflected changes will appear in the SQL database. 



**Links to Screenshots of App:**

![Screenshot of the initial prompt in console](/screenshots/initial-screen?raw=true "Initial Prompt")

![Screenshot of completed order with changes reflected in quantity](/screenshots/completed-order1?raw=true "First Completed Order")

![Screenshot of second completed order, confirming old order info was reflected in database](/screenshots/completed-order2?raw=true "Second Completed Order")

![Incomplete order, system knows there's not enough stock to satisfy order, error message, customer orders again](/screenshots/incomplete-order?raw=true "Incomplete Order")