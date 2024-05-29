const sql = require("mssql");
const config = require("../config");

exports.createTableIfNotExists = async (tableName,fields) => {
  try {
    sql.connect(config, function (error) {
      if (error) {
        return console.log("Something went wrong"+ error);
      } else {
        var requ = new sql.Request();
        requ.query(
          `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tableName}'`,
          // '
          function (er, result) {
            if (er) {
              console.log("sql error", er);
              return "Error";

            } else {

                if (!((result.recordsets[0]).length > 0)){
                  requ.query(
                    `
                        CREATE TABLE ${tableName} (
                        ${fields}
                    )
                    `,
                    function (er, result) {
                      if (er) {
                        console.log("Table" ,tableName ,"can not be created due to error.");
                        console.log(er);
                      } else {
                        console.log(`Table ${tableName} created successfully.`);
                        
                      }
                    }
                  );
                } else {
                  console.log(`Table ${tableName} already exists.`);
                }
            }
          }
        );
      }
    });    
  } catch (error) {
    throw error;
  }
}
