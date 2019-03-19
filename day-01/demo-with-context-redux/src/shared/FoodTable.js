import React, { useContext } from 'react';
import FoodTableController from "./FoodTableController";
import FoodFormController from "./forms/FoodFormController";
import I18nContext from "../context/I18nContext";

function FoodTable(props) {
    let i18n = useContext(I18nContext);

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <td colSpan="3">{i18n.t('FoodTable.Sum', {Sum: sumOfCalories(props.foods)})}</td>
                </tr>
                <tr>
                    <th>{i18n.t('FoodTable.Food')}</th>
                    <th>{i18n.t('FoodTable.Calories')}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {props.foods.map(food => props.currentlyEditedFoodId === food.id
                    ? <EditFoodLineContainer key={food.id} initialValue={food} onCancel={props.onFoodEditEnd}  onSubmit={props.onFoodEditEnd} />
                    : <FoodLine key={food.id} food={food}
                                onFoodEditClick={props.onFoodEditClick}/>)}
                {props.foods.length === 0 && <EmptyState />}
                </tbody>
            </table>
        </div>
    );

}

function EmptyState(props) {
    let i18n = useContext(I18nContext);

    return <tr className="text-center">
        <td colSpan="2">
            {i18n.t('FoodTable.NoFood')}
        </td>
    </tr>;
}

function sumOfCalories(foods) {
    if (!foods || foods.length === 0) {
        return 0;
    }

    return foods
        .map(f => f.calorieAmount)
        .sum();
}

function FoodLine(props) {
    return <tr>
        <td>{props.food.foodName}</td>
        <td>{props.food.calorieAmount}</td>
        <td>
            <button type="button" className="btn btn-primary" onClick={() => props.onFoodEditClick(props.food)}>Edit</button>
        </td>
    </tr>;
}

let EditFoodLineContainer = FoodFormController(EditFoodLine, 'Edit');

function EditFoodLine(props) {
    return <tr>
        <td><input type="text"
                   value={props.values.foodName}
                   name="foodName"
                   onChange={handleChange}
                   onBlur={handleBlur}
                   className="form-control"
        />
            <span className="text-danger">{props.errors.foodName}</span>
        </td>
        <td><input type="number"
                   value={props.values.calorieAmount}
                   name="calorieAmount"
                   onChange={handleChange}
                   onBlur={handleBlur}
                   className="form-control"
        />
            <span className="text-danger">{props.errors.calorieAmount}</span>
        </td>
        <td>
            <button type="submit" className="btn btn-primary" onClick={() => props.onSaveFoodEditClick(props.food)}>Save</button>
            <button type="button" className="btn btn-danger" onClick={props.onCancel}>Cancel</button>
        </td>
    </tr>;


    function handleChange(event) {
        props.onFieldChange({
            name: event.target.name,
            value: event.target.value
        });
    }

    function handleBlur(event) {
        props.onFieldBlur({
            name: event.target.name,
            value: event.target.value
        });
    }
}

export default FoodTableController(FoodTable);