const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `
mongodb+srv://fso-user:${password}@cluster0-gfp3h.mongodb.net/test?retryWrites=true&w=majority
`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
});

if (person.name) {
  person.save().then(res => {
    console.log(`added ${person.name} ${person.number} to the database`);
    mongoose.connection.close();
  });
}

Person.find({}).then(result => {
  console.log("phonebook:");
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`);
  });
  mongoose.connection.close();
});
