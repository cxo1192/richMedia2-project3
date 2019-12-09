const controllers = require('./controllers');
const mid = require('./middleware');

// maybe change this for about and 404 pages as well
const router = (app) => {
  // gets login page
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  // sends login data
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  // sends signup data
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  // logs out and gets login page
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  // gets about page
  app.get('/about', mid.requiresSecure, controllers.Account.aboutPage);
  // sends data to change password
  app.post('/changePass', /* mid.requiresLogin,*/
  mid.requiresSecure, controllers.Account.changePass);
  // gets main app page to make meals
  app.get('/maker', mid.requiresLogin, controllers.Meal.makerPage);
  // sends data to make a meal
  app.post('/maker', mid.requiresLogin, controllers.Meal.make);
  // sends data to remove a meal
  app.post('/deleter', mid.requiresLogin, controllers.Meal.deleteMeal);
  // gets login page when page is not specified
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  // added for react
  // gets token
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  // getMeal by account id
  app.get('/getMeals', mid.requiresLogin, controllers.Meal.getMeal);
  // used for 404 page
  app.get('/*', mid.requiresSecure, controllers.Account.loginPage);
};

// exports router
module.exports = router;
