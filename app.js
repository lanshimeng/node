const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use();


// Routes
app.get('/',async (req, res) => {
    try {
        let p = await fetch("https://example.com/");
        let text = await p.text();
        res.send(text);
    } catch (error) {
        res.json({message:'服务器出错'});
    }
});

app.get('/api/items', (req, res) => {
    res.json({ items: ['item1', 'item2'] });
});

app.get('/hello',(req,res)=>{
    res.json({message:'hello client'});
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});