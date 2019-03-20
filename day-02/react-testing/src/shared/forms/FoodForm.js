import React, { useContext } from 'react'
import InputField from "./fields/InputField";
import Button from "./fields/Button";
import I18nContext from "../../context/I18nContext";

export default function FoodForm(props) {
    //let { i18n } = useContext(I18nContext);
    let i18n = { t: () => 'Text' };

    return (
        <form onSubmit={handleSubmit}>
            <InputField
                labelText={i18n.t('FoodForm.Food')}
                id="foodName"
                value={props.values.foodName}
                error={props.errors.foodName}
                onChange={props.onFieldChange}
                onBlur={props.onFieldBlur}
            />

            <InputField
                labelText={i18n.t('FoodForm.Calories')}
                type="number"
                id="calorieAmount"
                value={props.values.calorieAmount}
                error={props.errors.calorieAmount}
                onChange={props.onFieldChange}
                onBlur={props.onFieldBlur}
            />

            <Button type="submit">{i18n.t('FoodForm.Add')}</Button>
        </form>
    );

    function handleSubmit(event) {
        event.preventDefault();
        props.onSubmit();
    }
}
