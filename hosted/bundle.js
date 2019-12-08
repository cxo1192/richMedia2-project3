"use strict";

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

//handleRemoveMeal
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
            { "for": "name" },
            "Name: "
        ),
        React.createElement("input", { id: "mealName", type: "text", name: "name", placeholder: "Meal Name" }),
        React.createElement(
            "label",
            { "for": "calories" },
            "Calories: "
        ),
        React.createElement("input", { id: "mealCalories", type: "text", name: "calories", placeholder: "Meal Calories" }),
        React.createElement(
            "label",
            { "for": "protien" },
            "Protien: "
        ),
        React.createElement("input", { id: "mealProtien", type: "text", name: "protien", placeholder: "Meal Protien" }),
        React.createElement(
            "label",
            { "for": "carbs" },
            "Carbs: "
        ),
        React.createElement("input", { id: "mealCarbs", type: "text", name: "carbs", placeholder: "Meal Carbs" }),
        React.createElement(
            "label",
            { "for": "fat" },
            "Fat: "
        ),
        React.createElement("input", { id: "mealfat", type: "text", name: "fat", placeholder: "Meal Fat" }),
        React.createElement(
            "label",
            { "for": "sodium" },
            "Sodium: "
        ),
        React.createElement("input", { id: "mealSodium", type: "text", name: "sodium", placeholder: "Meal Sodium" }),
        React.createElement(
            "label",
            { "for": "Cholesterol" },
            "Chol: "
        ),
        React.createElement("input", { id: "mealCholesterol", type: "text", name: "cholesterol", placeholder: "Meal Cholesterol" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeMealSubmit", type: "submit", value: "Make Meal" })
    );
};

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
            { id: "removeMealNameLabel", "for": "removeName" },
            "Meal Name To Remove: "
        ),
        React.createElement("input", { id: "removeMealName", type: "text", name: "removeName", placeholder: "Meal Name" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeMealSubmit", type: "submit", value: "Remove" })
    );
};

//add daily value stuff


var MealList = function MealList(props) {
    if (props.meals.length === 0) {
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

    var mealNodes = props.meals.map(function (meal) {
        return React.createElement(
            "div",
            { key: meal._id, className: "meal" },
            React.createElement("img", { src: "/assets/img/mealSketch.png", alt: "meal img", className: "mealImg" }),
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
                " Protien: ",
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
        );
    });

    return React.createElement(
        "div",
        { className: "mealList" },
        mealNodes
    );
};

var loadMealsFromServer = function loadMealsFromServer() {
    sendAjax('GET', '/getMeals', null, function (data) {
        ReactDOM.render(React.createElement(MealList, { meals: data.meals }), document.querySelector("#mealsBox"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render( //counts
    React.createElement(MealForm, { csrf: csrf }), document.querySelector("#makeMeal"));

    ReactDOM.render( //counts
    React.createElement(MealList, { meals: [] }), document.querySelector("#mealsBox"));

    //add one for remove meal //will count and be all 5
    ReactDOM.render( //counts
    React.createElement(RemoveMealForm, { csrf: csrf }), document.querySelector("#removeMeal"));

    //potentially add ads here

    //potentially add recomended here

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
