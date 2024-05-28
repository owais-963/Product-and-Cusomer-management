require('dotenv').config();
var config = {
    server: process.env.DB_IP,
    port: 1433,
    trustServerCertificate: true,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER, 
            password: process.env.DB_PASSWORD,
            
        }
    },

    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'store',
        integratedSecurity: true,
        trustedConnection: true  
    }
};

module.exports = config;