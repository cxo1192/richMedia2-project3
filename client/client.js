//shows error message in ronald mcdonald text bubble
const handleError = (message) => {
  $("#errorMessage").text(message);
  $("#ronMessage").animate({width:'toggle'},350);
}

//sends requests
const sendAjax = (action, data) => {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: (result, status, xhr) => {
      $("#ronMessage").animate({width:'hide'},350);

      window.location = result.redirect;
    },
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });        
}

//sets up on submit buttons to function appropriatly
$(document).ready(() => {
  $("#signupForm").on("submit", (e) => {
    e.preventDefault();

    $("#ronMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
      handleError("All fields are required");
      return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
      handleError("Passwords do not match");
      return false;           
    }

    sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

    return false;
  });


  $("#changePassForm").on("submit", (e) => {
    e.preventDefault();

    $("#ronMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#oldPass").val() == '' || $("#newPass").val() == '') {
      handleError("All fields are required");
      return false;
    }

    sendAjax($("#changePassForm").attr("action"), $("#changePassForm").serialize());

    return false;
  });

  $("#loginForm").on("submit", (e) => {
    e.preventDefault();

    $("#ronMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '') {
      handleError("Username or password is empty");
      return false;
    }

    sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

    return false;
  });
  
  $("#mealForm").on("submit", (e) => {
    e.preventDefault();

    $("#ronMessage").animate({width:'hide'},350);

    if($("#mealName").val() == '' || $("#mealCalories").val() == '' || $("#mealProtien").val() == '' || $("#mealCarbs").val() == '' || $("#mealfat").val() == '' || $("#mealSodium").val() == '' || $("#mealCholesterol").val() == '') {
      handleError("All fields are required");
      return false;
    }

    sendAjax($("#mealForm").attr("action"), $("#mealForm").serialize());

    return false;
  });


  $("#removeMealForm").on("submit", (e) => {
    e.preventDefault();

    $("#ronMessage").animate({width:'hide'},350);

    if($("#removeMealName").val() == '') {
      handleError("Meal Name to Remove is required");
      return false;
    }

    sendAjax($("#removeMealForm").attr("action"), $("#removeMealForm").serialize());

    return false;
  });
});