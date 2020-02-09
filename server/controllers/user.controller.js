const Users = require('../models/user.model');
const passport = require('passport');

exports.create = ((req, res) => {
  const { body: { user } } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const newUser = new Users(user);

  newUser.setPassword(user.password);

  return newUser.save()
    .catch((err) => {
      res.send(err)
    })
    .then(() => res.json({ user: newUser.toAuthJSON() }));
});

exports.login = ((req, res, next) => {
  const { body: { user } } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser) => {
    if (err) {
      return res.send(err);
    }

    if (!passportUser) {
      return res.send('No user found with that email / password combination');
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});
