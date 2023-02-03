require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

// 1 Create and Save a Record of a Model
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: 'Mike Tyson',
    age: 34,
    favoriteFoods:['somsa','manti','holvaytar']
  })
  
  person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};


// 2 Create Many Records with model.create()
var arrayOfPeople = [{
  name: 'Mike Tyson',
  age: 34,
  favoriteFoods:['somsa','manti','holvaytar']
},{
  name: 'Bob Tyler',
  age: 24,
  favoriteFoods:['perashka','gumma','qurt']
}]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.error(err);
    done(null, people)
  });
};


// 3 Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, people) {
    if (err) return console.error(err);
    done(null, people)
  });
};


// 4 Use model.findOne() to find only one person
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, people) {
    if (err) return console.error(err);
    done(null, people)
  });
};

const findPersonById = (personId, done) => {
  Person.findOne(personId, function (err, people) {
    if (err) return console.error(err);
    done(null, people)
  });
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
