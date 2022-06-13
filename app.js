const express = require( "express" );
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
const logger = require("morgan");
const db = require('./db/db_connection');

app.use(logger("dev"));
app.use(express.static(__dirname+'/public'))
app.use( express.urlencoded({ extended: false }) );
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

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
    res.render('test')
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
    if (req.body.game == 'bj') {
        console.log(req.body.numOfComputers)
        db.execute(get_total_profit_sql, (error, results) => {
            if (error)
                res.status(500).send(error); //Internal Server Error
            else {
                let data = results; // results is still an array
                // data's object structure: 
                //  { item: ___ , quantity:___ , description: ____ }
                res.render('blackjack', { inventory : results,  players : req.body.numOfComputers});
            }
        });
    }
    else if (req.body.game == 'Poker') {
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