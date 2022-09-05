const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config({ path: __dirname + '/.env' });
require('./config/db');

app.use(cors());
app.use(express.json());
const Router = require('./routes');
Router(app);

app.use(({ statusCode, apiStatus, data = {}, errorMessage }, req, res, next) => {
	console.log(apiStatus, statusCode, data, errorMessage);
	res.status(statusCode).json({
		apiStatus,
		data,
		meta: {
			message: errorMessage
		}
	});
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running at PORT: ${PORT}`);
});
