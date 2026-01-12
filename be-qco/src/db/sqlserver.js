import sql from "mssql";

const config = {
  server: "192.168.30.19",
  user: "lacty",
  password: "lacty",
  database: "EIP",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("✅ Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("❌ Database connection failed", err);
  });

export { sql, poolPromise };
