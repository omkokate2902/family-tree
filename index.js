const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Testing branch works fine. demo');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {  // Listen on all interfaces
    console.log(`Server is running on port ${PORT}`);
});