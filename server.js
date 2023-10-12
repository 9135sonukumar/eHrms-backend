const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./config/dbConnection");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
dbConnection();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/v1/admin", require("./routes/adminRoute"));

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
