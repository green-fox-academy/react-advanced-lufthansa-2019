var express = require('express');
var router = express.Router();
var foodRepository = require('../data/foodRepository');

router.get('/', function (req, res, next) {
    foodRepository.findAll()
        .then(rows => {
            res.json(rows);
        });
});

router.post('/', function (req, res, next) {
    let food = req.body;

    if (!isValid(food)) {
        res.status(400).send();
        return;
    }

    foodRepository.save(food)
        .then(id => {
            res.status(200).json({ id });
        });
});

function isValid(food) {
    if (food == null) {
        return false;
    }

    if (food.foodName == null || food.foodName.length < 1) {
        return false;
    }

    if (food.calorieAmount == null || food.calorieAmount.length < 1) {
        return false;
    }

    return true;
}

module.exports = router;
