import React from 'react';

export default function FoodTableController(Component) {
    return class extends React.Component {
        static displayName = `FoodTableController(${Component.name})`;
        state = {
            currentlyEditedFoodId: null
        };

        handleFoodEditClick = (food) => {
            this.setState({
                currentlyEditedFoodId: food.id
            });
        };

        handleFoodEditEnd = (food) => {
            this.setState({
                currentlyEditedFoodId: null
            });
        };

        render() {
            return <Component
                onFoodEditClick={this.handleFoodEditClick}
                onFoodEditEnd={this.handleFoodEditEnd}
                currentlyEditedFoodId={this.state.currentlyEditedFoodId}
                {...this.props}
            />;
        }
    };
};