//evaluates entered data and then sends a make meal request
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


//checks data entered and then makes a remove meal request
const handleRemoveMeal = (e) => { 
    e.preventDefault();

    $("#ronMessage").animate({width:'hide'},350);

    if($("#removeMealName").val() == '') { 
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#removeMealForm").attr("action"), $("#removeMealForm").serialize(), function() {
        loadMealsFromServer();
    });

    return false;
};

//react component to make a meal
const MealForm = (props) => { 
    return(
        <form id="mealForm"
            onSubmit={handleMakeMeal}
            name="mealForm"
            action="/maker"
            method="POST"
            className="mealForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="mealName" type="text" name="name" placeholder="Meal Name"/>
            <label htmlFor="calories">Calories: </label>
            <input id="mealCalories" type="text" name="calories" placeholder="Meal Calories"/> 
            <label htmlFor="protien">Protien: </label>
            <input id="mealProtien" type="text" name="protien" placeholder="Meal Protien"/> 
            <label htmlFor="carbs">Carbs: </label>
            <input id="mealCarbs" type="text" name="carbs" placeholder="Meal Carbs"/> 
            <label htmlFor="fat">Fat: </label>
            <input id="mealfat" type="text" name="fat" placeholder="Meal Fat"/> 
            <label htmlFor="sodium">Sodium: </label>
            <input id="mealSodium" type="text" name="sodium" placeholder="Meal Sodium"/> 
            <label htmlFor="Cholesterol">Chol: </label>
            <input id="mealCholesterol" type="text" name="cholesterol" placeholder="Meal Cholesterol"/> 
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeMealSubmit" type="submit" value="Make Meal" />
        </form>
    );
};

//react component to remove a meal
const RemoveMealForm = (props) => {
    return(
        <form id="removeMealForm"
            onSubmit={handleRemoveMeal}
            name="removeMealForm"
            action="/deleter"
            method="POST"
            className="removeMealForm"
        >
            <label id="removeMealNameLabel" htmlFor="removeName">Meal Name To Remove: </label>
            <input id="removeMealName" type="text" name="removeName" placeholder="Meal Name"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeMealSubmit" type="submit" value="Remove" />
        </form>
    );
};


