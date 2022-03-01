require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./src/routes/stripe.routes');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
