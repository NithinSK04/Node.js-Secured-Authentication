const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connection was successfull"))
    .catch((e) => {
      console.log("error", e);
      process.exit(1);
    });
};
