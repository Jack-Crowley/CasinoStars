const e = require("express");
const express = require( "express" );
const app = express();

const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
const logger = require("morgan");
const db = require('./db/db_connection');

app.use(logger("dev"));

app.use( express.urlencoded({ extended: false }) );
app.set( "views", path.join((__dirname + "/Views")));
app.set( "view engine", "ejs" );
app.use(express.static(path.join(__dirname+'/Public')))

const read_stuff_all_sql = `
    SELECT 
        id, game, profit
    FROM
        casino
`

const get_total_profit_sql = `
    SELECT
        game, profit, date
    FROM
        casino
    ORDER BY date
    DESC
`

// define a route for item Create
const create_item_sql = `
    INSERT INTO casino
        (game, profit, date)
    VALUES
        (?, ?, ?)
`


app.get( "/stuff", ( req, res ) => {
    db.execute(read_stuff_all_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else
            res.send(results);
    });
});

// define a route for the default home page
app.get( "/", ( req, res ) => {
    db.execute(get_total_profit_sql, (error, results) => {
        if (error)
            res.status(500).send(error + ' Issue connecting with database'); //Internal Server Error
        else {
            let data = results; // results is still an array
            // data's object structure: 
            //  { item: ___ , quantity:___ , description: ____ }
            res.render('dashboard', { inventory : results });
        }
    });
} );

app.get('/testserver', (req,res) => {
    res.sendFile(__dirname+'/views/test.html');
})

// define a route for the stuff inventory page
app.get( "/games", ( req, res ) => {
    db.execute(get_total_profit_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = results; // results is still an array
            // data's object structure: 
            //  { item: ___ , quantity:___ , description: ____ }
            res.render('games', { inventory : results });
        }
    });
} );

app.get( "/admin", ( req, res ) => {
    db.execute(get_total_profit_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = results; // results is still an array
            // data's object structure: 
            //  { item: ___ , quantity:___ , description: ____ }
            res.render('admin', { inventory : results });
        }
    });
} );

// define a route for the item detail page
app.get( "/stat", ( req, res ) => {
    db.execute(get_total_profit_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = results; // results is still an array
            // data's object structure: 
            //  { item: ___ , quantity:___ , description: ____ }
            res.render('stat', { inventory : results });
        }
    });
} );

// define a route for the item detail page
app.get( "/history", ( req, res ) => {
    db.execute(get_total_profit_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = results; // results is still an array
            // data's object structure: 
            //  { item: ___ , quantity:___ , description: ____ }
            res.render('history', { inventory : results});
        }
    });
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );

app.get('/blackjack', (req, res) => {
    db.execute(get_total_profit_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = results; // results is still an array
            // data's object structure: 
            //  { item: ___ , quantity:___ , description: ____ }
            res.render('blackjack', { inventory : results, players : req.body.numOfComputers });
        }
    });
})

app.get('/poker', (req, res) => {
    console.log(req.body.numOfComputers)
    db.execute(get_total_profit_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = results; // results is still an array
            // data's object structure: 
            //  { item: ___ , quantity:___ , description: ____ }
            res.render('poker', { inventory : results, players : req.body.numOfComputers });
        }
    });
})

app.get('/roulette', (req, res) => {
    res.render('roulette')
})

app.get('/slots', (req, res) => {
    res.render('slots')
})

app.get('/baccarat', (req, res) => {
    res.render('baccarat')
})

app.post('/', ( req, res ) => {
    db.execute(get_total_profit_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            if (req.body.game == 'bj') {
                res.render('blackjack', { inventory : results,  players : req.body.numOfComputers});
            }
            else if (req.body.game == 'Poker') {
                res.render('poker', { inventory : results,  players : req.body.numOfComputers});
            }
            else if (req.body.game == 'Baccarat') {
                res.render('baccarat', { inventory : results,  players : req.body.numOfComputers});
            }
            else if (req.body.game == 'Slots') {
                res.render('slots', { inventory : results});
            }
            else if (req.body.game == 'Roulette') {
                res.render('roulette', { inventory : results});
            }
        }
    });
})

app.post("/addgame", ( req, res ) => {

    db.execute(create_item_sql, [req.body.game, req.body.amount, req.body.date], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect('/')
        }
    });
})

