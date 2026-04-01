const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic route for the dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Mock API for inventory
app.get('/api/inventory', (req, res) => {
    res.json([
        { id: 1, name: 'Chain Link Fence', type: 'Fencing', stock: 120, price: '₹450/m', status: 'In Stock', image: 'chainlink.jpg' },
        { id: 2, name: 'Barbed Wire', type: 'Fencing', stock: 85, price: '₹320/m', status: 'Low Stock', image: 'barbedwire.jpg' },
        { id: 3, name: 'Slab Wall Fencing', type: 'Fencing', stock: 45, price: '₹680/m', status: 'Out of Stock', image: 'slab_mathil.jpeg' },
        { id: 4, name: 'Fence Post (Iron)', type: 'Accessories', stock: 300, price: '₹1200/pc', status: 'In Stock', image: 'fencepost.jpg' },
    ]);
});

app.listen(PORT, () => {
    console.log(`BestFence Dashboard running at http://localhost:${PORT}`);
});
