exports.home = async (req, res) => {
  res.render("home", {isLogedIn: req.isLogedIn});
}
