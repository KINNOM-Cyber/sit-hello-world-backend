require("dotenv").config();

const http = require("http");
const express = require("express");

const app = express();

const router  = require("./routers");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router)
app.all("*", async (req, res) => {
    res.status(404).json({
        messsage: "Not Found!!"
    })
})

const port = process.env["PORT"];

http.createServer(app).listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
