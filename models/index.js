let creteTable = require("./createTable")

exports.creteTable = () => {

    creteTable.createTableIfNotExists(
        `Customer`,
        `id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        card VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        `
        );

    creteTable.createTableIfNotExists(
        `Products`,
        `id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
        name VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        stock VARCHAR(255) NOT NULL,
        active BIT NOT NULL,
        category VARCHAR(255) NOT NULL,
        createdAt VARCHAR(255) NOT NULL,
        updatedAt VARCHAR(255)
        `);
    
    creteTable.createTableIfNotExists(
        `Orders`,
        `id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
        customer_ID INT NOT NULL,
        product_ID INT NOT NULL,
        quantity INT NOT NULL,
        createdAt VARCHAR(255) NOT NULL,
        updatedAt VARCHAR(255),
        FOREIGN KEY (customer_ID) REFERENCES Customer(id),
        FOREIGN KEY (product_ID) REFERENCES Products(id)
        `);
}