app.post("/blackjack", ( req, res ) => {
    function getDate() {
        let years = date.getFullYear()
        let months = date.getMonth()+1
        let day = date.getDate()
        return String(years)+'-'+months+'-'+day+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    }
    let date = new Date()

    db.execute(create_item_sql, ['BlackJack', req.body.amount, getDate()], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            if (req.body.mode == 'PLAY') {
                db.execute(get_total_profit_sql, (error, results) => {
                    if (error)
                        res.status(500).send(error); //Internal Server Error
                    else {
                        let data = results; // results is still an array
                        // data's object structure: 
                        //  { item: ___ , quantity:___ , description: ____ }
                        console.log(req.body.numOfComputers)
                        res.render('blackjack', { inventory : results,  players : req.body.numOfComputers});
                    }
                });
            }
            else {
                res.redirect('/')
            }
        }
    });
})

app.post("/baccarat", ( req, res ) => {
    function getDate() {
        let years = date.getFullYear()
        let months = date.getMonth()+1
        let day = date.getDate()
        return String(years)+'-'+months+'-'+day+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    }
    let date = new Date()

    db.execute(create_item_sql, ['Baccarat', req.body.amount, getDate()], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            if (req.body.mode == 'PLAY') {
                db.execute(get_total_profit_sql, (error, results) => {
                    if (error)
                        res.status(500).send(error); //Internal Server Error
                    else {
                        let data = results; // results is still an array
                        // data's object structure: 
                        //  { item: ___ , quantity:___ , description: ____ }
                        console.log(req.body.numOfComputers)
                        res.render('baccarat', { inventory : results,  players : req.body.numOfComputers});
                    }
                });
            }
            else {
                res.redirect('/')
            }
        }
    });
})


app.post("/roulette", ( req, res ) => {
    function getDate() {
        let years = date.getFullYear()
        let months = date.getMonth()+1
        let day = date.getDate()
        return String(years)+'-'+months+'-'+day+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    }
    let date = new Date()

    db.execute(create_item_sql, ['Roulette', req.body.amount, getDate()], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            if (req.body.mode == 'PLAY') {
                db.execute(get_total_profit_sql, (error, results) => {
                    if (error)
                        res.status(500).send(error); //Internal Server Error
                    else {
                        let data = results; // results is still an array
                        // data's object structure: 
                        //  { item: ___ , quantity:___ , description: ____ }
                        console.log(req.body.numOfComputers)
                        res.render('blackjack', { inventory : results,  players : req.body.numOfComputers});
                    }
                });
            }
            else {
                res.redirect('/')
            }
        }
    });
})

app.post("/slots", ( req, res ) => {
    function getDate() {
        let years = date.getFullYear()
        let months = date.getMonth()+1
        let day = date.getDate()
        return String(years)+'-'+months+'-'+day+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    }
    let date = new Date()

    db.execute(create_item_sql, ['Slots', req.body.amount, getDate()], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            if (req.body.mode == 'PLAY') {
                db.execute(get_total_profit_sql, (error, results) => {
                    if (error)
                        res.status(500).send(error); //Internal Server Error
                    else {
                        let data = results; // results is still an array
                        // data's object structure: 
                        //  { item: ___ , quantity:___ , description: ____ }
                        console.log(req.body.numOfComputers)
                        res.render('blackjack', { inventory : results,  players : req.body.numOfComputers});
                    }
                });
            }
            else {
                res.redirect('/')
            }
        }
    });
})

app.post("/poker", ( req, res ) => {
    function getDate() {
        let years = date.getFullYear()
        let months = date.getMonth()+1
        let day = date.getDate()
        return String(years)+'-'+months+'-'+day+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    }
    let date = new Date()
    console.log(req.body.amount)
    db.execute(create_item_sql, ['Poker', Number(req.body.amount), getDate()], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            if (req.body.mode == 'PLAY') {
                db.execute(get_total_profit_sql, (error, results) => {
                    if (error)
                        res.status(500).send(error); //Internal Server Error
                    else {
                        let data = results; // results is still an array
                        // data's object structure: 
                        //  { item: ___ , quantity:___ , description: ____ }
                        console.log(req.body.numOfComputers)
                        res.render('poker', { inventory : results,  players : req.body.numOfComputers});
                    }
                });
            }
            else {
                res.redirect('/')
            }
        }
    });
})

app.post("/admin", ( req, res ) => {
    function getDate() {
        let years = date.getFullYear()
        let months = date.getMonth()+1
        let day = date.getDate()
        return String(years)+'-'+months+'-'+day+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    }
    let date = new Date()
    db.execute(create_item_sql, ['Admin Given', Number(req.body.amount), getDate()], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect('/admin')
        }
    });
})