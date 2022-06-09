const db = require("./db_connection");

/**** Delete existing table, if any ****/

const drop_stuff_table_sql = "DROP TABLE IF EXISTS casino;"

db.execute(drop_stuff_table_sql);

const create_stuff_table_sql = `
    CREATE TABLE casino (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        game VARCHAR(45) NOT NULL,
        profit INT NOT NULL,
        date DATETIME NULL
    );
`
db.execute(create_stuff_table_sql);

const insert_stuff_table_sql = `
    INSERT INTO casino 
        (game, profit, date) 
    VALUES 
        (?, ?, ?);
`

let date = new Date()

function getDate() {
    let years = date.getFullYear()
    let months = date.getMonth()+1
    let day = date.getDate()
    return String(years)+'-'+months+'-'+day+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
}

db.execute(insert_stuff_table_sql, ['Poker', 2, getDate()]);
db.execute(insert_stuff_table_sql, ['Blackjack', 1200, getDate()]);
db.execute(insert_stuff_table_sql, ['Blackjack', -200, '2022-5-16 10:30:20']);

const read_stuff_table_sql = "SELECT * FROM casino";

db.execute(read_stuff_table_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'casino' initialized with:")
        console.log(results);
    }
);

db.end()