

//schema for data in SQL table: Products 

CREATE TABLE products(
item_id integer(10) AUTO_INCREMENT,
PRIMARY KEY(item_id),
product_name varchar(40) not null,
department_name varchar(25) not null, 
price decimal(10,2) not null,
stock_quantity integer(10) not null
);