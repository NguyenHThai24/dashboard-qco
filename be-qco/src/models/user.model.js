import { poolPromise, sql } from "../db/sqlserver.js";

export const findUserBySignId = async (userSignId) => {
  const pool = await poolPromise;

  const result = await pool
    .request()
    .input("User_Sign_ID", sql.VarChar, userSignId).query(`
      SELECT 
        User_Sign_ID,
        User_Password
      FROM EIP.dbo.Data_User
      WHERE User_Sign_ID = @User_Sign_ID
    `);

  return result.recordset[0];
};
