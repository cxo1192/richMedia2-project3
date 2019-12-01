const models = require('../models');

const Meal = models.Meal;

// displays appropriate handlebar file for the app
const makerPage = (req, res) => {
  Meal.MealModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), meals: docs });
  });
};

// function to create a meal and add it to the database
const makeMeal = (req, res) => {
  if (!req.body.name || !req.body.calories || !req.body.protien
    || !req.body.carbs || !req.body.fat
    || !req.body.sodium || ! req.body.cholesterol) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const MealData = {
    name: req.body.name,
    calories: req.body.calories,
    protien: req.body.protien,
    carbs: req.body.carbs,
    fat: req.body.fat,
    sodium: req.body.sodium,
    cholesterol: req.body.cholesterol,
    owner: req.session.account._id,
  };

  const newMeal = new Meal.MealModel(MealData);

  const MealPromise = newMeal.save();

  MealPromise.then(() => res.json({ redirect: '/maker' }));

  MealPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Meal already exists.' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return MealPromise;
};

// find meal by owner
const getMeal = (request, response) => {
  const req = request;
  const res = response;

  return Meal.MealModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ meals: docs });
  });
};

// function to delete specific meal from the database
const deleteMeal = (req, res) => {
  console.dir(req.body);
  if (!req.body.removeName) {
    return res.status(400).json({ error: 'Enter Meal Name to Remove' });
  }

  return Meal.MealModel.deleteMeal(req.body.removeName,
    () => res.json({ redirect: '/maker' })); // hmm
};

// exports these functions
module.exports.makerPage = makerPage;
module.exports.getMeal = getMeal;
module.exports.make = makeMeal;
module.exports.deleteMeal = deleteMeal;
