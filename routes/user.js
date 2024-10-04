const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUSer,
} = require("../controllers/user");
const { CreateNewUSer } = require("../controllers/user");

const userController = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUSer);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;

// app.use((req, res, next) => {
//   res.status(404).send("Sorry, can't find that!");
// });
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// router.get("/api/users/home", async (req, res) => {
//   res.sendFile(filename, function (err) {
//     if (err) {
//       console.error("Error sending file:", err);
//     } else {
//       console.log("Sent:", fileName);
//     }
//   });
// });

// router.get("/api/users/login", async (req, res) => {
//   const name = req.query.name;
//   console.log(name, req.query);
//   res.render("login.ejs", { name });
// });
