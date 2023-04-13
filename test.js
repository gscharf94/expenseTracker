const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

const indexRouter = require('./routes/indexRouter.js');
const uploadRouter = require('./routes/uploadRouter.js');
const depositRouter = require('./routes/depositRouter.js');

app.use(fileUpload());
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', `${process.cwd()}/views`);

app.use('/', indexRouter);
app.use('/upload', uploadRouter);
app.use('/deposit', depositRouter);

app.listen(port, () => {
	console.log(`listening on port: localhost:${port}`);
});