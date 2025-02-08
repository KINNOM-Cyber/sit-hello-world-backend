import express from "express"
import cors from "cors"
import connection from "./config/database.js";

import bookingRouter from "./routes/bookingRoutes.js";
import userRouter from "./routes/userRoutes.js";
import roomRouter from "./routes/roomRoutes.js";

// const middleware = require("./middleware");
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Assign routes to express router
app.use("/booking", bookingRouter);
app.use("/user", userRouter);
app.use("/room", roomRouter);

app.all("*", async (req, res) => {
  res.status(404).json({
    messsage: "Not Found!!",
  });
});

const port = 3000;

connection.connect((err)=> {
  if(err) {
      console.log(err);
  } else {
      console.log("Database is connected");
  }
})

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
})