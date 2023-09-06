
//server
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, 'localhost', (err, res) => {
    console.log(`server is running on port ${port}`);
    
}); 