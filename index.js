const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to UnifiedAuth');
});

app.listen(port, () => {
    console.log(`UnifiedAuth is running at http://localhost:${port}`);
});
