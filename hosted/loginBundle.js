"use strict";

//checks data input and then sends login request
var handleLogin = function handleLogin(e) {
    e.preventDefault();

    $("#ronMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or password is empty");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

//checks entered data and then sends signup request
var handleSignup = function handleSignup(e) {
    e.preventDefault();

    $("#ronMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if ($("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

//handle change password here
var handleChangePass = function handleChangePass(e) {
    e.preventDefault();

    $("#ronMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#oldPass").val() == '' || $("#newPass").val() == '') {
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);

    return false;
};

//react login window
var LoginWindow = function LoginWindow(props) {
    return React.createElement(
        "form",
        { id: "loginForm", name: "loginForm",
            onSubmit: handleLogin,
            action: "/login",
            method: "POST",
            className: "mainForm"
        },
        React.createElement(
            "label",
            { htmlFor: "username" },
            "Username: "
        ),
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
        React.createElement(
            "label",
            { htmlFor: "pass" },
            "Password: "
        ),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign in" })
    );
};

//react signup window
var SignupWindow = function SignupWindow(props) {
    return React.createElement(
        "form",
        { id: "signupForm",
            name: "signupForm",
            onSubmit: handleSignup,
            action: "/signup",
            method: "POST",
            className: "mainForm"
        },
        React.createElement(
            "label",
            { htmlFor: "username" },
            "Username: "
        ),
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
        React.createElement(
            "label",
            { htmlFor: "pass" },
            "Password: "
        ),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
        React.createElement(
            "label",
            { htmlFor: "pass2" },
            "Password: "
        ),
        React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign up" })
    );
};

//change pass window
var ChangePassWindow = function ChangePassWindow(props) {
    return React.createElement(
        "form",
        { id: "changePassForm",
            name: "changePassForm",
            onSubmit: handleChangePass,
            action: "/changePass",
            method: "POST",
            className: "mainForm"
        },
        React.createElement(
            "label",
            { "for": "username" },
            "Username: "
        ),
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
        React.createElement(
            "label",
            { "for": "oldPass" },
            "Old-Password: "
        ),
        React.createElement("input", { id: "oldPass", type: "password", name: "oldPass", placeholder: "old password" }),
        React.createElement(
            "label",
            { "for": "newPass" },
            "New-Password: "
        ),
        React.createElement("input", { id: "newPass", type: "password", name: "newPass", placeholder: "new password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { id: "changePassSubmit", className: "formSubmit", type: "submit", value: "Change Password" })
    );
};

//about window
var AboutWindow = function AboutWindow(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            "All About MealMaker"
        ),
        React.createElement(
            "p",
            null,
            "Meal Maker is a simple yet effective web-based meal tracker app. Here you can make an account to store all the data about your daily diet. You can enter various information such as calories and protein into the app and create individual meals. The app provides the daily recommended values you should be consuming. You can then compare what you have eaten with these values and discover what you need to cut out and what you need to add to your diet. You can then start fresh each day by removing the meals with the press of a button and starting fresh. Additionally the app will calculate your total nutrition facts by compiling all the data from all of your entered meals for the day. Not only that but the app will also display when the user is over, under, or on target for the day. Each measure of nutrition is color coded both for males and females to indicate if you need more protein, less carbs, or the same about of calories etc. Nutrition facts labeled in black are on target, those labeled in blue are under target, and those labeled in red are over target."
        ),
        React.createElement(
            "p",
            { id: "sources" },
            " The recomended daily nutrition values are obtained from ",
            React.createElement(
                "a",
                { href: "https://health.gov/dietaryguidelines/2015/guidelines/appendix-7/" },
                "Health.gov"
            ),
            "  and ",
            React.createElement(
                "a",
                { href: "https://www.medicalnewstoday.com/articles/315900.php#recommended-levels" },
                "Medical News Today"
            )
        ),
        React.createElement(
            "section",
            { "class": "ad" },
            React.createElement("img", { src: "/assets/img/ad.png", alt: "add 3" })
        )
    );
};

//whoops window
var WhoopsWindow = function WhoopsWindow(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            "Whoops!"
        ),
        React.createElement(
            "p",
            null,
            "The page you were looking for does not exist. Feel free to navigate to the home page to access the available content. Sorry for the inconvenience."
        ),
        React.createElement(
            "section",
            { id: "whoops" },
            React.createElement("img", { src: "/assets/img/whoops.png", alt: "whoopsImg" })
        )
    );
};

//functions to generate the various react windows when event listeners are triggered
var createLoginWindow = function createLoginWindow(csrf) {
    ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow(csrf) {
    ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#content"));
};

var createChangePassWindow = function createChangePassWindow(csrf) {
    ReactDOM.render(React.createElement(ChangePassWindow, { csrf: csrf }), document.querySelector("#content"));
};

var createAboutWindow = function createAboutWindow(csrf) {
    //counts
    ReactDOM.render(React.createElement(AboutWindow, { csrf: csrf }), document.querySelector("#content"));
};

var createWhoopsWindow = function createWhoopsWindow(csrf) {
    //counts
    ReactDOM.render(React.createElement(WhoopsWindow, { csrf: csrf }), document.querySelector("#content"));
};

//3 more reactDom.render in maker.js


//sets up initial page for react to load in
var setup = function setup(csrf) {
    var loginButton = document.querySelector("#loginButton");
    var signupButton = document.querySelector("#signupButton");
    var changePassButton = document.querySelector("#changePassButton");
    var aboutButton = document.querySelector("#aboutButton");

    //event listeners to create the appropriate windows when the buttons are clicked
    signupButton.addEventListener("click", function (e) {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    changePassButton.addEventListener("click", function (e) {
        e.preventDefault();
        createChangePassWindow(csrf);
        return false;
    });

    aboutButton.addEventListener("click", function (e) {
        e.preventDefault();
        createAboutWindow(csrf);
        return false;
    });

    //console.log(window.location.pathname);
    //goes to login page if page is nuetrally loaded or to a 404 page if a page that does not exist is requested
    if (window.location.pathname != '/login' && window.location.pathname != '/') {
        createWhoopsWindow(csrf); //404 page
    } else {
        createLoginWindow(csrf); //default view
    }
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
