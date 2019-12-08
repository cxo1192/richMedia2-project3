const handleMakeMeal = (e) => { 
    e.preventDefault();

    $("#ronMessage").animate({width:'hide'},350);

    if($("#mealName").val() == '' || $("#mealCalories").val() == '' || $("#mealProtien").val() == '' || $("#mealCarbs").val() == '' || $("#mealFat").val() == '' || $("#mealSodium").val() == '' || $("#mealCholesterol").val() == '') { //change
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#mealForm").attr("action"), $("#mealForm").serialize(), function() {
        loadMealsFromServer();
    });

    return false;
};


//handleRemoveMeal
const handleRemoveMeal = (e) => { 
    e.preventDefault();

    $("#ronMessage").animate({width:'hide'},350);

    if($("#mealName").val() == '') { 
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#removeMealForm").attr("action"), $("#removeMealForm").serialize(), function() {
        loadMealsFromServer();
    });

    return false;
};


const MealForm = (props) => { 
    return(
        <form id="mealForm"
            onSubmit={handleMakeMeal}
            name="mealForm"
            action="/maker"
            method="POST"
            className="mealForm"
        >
            <label for="name">Name: </label>
            <input id="mealName" type="text" name="name" placeholder="Meal Name"/>
            <label for="calories">Calories: </label>
            <input id="mealCalories" type="text" name="calories" placeholder="Meal Calories"/> 
            <label for="protien">Protien: </label>
            <input id="mealProtien" type="text" name="protien" placeholder="Meal Protien"/> 
            <label for="carbs">Carbs: </label>
            <input id="mealCarbs" type="text" name="carbs" placeholder="Meal Carbs"/> 
            <label for="fat">Fat: </label>
            <input id="mealfat" type="text" name="fat" placeholder="Meal Fat"/> 
            <label for="sodium">Sodium: </label>
            <input id="mealSodium" type="text" name="sodium" placeholder="Meal Sodium"/> 
            <label for="Cholesterol">Chol: </label>
            <input id="mealCholesterol" type="text" name="cholesterol" placeholder="Meal Cholesterol"/> 
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeMealSubmit" type="submit" value="Make Meal" />
        </form>
    );
};


const RemoveMealForm = (props) => {
    return(
        <form id="removeMealForm"
            onSubmit={handleRemoveMeal}
            name="removeMealForm"
            action="/deleter"
            method="POST"
            className="removeMealForm"
        >
            <label id="removeMealNameLabel" for="removeName">Meal Name To Remove: </label>
            <input id="removeMealName" type="text" name="removeName" placeholder="Meal Name"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};


//add daily value stuff


const MealList = function(props) { 
    if(props.meals.length === 0){ 
        return(
            <div className="mealList">
                <h3 className="emptyMeal">No Meals yet</h3>
            </div>
        );
    }

    const mealNodes = props.meals.map(function(meal){
        return(
            <div key={meal._id} className="meal">
                <img src="/assets/img/mealSketch.png" alt="meal img" className="mealImg" />
                <h3 className="mealName"> Name: {meal.name} </h3>
                <h3 className="calories"> Calories: {meal.calories} </h3>
                <h3 className="protien"> Protien: {meal.protien} </h3>
                <h3 className="carbs"> Carbs: {meal.carbs} </h3>
                <h3 className="fat"> Fat: {meal.fat} </h3>
                <h3 className="sodium"> Sodium: {meal.sodium} </h3>
                <h3 className="cholesterol"> Cholesterol: {meal.cholesterol} </h3>
            </div>
        );
    });


    return(
        <div className="mealList">
            {mealNodes}
        </div>
    );
};

const loadMealsFromServer = () => {
    sendAjax('GET', '/getMeals', null, (data) => {
        ReactDOM.render(
            <MealList meals={data.meals} />, document.querySelector("#meals")
        );
    });
};

const setup = function(csrf){
    ReactDOM.render(
        <MealForm csrf={csrf} />, document.querySelector("#makeMeal")
    );

    ReactDOM.render(
        <MealList meals={[]} />, document.querySelector("#meals")
    );

    loadMealsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});