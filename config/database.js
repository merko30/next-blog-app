var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

module.exports = () => {
  try {
    mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};
