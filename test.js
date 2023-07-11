const express = require("express");
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

app.listen(port, "0.0.0.0", () => {
  console.log(`listening on port: http://10.0.0.234:${port}`);
});
