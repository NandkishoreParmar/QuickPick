const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5100;

app.use(bodyParser.json());

let items = [
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Bread' },
    { id: 3, name: 'Eggs' },
];

app.get('/items', (req, res) => {
    res.json({ success: true, data: items });
});

app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(i => i.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found!' });
    }
    res.json({ success: true, data: item });
});

app.post('/items', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: 'Item name is required!' });
    }
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.json({ success: true, message: 'Item added successfully!', data: newItem });
});

app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const item = items.find(i => i.id === parseInt(id));

    if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found!' });
    }

    if (!name) {
        return res.status(400).json({ success: false, message: 'Item name is required for update!' });
    }

    item.name = name;
    res.json({ success: true, message: 'Item updated successfully!', data: item });
});

app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(i => i.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Item not found!' });
    }

    items.splice(index, 1);
    res.json({ success: true, message: 'Item deleted successfully!', data: items });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