//react component to display all meals and user total nuitriution facts 
const MealList = function(props) { 
    if(props.meals.length === 0){ //if no meals
        return(
            <div className="mealList">
                <h3 className="emptyMeal">No Meals yet</h3>
            </div>
        );
    }

    //parse each meal
    const mealNodes = props.meals.map(function(meal){
        return(
            <div key={meal._id} className="meal">
                <img src="/assets/img/mealSketch.png" alt="meal img" className="mealImg" />
                <div id='mealFacts'>
                    <h3 className="mealName"> Name: {meal.name} </h3>
                    <h3 className="calories"> Calories: {meal.calories} </h3>
                    <h3 className="protien"> Protein: {meal.protien} </h3>
                    <h3 className="carbs"> Carbs: {meal.carbs} </h3>
                    <h3 className="fat"> Fat: {meal.fat} </h3>
                    <h3 className="sodium"> Sodium: {meal.sodium} </h3>
                    <h3 className="cholesterol"> Cholesterol: {meal.cholesterol} </h3>
                </div>
            </div>
        );
    });


    //calculates total cal intake for day
    let totalCal = 0;
    props.meals.map(function(meal){
        totalCal += meal.calories;
    });
    
    //displays weather the user is over under or on target for calorie intake
    if(totalCal < 2000 || totalCal > 3200){
        if(totalCal < 1600){
            document.getElementById('fC').style.color = 'blue';
            document.getElementById('mC').style.color = 'blue';
        }else if(totalCal < 1800){
            document.getElementById('mC').style.color = 'blue';
            document.getElementById('fC').style.color = 'black';
        }else if(totalCal > 1800){
            document.getElementById('fC').style.color = 'red';
            if(totalCal > 3200){
                document.getElementById('mC').style.color = 'red';
            }
            else if(totalCal < 2000){
                document.getElementById('mC').style.color = 'blue';
            }
        }
    }else{
        document.getElementById('mC').style.color = 'black';
        document.getElementById('fC').style.color = 'red';
    }


    //calc total protien intake
    let totalPro = 0;
    props.meals.map(function(meal){
        totalPro += meal.protien;
    });

    //displays weather the user is over under or on target for protien intake
    if(totalPro < 52 || totalPro > 56){
        if(totalPro > 46 && totalPro < 52){
            document.getElementById('mP').style.color = 'blue'; //blue = under taget
            document.getElementById('fP').style.color = 'black'; //blak = on target
        }else if(totalPro > 56){
            document.getElementById('fP').style.color = 'red'; //red = over target
            document.getElementById('mP').style.color = 'red';
        }else if(totalPro < 46){
            document.getElementById('fP').style.color = 'blue';
            document.getElementById('mP').style.color = 'blue';
        }
    }else{
        document.getElementById('fP').style.color = 'black';
        document.getElementById('mP').style.color = 'black';
    }

    //calc total carb intake
    let totalCar = 0;
    props.meals.map(function(meal){
        totalCar += meal.carbs;
    });

    //displays weather the user is over under or on target for carb intake
    if(totalCar < 130){
        document.getElementById('fCa').style.color = 'blue';
        document.getElementById('mCa').style.color = 'blue';
    }else if(totalCar > 130){
        document.getElementById('fCa').style.color = 'red';
        document.getElementById('mCa').style.color = 'red';
    }else{
        document.getElementById('fCa').style.color = 'black';
        document.getElementById('mCa').style.color = 'black';
    }

    //calc total fat intake
    let totalFat = 0;
    props.meals.map(function(meal){
        totalFat += meal.fat;
    });

    //displays weather the user is over under or on target for fat intake
    if(totalFat < 20){
        document.getElementById('fF').style.color = 'blue';
        document.getElementById('mF').style.color = 'blue';
    }else if(totalFat > 35){
        document.getElementById('fF').style.color = 'red';
        document.getElementById('mF').style.color = 'red';
    }else{
        document.getElementById('fF').style.color = 'black';
        document.getElementById('mF').style.color = 'black';
    }

    //calc total sodium intake
    let totalSo = 0;
    props.meals.map(function(meal){
        totalSo += meal.sodium;
    });

    //displays weather the user is over under or on target for sodium intake
    if(totalSo < 2300){
        document.getElementById('fS').style.color = 'blue';
        document.getElementById('mS').style.color = 'blue';
    }else if(totalSo > 2300){
        document.getElementById('fS').style.color = 'red';
        document.getElementById('mS').style.color = 'red';
    }else{
        document.getElementById('fS').style.color = 'black';
        document.getElementById('mS').style.color = 'black';
    }

    //calc total cholesterol intake
    let totalCho = 0;
    props.meals.map(function(meal){
        totalCho += meal.cholesterol;
    });

    //displays weather the user is over under or on target for cholesterol intake
    if(totalCho < 200){
        document.getElementById('fCh').style.color = 'black';
        document.getElementById('mCh').style.color = 'black';
    }else{
        document.getElementById('fCh').style.color = 'red';
        document.getElementById('mCh').style.color = 'red';
    }
    
    //display nutrition totals and all meals after parsing
    return(
        <div className="mealList">
            <div className="total">
                Your Totals 
                <p id='tCl'>Calories: {totalCal}</p> 
                <p id='tP'>Protein: {totalPro}</p> 
                <p id='tCb'>Carbs: {totalCar}</p>
                <p id='tF'>Fat: {totalFat}</p>
                <p id='tS'>Sodium: {totalSo}</p>
                <p id='tCh'>Cholesterol: {totalCho}</p>
            </div>
            {mealNodes}
        </div>
    );
};

//loads meals
const loadMealsFromServer = () => { 
    sendAjax('GET', '/getMeals', null, (data) => {
        ReactDOM.render(
            <MealList meals={data.meals} />, document.querySelector("#mealsBox")
        );
    });
};

//sets up 3 react components needed on this page 
//then loads the data from the server to populate screen
const setup = function(csrf){
    ReactDOM.render( //counts
        <MealForm csrf={csrf} />, document.querySelector("#makeMeal")
    );

    ReactDOM.render( //counts
        <MealList meals={[]} />, document.querySelector("#mealsBox")
    );

    ReactDOM.render( //counts
        <RemoveMealForm csrf={csrf} />, document.querySelector("#removeMeal")
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