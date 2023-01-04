let personSchema = new mongoose.Schema({
    name: String[required],
    age: Number,
    favoriteFoods: Array,
  })
  
  module.exports = mongoose.model('Person', personSchema)