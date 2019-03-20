import React from 'react';
import FoodForm from "../../../shared/forms/FoodForm";
import I18nContext from '../../../context/I18nContext';

function MainFoodForm(props) {
    return (
        <I18nContext.Consumer>
            {({i18n}) =>
                <div className="main-food-form card">
                    <div className="card-header">{i18n.t('MainFoodForm.AddFood')}</div>
                    <div className="card-body">
                        <FoodForm {...props} />
                    </div>
                </div>
            }
        </I18nContext.Consumer>
    );
}

export default MainFoodForm;
