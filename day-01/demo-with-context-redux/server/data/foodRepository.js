let db = require('./sqlite');

function findAll() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM food', (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(rows);
        });
    });
}

function save(food) {
    return new Promise((resolve, reject) => {
        try {
            let query = db.prepare("INSERT INTO food (foodName, calorieAmount) VALUES (?,?)");

            query.run(food.foodName, food.calorieAmount, function(err) {
                if (err) {
                    reject(err);
                }
            });

            query.finalize(function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                
                resolve(this.lastID);
            });
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    findAll,
    save
};
