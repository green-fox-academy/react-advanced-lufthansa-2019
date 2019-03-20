import {ADD_FOOD} from "./ActionTypes";

export default function (state, action) {
    if (state == null) {
        return {
            foods: []
        }
    }

    if (action.type === ADD_FOOD) {
        let food = action.payload;

        return {
            foods: [ ...state.foods, food ]
        }
    }
};
