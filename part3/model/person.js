const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

console.log(`connecting to`, url);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("connected to MongDB");
  })
  .catch(err => console.log("error connecting to mongdb: ", err.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
});

// Apply the uniqueValidator plugin to userSchema.
personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Person", personSchema);
