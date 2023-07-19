const express = require("express");
const http = require("http");
let reload = require("reload");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const indexRouter = require("./routes/indexRouter.js");
const uploadRouter = require("./routes/uploadRouter.js");
const depositRouter = require("./routes/depositRouter.js");
const historyRouter = require("./routes/historyRouter.js");
const loginRouter = require("./routes/login.js");
const adminHistoryRouter = require("./routes/historyAdmin.js");

app.use(fileUpload());
app.use(express.static("public"));
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", `${process.cwd()}/views`);

app.use("/", loginRouter);
app.use("/upload", uploadRouter);
app.use("/deposit", depositRouter);
app.use("/history", historyRouter);
app.use("/historyAdmin", adminHistoryRouter);
app.use("/main", indexRouter);

<<<<<<< HEAD
app.listen(port, "0.0.0.0", () => {
  console.log(`listening on port: http://burrowreport.com`);
=======
let server = http.createServer(app);

reload(app).then(function (reloadReturned) {
  server.listen(port, "0.0.0.0", () => {
    console.log(`listening on port: http://10.0.0.234:${port}`);
  });
>>>>>>> 87333052dd390c1ff4401c1776939d5a6736ca46
});

// app.listen(port, "0.0.0.0", () => {
//   console.log(`listening on port: http://10.0.0.234:${port}`);
// });
