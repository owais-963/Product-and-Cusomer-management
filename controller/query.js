const sql = require("mssql");
const config = require("../config");
const { json } = require("express");

exports.runQuery = async (query) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const result = await request.query(query);
    return {
      status: 200,
      message: "success",
      result: result
    };
  } catch (error) {
    if (error.code === 'ECONNCLOSED') {
      return {
        status: 503,
        message: "connection error",
        error: error
      };
    } else if (error.code === 'EREQUEST') {
      return {
        status: 400,
        message: "query error",
        error: error
      };
    } else {
      return {
        status: 500,
        message: "Internal Server Error",
        error: error
      };
    }
  }
};

exports.test = async (data) => {
  return{
    status: 200,
    data: data
  }
}