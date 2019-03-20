import {ADD_FOOD} from "./ActionTypes";

export function addFood(food) {
    return {
        type: ADD_FOOD,
        payload: food
    };
}
