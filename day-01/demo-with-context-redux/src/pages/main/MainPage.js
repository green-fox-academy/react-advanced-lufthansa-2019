import React from 'react';
import MainFoodForm from "./components/MainFoodForm";

import './MainPage.css'
import MainFoodTable from "./components/MainFoodTable";
import FoodFormController from "../../shared/forms/FoodFormController";

let FoodFormContainer = FoodFormController(MainFoodForm, 'Create');

function MainPage(props) {
    return (
        <div>
            <FoodFormContainer
                onSubmit={props.onFoodFormSubmit}
                i18n={props.i18n}
            />

            <h2>{props.i18n.t('MainPage.TodayCaloriesTitle')}</h2>
            <MainFoodTable foods={props.foodsForToday} i18n={props.i18n} />
        </div>
    );
}

export default MainPage;
