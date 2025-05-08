const express = require('express')
const path = require('path')
const NEWS_APY_KEY = '644ba7ab9aa24e9693c28b7b26ce2014'
const NEWS_APY_KEY2 = '65639c31c6d8401d8e25576a4c862dea'

const app = express()

app.get('/api/time', (req, res) => {
    const now = new Date()

    const weekday = now.toLocaleDateString('en-US', { weekday: 'short' })         // e.g. "Thu"
    const day = String(now.getDate()).padStart(2, '0')                             // e.g. "08"
    const month = now.toLocaleDateString('en-US', { month: 'short' })             // e.g. "May"
    const year = now.getFullYear()                                                // e.g. "2023"
    const time = now.toTimeString().split(' ')[0]                                 // e.g. "14:55:30"
  
    const formatted = `${weekday} ${day}. ${month} ${year} ${time}`
    res.send(formatted) 
})

app.get('/api/news', async (req, res) => {
    const category = req.query.category; // Lese die Kategorie aus dem Query-Parameter
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_APY_KEY2}`;

    if (category) { //falls eine Kategorie angegeben ist
        url += `&category=${category}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Fehler beim Abrufen der News:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Nachrichten' });
    }
});

app.use(express.static(path.join(__dirname, 'public'))) //__dirname: uebung3

app.listen(8000, () => {
    console.log('Server started...')
})


