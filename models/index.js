let creteTable = require("./createTable")

exports.creteTable = () => {

    creteTable.createTableIfNotExists(
        `Customer`,
        `id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        card VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        `
        )

    creteTable.createTableIfNotExists(
        `Products`,
        `id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
        name VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        stock VARCHAR(255) NOT NULL,
        active BOOLEAN NOT NULL,
        category VARCHAR(255) NOT NULL,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        `)
    
    creteTable.createTableIfNotExists(
        `Orders`,
        `id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
        customer_ID INT NOT NULL,
        product_ID INT NOT NULL,
        quantity VARCHAR(255) NOT NULL,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        FOREIGN KEY (customer_ID) REFERENCES Customer(id)
        FOREIGN KEY (product_ID) REFERENCES Products(id),
        `)
}