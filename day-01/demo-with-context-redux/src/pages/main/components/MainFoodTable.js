import React from 'react';
import FoodTable from "../../../shared/FoodTable";

function MainFoodTable(props) {
    return (
        <div>
            <FoodTable {...props} />
        </div>
    );
}

export default MainFoodTable;