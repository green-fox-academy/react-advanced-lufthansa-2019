import React, { useContext } from 'react';
import MainFoodForm from "./components/MainFoodForm";

import './MainPage.css'
import MainFoodTable from "./components/MainFoodTable";
import FoodFormController from "../../shared/forms/FoodFormController";
import I18nContext from "../../context/I18nContext";

let FoodFormContainer = FoodFormController(MainFoodForm, 'Create');

function MainPage(props) {
    let { i18n } = useContext(I18nContext);

    return (
        <div>
            <FoodFormContainer
                onSubmit={props.onFoodFormSubmit}
            />

            <h2>{i18n.t('MainPage.TodayCaloriesTitle')}</h2>
            <MainFoodTable foods={props.foodsForToday} />
        </div>
    );
}

export default MainPage;
