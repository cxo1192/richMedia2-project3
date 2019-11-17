const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/about', mid.requiresSecure, controllers.Account.aboutPage);
  app.get('/changePass', mid.requiresLogin, mid.requiresSecure, controllers.Account.changePassPage);
  app.post('/changePass', mid.requiresLogin, mid.requiresSecure, controllers.Account.changePass);
  app.get('/maker', mid.requiresLogin, controllers.Meal.makerPage); // changed for meal
  app.post('/maker', mid.requiresLogin, controllers.Meal.make); // changed for meal
  app.post('/deleter', mid.requiresLogin, controllers.Meal.deleteMeal); // needs work
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
