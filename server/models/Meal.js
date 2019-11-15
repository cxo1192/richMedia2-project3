const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let MealModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
    unique: true,
  },

//   brand: {
//     type: String,
//     required: false,
//     trim: true,
//   },

  calories: {
    type: Number,
    min: 0,
    required: true,
  },

  protien: {
    type: Number,
    min: 0,
    required: true,
  },

  carbs: {
    type: Number,
    min: 0,
    required: true,
  },

  fat: {
    type: Number,
    min: 0,
    required: true,
  },

  sodium: {
    type: Number,
    min: 0,
    required: true,
  },

  cholesterol: {
    type: Number,
    min: 0,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});


MealSchema.statics.toAPI = (doc) => ({
  name: doc.name,
//   brand: doc.brand,
  calories: doc.calories,
  protien: doc.protien,
  carbs: doc.carbs,
  fat: doc.fat,
  sodium: doc.sodium,
  cholesterol: doc.cholesterol,
});

MealSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

//   return MealModel.find(search)
// .select('name brand calories protien carbs fat sodium cholesterol').exec(callback);
  return MealModel.find(search)
  .select('name calories protien carbs fat sodium cholesterol').exec(callback);
};

MealSchema.statics.deleteMeal = (mealName, callback) => {
  const search = {
    name: mealName,
  };

  return MealModel.deleteOne(search, callback);
};

MealModel = mongoose.model('Meal', MealSchema);

module.exports.MealModel = MealModel;
module.exports.MealSchema = MealSchema;
