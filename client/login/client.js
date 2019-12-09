//checks data input and then sends login request
const handleLogin = e => {
    e.preventDefault();

    $("#ronMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == ''){
        handleError("Username or password is empty");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

//checks entered data and then sends signup request
const handleSignup = (e) => {
    e.preventDefault();

    $("#ronMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("All fields are required");
        return false;
    }

    if($("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};


//handle change password here
const handleChangePass = (e) => {
    e.preventDefault();

    $("#ronMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#oldPass").val() == '' || $("#newPass").val() == ''){
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);

    return false;
};


//react login window
const LoginWindow = (props) => {
    return(
        <form id="loginForm" name="loginForm"
        onSubmit={handleLogin}
        action="/login"
        method="POST"
        className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="Sign in"/>
        </form>
    );
};

//react signup window
const SignupWindow = (props) => {
    return(
        <form id="signupForm" 
        name="signupForm"
        onSubmit={handleSignup}
        action="/signup"
        method="POST"
        className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="Sign up"/>
        </form>
    );
};


//change pass window
const ChangePassWindow = (props) => {
    return(
        <form id="changePassForm" 
        name="changePassForm"
        onSubmit={handleChangePass} 
        action="/changePass"
        method="POST"
        className="mainForm"
        >
            <label for="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label for="oldPass">Old-Password: </label>
            <input id="oldPass" type="password" name="oldPass" placeholder="old password"/>
            <label for="newPass">New-Password: </label>
            <input id="newPass" type="password" name="newPass" placeholder="new password"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input id="changePassSubmit" className="formSubmit" type="submit" value="Change Password"/>
        </form>
    );
};


//about window
const AboutWindow = (props) => {
    return(
        <div>
            <h1>All About MealMaker</h1>
            <p>
                Meal Maker is a simple yet effective web-based meal tracker app. 
                Here you can make an account to store all the data about your daily diet. 
                You can enter various information such as calories and protein into the app and create individual meals. 
                The app provides the daily recommended values you should be consuming. 
                You can then compare what you have eaten with these values and discover what you need to cut out and what you need to add to your diet.
                You can then start fresh each day by removing the meals with the press of a button and starting fresh.
                Additionally the app will calculate your total nutrition facts by compiling all the data from all of your entered meals for the day. 
                Not only that but the app will also display when the user is over, under, or on target for the day. 
                Each measure of nutrition is color coded both for males and females to indicate if you need more protein, less carbs, or the same about of calories etc. 
                Nutrition facts labeled in black are on target, those labeled in blue are under target, and those labeled in red are over target.
            </p>
            <p id="sources"> The recomended daily nutrition values are obtained from <a href="https://health.gov/dietaryguidelines/2015/guidelines/appendix-7/">Health.gov</a>  and <a href="https://www.medicalnewstoday.com/articles/315900.php#recommended-levels">Medical News Today</a></p>
        </div>
    );
};

//whoops window
const WhoopsWindow = (props) => {
    return(
        <div>
            <h1>Whoops!</h1>
            <p>
                The page you were looking for does not exist.
                Feel free to navigate to the home page to access the available content.
                Sorry for the inconvenience. 
            </p>
        </div>
    );
};

//functions to generate the various react windows when event listeners are triggered
const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createChangePassWindow = (csrf) => {
    ReactDOM.render(
        <ChangePassWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createAboutWindow = (csrf) => { //counts
    ReactDOM.render(
        <AboutWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createWhoopsWindow = (csrf) => { //counts
    ReactDOM.render(
        <WhoopsWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

//3 more reactDom.render in maker.js


//sets up initial page for react to load in
const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const changePassButton = document.querySelector("#changePassButton");
    const aboutButton = document.querySelector("#aboutButton");

    //event listeners to create the appropriate windows when the buttons are clicked
    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });    

    changePassButton.addEventListener("click", (e) => {
        e.preventDefault();
        createChangePassWindow(csrf);
        return false;
    });

    aboutButton.addEventListener("click", (e) => {
        e.preventDefault();
        createAboutWindow(csrf);
        return false;
    });    

    //console.log(window.location.pathname);
    //goes to login page if page is nuetrally loaded or to a 404 page if a page that does not exist is requested
    if(window.location.pathname != '/login' && window.location.pathname != '/'){
        createWhoopsWindow(csrf); //404 page
    }else{
        createLoginWindow(csrf); //default view
    }

   
};


const getToken = () =>{
    sendAjax('GET', '/getToken', null, (result) =>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});