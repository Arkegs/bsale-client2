// Only use .env if not in production environment
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

// Require packages
const express = require('express');
const cors = require('cors');
const path = require('path');

// Express app setup
const port = process.env.PORT || 3000;
const app = express();

const corsOptions = {
    origin: process.env.SERVER_URL,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.set('views', path.join(__dirname, 'public/views'));
app.use(express.static(path.join(__dirname, 'public')));

// Client app routes
app.get('/products/:productId', (req, res) => {
    res.sendFile(path.join(app.get('views'), 'product.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(app.get('views'), 'index.html'));
});

app.get('/', (req, res) => {
    res.redirect('/products');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(app.get('views'), 'error.html'));
})

// Initialize server
app.listen(port, () => {
    console.log(`Serving client on port ${port}!`);
});