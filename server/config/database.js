var mongoose = require("mongoose");
mongoose.set("strictQuery", true);
module.exports = () => {
  try {
    mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new Error("Failed to connect database");
  }
};
