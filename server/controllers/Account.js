const models = require('../models');
const Account = models.Account;

// displays login page
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

// displays signup page
// const signupPage = (req, res) => {   //need to remove for react
//   res.render('signup', { csrfToken: req.csrfToken() });
// };

// displays change password page
const changePassPage = (req, res) => {
  res.render('changePass', { csrfToken: req.csrfToken() });
};

// displays about page
const aboutPage = (req, res) => res.render('about', { csrfToken: req.csrfToken() });

// displays 404 error page
const whoopsPage = (req, res) => res.render('whoops', { csrfToken: req.csrfToken() });

// ends session and redirects to login page
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// handles login request, authenticates and then redirects to app page
const login = (request, response) => {
  const req = request;
  const res = response;

    // force cast to strings to cover some security flaws
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

// validates username and password, creates account and then redirects to app page
const signup = (request, response) => {
  const req = request;
  const res = response;

    // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/maker' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

// validates user input authenticates user, updates password and then redirects
const changePass = (request, response) => {
  const req = request;
  const res = response;

   // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.oldPass = `${req.body.oldPass}`;
  req.body.newPass = `${req.body.newPass}`;

  if (!req.body.username || !req.body.oldPass || !req.body.newPass) {
    return res.status(400).json({ error: 'All fields are required' });
  }


  return Account.AccountModel.authenticate(req.body.username, req.body.oldPass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    // req.session.account = Account.AccountModel.toAPI(account);

    // return res.json({ redirect: '/maker' });
    return Account.AccountModel.generateHash(req.body.newPass, (salt, hash) => {
      // const accountData = {
      //   username: req.body.username,
      //   salt,
      //   password: hash,
      // };

      const newAccount = account;
      newAccount.password = hash;
      newAccount.salt = salt;

      const savePromise = newAccount.save();

      savePromise.then(() => {
        req.session.account = Account.AccountModel.toAPI(newAccount);
        return res.json({ redirect: '/maker' });
      });

      savePromise.catch((error) => {
        console.log(error);

        // if (err.code === 11000) {
        //   return res.status(400).json({ error: 'Username already in use.' });
        // }

        return res.status(400).json({ error: 'An error occurred' });
      });
    });
  });
};

// added  for react
const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

// exports all functions
module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
// module.exports.signupPage = signupPage;
module.exports.signup = signup;
module.exports.aboutPage = aboutPage;
module.exports.changePassPage = changePassPage;
module.exports.changePass = changePass;
module.exports.whoopsPage = whoopsPage;
module.exports.getToken = getToken;
