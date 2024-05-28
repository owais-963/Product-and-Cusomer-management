const sql = require("mssql");
const config = require("../config");
const { json } = require("express");

exports.runQuery = async (query) => {
  try {
    sql.connect(config, function (error) {
      if (error) {
        return {
          status: 503,
          message: "connection error",
          error: err
        }
      } else {
        var requ = new sql.Request();
        requ.query( query,
          function (err, result) {
            if (err) {
              return {
                status: 400,
                message: "query error",
                error: err
              }
            }
            else {
              return{
                status: 200,
                message: "sucess",
                result: result
              }
            }
          });
        sql.close();
      }
    });
  } catch (error) {
    return {
      status: 500,
      message:"Internal Server Error",
      error: error
}
  }
}
