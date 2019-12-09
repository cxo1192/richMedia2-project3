//helper functions that handle errors redirects and sending data

const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#ronMessage").animate({width:'toggle'},350);
};

const redirect = (response) => {
    $("#ronMessage").animate({width:'toggle'},350);
    window.location = response.redirect;
};

const sendAjax = (type,action,data,success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr,status,error){
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};