import React, {Component} from 'react';
import { connect } from 'react-redux';
import FoodService from "../../../services/FoodService";
import I18nContext from "../../../context/I18nContext";
import {addFood} from "../Actions";

export default function MainPageController(MainPage) {
    class WrappedComponent extends Component {
        static displayName = `MainPageController(${MainPage.name})`;
        //static contextType = I18nContext;

        // state = {
        //     foodsForToday: []
        // };

        componentDidMount() {

            // FoodService.get()
            //     .then(foods => this.setState({
            //         foodsForToday: foods
            //     }));
        }

        handleFoodFormSubmit = (formFieldValues) => {
            //this.props.dispatch(addFood(formFieldValues));
            this.props.addFood(formFieldValues);

            // this.setState(state => {
            //     return {
            //         foodsForToday: [...state.foodsForToday, formFieldValues]
            //     };
            // });
        };

        render() {
            return <MainPage
                onFoodFormSubmit={this.handleFoodFormSubmit}
                foodsForToday={this.props.foods}
                {...this.props}
            />;
        }
    }


    function mapStateToProps(state) {
        return {
            foods: state.main.foods
        };
    }

    let mapDispatchToProps = {
        addFood
    };

    return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
