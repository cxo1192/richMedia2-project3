"use strict";

//evaluates entered data and then sends a make meal request
var handleMakeMeal = function handleMakeMeal(e) {
    e.preventDefault();

    $("#ronMessage").animate({ width: 'hide' }, 350);

    if ($("#mealName").val() == '' || $("#mealCalories").val() == '' || $("#mealProtien").val() == '' || $("#mealCarbs").val() == '' || $("#mealFat").val() == '' || $("#mealSodium").val() == '' || $("#mealCholesterol").val() == '') {
        //change
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#mealForm").attr("action"), $("#mealForm").serialize(), function () {
        loadMealsFromServer();
    });

    return false;
};

//checks data entered and then makes a remove meal request
var handleRemoveMeal = function handleRemoveMeal(e) {
    e.preventDefault();

    $("#ronMessage").animate({ width: 'hide' }, 350);

    if ($("#removeMealName").val() == '') {
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#removeMealForm").attr("action"), $("#removeMealForm").serialize(), function () {
        loadMealsFromServer();
    });

    return false;
};

//react component to make a meal
var MealForm = function MealForm(props) {
    return React.createElement(
        "form",
        { id: "mealForm",
            onSubmit: handleMakeMeal,
            name: "mealForm",
            action: "/maker",
            method: "POST",
            className: "mealForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "mealName", type: "text", name: "name", placeholder: "Meal Name" }),
        React.createElement(
            "label",
            { htmlFor: "calories" },
            "Calories: "
        ),
        React.createElement("input", { id: "mealCalories", type: "text", name: "calories", placeholder: "Meal Calories" }),
        React.createElement(
            "label",
            { htmlFor: "protien" },
            "Protien: "
        ),
        React.createElement("input", { id: "mealProtien", type: "text", name: "protien", placeholder: "Meal Protien" }),
        React.createElement(
            "label",
            { htmlFor: "carbs" },
            "Carbs: "
        ),
        React.createElement("input", { id: "mealCarbs", type: "text", name: "carbs", placeholder: "Meal Carbs" }),
        React.createElement(
            "label",
            { htmlFor: "fat" },
            "Fat: "
        ),
        React.createElement("input", { id: "mealfat", type: "text", name: "fat", placeholder: "Meal Fat" }),
        React.createElement(
            "label",
            { htmlFor: "sodium" },
            "Sodium: "
        ),
        React.createElement("input", { id: "mealSodium", type: "text", name: "sodium", placeholder: "Meal Sodium" }),
        React.createElement(
            "label",
            { htmlFor: "Cholesterol" },
            "Chol: "
        ),
        React.createElement("input", { id: "mealCholesterol", type: "text", name: "cholesterol", placeholder: "Meal Cholesterol" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeMealSubmit", type: "submit", value: "Make Meal" })
    );
};

//react component to remove a meal
var RemoveMealForm = function RemoveMealForm(props) {
    return React.createElement(
        "form",
        { id: "removeMealForm",
            onSubmit: handleRemoveMeal,
            name: "removeMealForm",
            action: "/deleter",
            method: "POST",
            className: "removeMealForm"
        },
        React.createElement(
            "label",
            { id: "removeMealNameLabel", htmlFor: "removeName" },
            "Meal Name To Remove: "
        ),
        React.createElement("input", { id: "removeMealName", type: "text", name: "removeName", placeholder: "Meal Name" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeMealSubmit", type: "submit", value: "Remove" })
    );
};

//react component to display all meals and user total nuitriution facts 
var MealList = function MealList(props) {
    if (props.meals.length === 0) {
        //if no meals
        return React.createElement(
            "div",
            { className: "mealList" },
            React.createElement(
                "h3",
                { className: "emptyMeal" },
                "No Meals yet"
            )
        );
    }

    //parse each meal
    var mealNodes = props.meals.map(function (meal) {
        return React.createElement(
            "div",
            { key: meal._id, className: "meal" },
            React.createElement("img", { src: "/assets/img/mealSketch.png", alt: "meal img", className: "mealImg" }),
            React.createElement(
                "div",
                { id: "mealFacts" },
                React.createElement(
                    "h3",
                    { className: "mealName" },
                    " Name: ",
                    meal.name,
                    " "
                ),
                React.createElement(
                    "h3",
                    { className: "calories" },
                    " Calories: ",
                    meal.calories,
                    " "
                ),
                React.createElement(
                    "h3",
                    { className: "protien" },
                    " Protein: ",
                    meal.protien,
                    " "
                ),
                React.createElement(
                    "h3",
                    { className: "carbs" },
                    " Carbs: ",
                    meal.carbs,
                    " "
                ),
                React.createElement(
                    "h3",
                    { className: "fat" },
                    " Fat: ",
                    meal.fat,
                    " "
                ),
                React.createElement(
                    "h3",
                    { className: "sodium" },
                    " Sodium: ",
                    meal.sodium,
                    " "
                ),
                React.createElement(
                    "h3",
                    { className: "cholesterol" },
                    " Cholesterol: ",
                    meal.cholesterol,
                    " "
                )
            )
        );
    });

    //calculates total cal intake for day
    var totalCal = 0;
    props.meals.map(function (meal) {
        totalCal += meal.calories;
    });

    //displays weather the user is over under or on target for calorie intake
    if (totalCal < 2000 || totalCal > 3200) {
        if (totalCal < 1600) {
            document.getElementById('fC').style.color = 'blue';
            document.getElementById('mC').style.color = 'blue';
        } else if (totalCal < 1800) {
            document.getElementById('mC').style.color = 'blue';
            document.getElementById('fC').style.color = 'black';
        } else if (totalCal > 1800) {
            document.getElementById('fC').style.color = 'red';
            if (totalCal > 3200) {
                document.getElementById('mC').style.color = 'red';
            } else if (totalCal < 2000) {
                document.getElementById('mC').style.color = 'blue';
            }
        }
    } else {
        document.getElementById('mC').style.color = 'black';
        document.getElementById('fC').style.color = 'red';
    }

    //calc total protien intake
    var totalPro = 0;
    props.meals.map(function (meal) {
        totalPro += meal.protien;
    });

    //displays weather the user is over under or on target for protien intake
    if (totalPro < 52 || totalPro > 56) {
        if (totalPro > 46 && totalPro < 52) {
            document.getElementById('mP').style.color = 'blue'; //blue = under taget
            document.getElementById('fP').style.color = 'black'; //blak = on target
        } else if (totalPro > 56) {
            document.getElementById('fP').style.color = 'red'; //red = over target
            document.getElementById('mP').style.color = 'red';
        } else if (totalPro < 46) {
            document.getElementById('fP').style.color = 'blue';
            document.getElementById('mP').style.color = 'blue';
        }
    } else {
        document.getElementById('fP').style.color = 'black';
        document.getElementById('mP').style.color = 'black';
    }

    //calc total carb intake
    var totalCar = 0;
    props.meals.map(function (meal) {
        totalCar += meal.carbs;
    });

    //displays weather the user is over under or on target for carb intake
    if (totalCar < 130) {
        document.getElementById('fCa').style.color = 'blue';
        document.getElementById('mCa').style.color = 'blue';
    } else if (totalCar > 130) {
        document.getElementById('fCa').style.color = 'red';
        document.getElementById('mCa').style.color = 'red';
    } else {
        document.getElementById('fCa').style.color = 'black';
        document.getElementById('mCa').style.color = 'black';
    }

    //calc total fat intake
    var totalFat = 0;
    props.meals.map(function (meal) {
        totalFat += meal.fat;
    });

    //displays weather the user is over under or on target for fat intake
    if (totalFat < 20) {
        document.getElementById('fF').style.color = 'blue';
        document.getElementById('mF').style.color = 'blue';
    } else if (totalFat > 35) {
        document.getElementById('fF').style.color = 'red';
        document.getElementById('mF').style.color = 'red';
    } else {
        document.getElementById('fF').style.color = 'black';
        document.getElementById('mF').style.color = 'black';
    }

    //calc total sodium intake
    var totalSo = 0;
    props.meals.map(function (meal) {
        totalSo += meal.sodium;
    });

    //displays weather the user is over under or on target for sodium intake
    if (totalSo < 2300) {
        document.getElementById('fS').style.color = 'blue';
        document.getElementById('mS').style.color = 'blue';
    } else if (totalSo > 2300) {
        document.getElementById('fS').style.color = 'red';
        document.getElementById('mS').style.color = 'red';
    } else {
        document.getElementById('fS').style.color = 'black';
        document.getElementById('mS').style.color = 'black';
    }

    //calc total cholesterol intake
    var totalCho = 0;
    props.meals.map(function (meal) {
        totalCho += meal.cholesterol;
    });

    //displays weather the user is over under or on target for cholesterol intake
    if (totalCho < 200) {
        document.getElementById('fCh').style.color = 'black';
        document.getElementById('mCh').style.color = 'black';
    } else {
        document.getElementById('fCh').style.color = 'red';
        document.getElementById('mCh').style.color = 'red';
    }

    //display nutrition totals and all meals after parsing
    return React.createElement(
        "div",
        { className: "mealList" },
        React.createElement(
            "div",
            { className: "total" },
            "Your Totals",
            React.createElement(
                "p",
                { id: "tCl" },
                "Calories: ",
                totalCal
            ),
            React.createElement(
                "p",
                { id: "tP" },
                "Protein: ",
                totalPro
            ),
            React.createElement(
                "p",
                { id: "tCb" },
                "Carbs: ",
                totalCar
            ),
            React.createElement(
                "p",
                { id: "tF" },
                "Fat: ",
                totalFat
            ),
            React.createElement(
                "p",
                { id: "tS" },
                "Sodium: ",
                totalSo
            ),
            React.createElement(
                "p",
                { id: "tCh" },
                "Cholesterol: ",
                totalCho
            )
        ),
        mealNodes
    );
};

//loads meals
var loadMealsFromServer = function loadMealsFromServer() {
    sendAjax('GET', '/getMeals', null, function (data) {
        ReactDOM.render(React.createElement(MealList, { meals: data.meals }), document.querySelector("#mealsBox"));
    });
};

//sets up 3 react components needed on this page 
//then loads the data from the server to populate screen
var setup = function setup(csrf) {
    ReactDOM.render( //counts
    React.createElement(MealForm, { csrf: csrf }), document.querySelector("#makeMeal"));

    ReactDOM.render( //counts
    React.createElement(MealList, { meals: [] }), document.querySelector("#mealsBox"));

    ReactDOM.render( //counts
    React.createElement(RemoveMealForm, { csrf: csrf }), document.querySelector("#removeMeal"));

    loadMealsFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

//helper functions that handle errors redirects and sending data

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#ronMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#ronMessage").animate({ width: 'toggle' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
