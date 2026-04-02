const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic route for the dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// SUBMIT REQUEST ENDPOINT (Telegram Notification)
app.post('/api/submit-request', async (req, res) => {
    const { name, phone, service, quantity, district, message } = req.body;

    // --- TELEGRAM SETUP ---
    // Get these from @BotFather and @userinfobot on Telegram
    const TELEGRAM_BOT_TOKEN = "8520592621:AAG7x18-nH1K4iNJ5mPN2avxRqQ4RfNK3vk"; 
    const TELEGRAM_CHAT_ID = "5011384582"; 
    
    // Construct Professional Telegram Message (Markdown formatted)
    const telegramMessage = `🚀 *New Quote Request - SD Fencing*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `🏗 *Service:* ${service || 'Not specified'}\n` +
        `📏 *Quantity:* ${quantity || 'Not specified'}\n` +
        `📍 *District:* ${district || 'Not specified'}\n\n` +
        `💬 *Details:* \n_${message || 'No extra details'}_\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━`;

    const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        // Send to Telegram using official API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramMessage,
                parse_mode: 'Markdown'
            })
        });
        
        if (response.ok) {
            console.log(`Success: Telegram notification sent to Admin ID ${TELEGRAM_CHAT_ID}`);
            res.status(200).json({ success: true, message: 'Request sent successfully' });
        } else {
            const errData = await response.json();
            console.error('Telegram API Error:', errData);
            // If user forgot to START the bot, it will give an error
            res.status(200).json({ 
                success: true, 
                warning: 'Form submitted, but notification failed. Did you click START on your bot?' 
            });
        }
    } catch (error) {
        console.error('Submission Error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
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
    console.log(`SD Fencing Site running at http://localhost:${PORT}`);
});
