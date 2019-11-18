// confirms user is logged in before bringing them to appropriate page
const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

// confirms user is logged out before bringing them to appropriate page
const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/maker');
  }

  return next();
};

// confirms user is in secure session before bringing them to appropriate page
const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};

// ignores security
const bypassSecure = (req, res, next) => {
  next();
};

// exports functions
module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

// exports appropriate function based on dev/preduction enviroment
if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
