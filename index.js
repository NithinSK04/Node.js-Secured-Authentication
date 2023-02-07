const app = require("./app");

app.listen(process.env.PORT, (req, res) => {
  console.log(`listening to port number ${process.env.PORT}`);
});
