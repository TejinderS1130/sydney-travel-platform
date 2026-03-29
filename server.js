const session = require('express-session');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: true
}));

// GLOBAL USER (BEST PRACTICE)
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// view engine
app.set('view engine', 'ejs');

// HOME
app.get('/', (req, res) => {
    res.render('home');
});

// LOGIN PAGE
app.get('/login', (req, res) => {
    res.render('login');
});

// LOGIN LOGIC
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        req.session.user = username;
        res.redirect('/dashboard');
    } else {
        res.send("Invalid login");
    }
});

// DASHBOARD
app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('dashboard', {
        user: req.session.user,
        history: req.session.searchHistory || [],
        results: req.session.lastResults || null   // 🔥 REQUIRED
    });
});


// SEARCH FLIGHT
app.post('/search-flight', (req, res) => {
    const { from, to, date } = req.body;

    // save history
    if (!req.session.searchHistory) {
        req.session.searchHistory = [];
    }

    req.session.searchHistory.push({ from, to, date });

    // FAKE FLIGHT DATA 
    const mockFlights = [
        {
            airline: "Air Canada",
            depart: "08:00",
            arrive: "20:30",
            duration: "12h 30m",
            price: "$820"
        },
        {
            airline: "Qantas",
            depart: "10:00",
            arrive: "22:00",
            duration: "12h",
            price: "$950"
        },
        {
            airline: "United Airlines",
            depart: "06:30",
            arrive: "19:45",
            duration: "13h 15m",
            price: "$780"
        }
    ];

    // save results
    req.session.lastResults = {
        from,
        to,
        date,
        flights: mockFlights
    };

    // IMPORTANT: direct to dashboard not to google
    res.redirect('/dashboard');
});

// LOGOUT
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// SERVER
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});