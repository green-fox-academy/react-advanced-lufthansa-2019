var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function () {
    db.run(`
CREATE TABLE food (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  foodName varchar(300),
  calorieAmount varchar(100)
);
`);


    var statement = db.prepare('INSERT INTO food (foodName, calorieAmount) VALUES (?, ?)');

    statement.run('Chicken brest', '320');
    statement.run('Rice', '330');

    statement.finalize();
});

//db.close();


module.exports = db;
