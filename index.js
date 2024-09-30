const express = require("express"); // Importing the Express library to create the server.
const users = require("./MOCK_DATA.json"); // Importing the user data from a local JSON file.
const fs = require("fs"); // Importing the file system module to handle file operations
const { error } = require("console");
const { default: mongoose } = require("mongoose");
const app = express(); // Creating an Express app instance.
const PORT = 8000; // Defining the port where the server will listen.

//connection
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(() => console.log('MongoDB connected'))
.catch((err)=> console.log)

//schema
const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    unique: true,
  },
  jobTitle: {
    type: Stirng,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

//middleware-cplugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // console.log("Hello From Middleware 1"); // Logs when the middleware is hit
  // req.myUSerName = "yashsharma.dev";

  // return res.json({mgs:"Hello from middleware 1"});

  // next(); //Passes control to the next middleware or route handler.

  fs.appendFile(
    "log.txt",
    `\n${Date.now()}:${req.ip}: ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

// app.use((req, res, next) => {
//   console.log("Hello From Middleware 2", req.myUSerName);
//   // return res.end("HEY");

//   // db queey the user credit card info
//   // req.creditCardNumber = "123";
//   next();
// });

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "yash sharma");
  console.log(req.headers);
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body; // Get the body of the request
  console.log("Body", body);

  if (
    !body ||
    !body.first_name ||
    !body.lat_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "ALL the fields are req..." });
  }
  // Adding the new user to the array
  users.push({ ...body, id: users.length + 1 });

  // Writing to the file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    return res
      .status(201)
      .json({ status: "error", message: "Failed to write to file" }); // Handle file write error

    return res.json({ status: "success", id: users.length }); // Respond with success
  });
});

app.listen(PORT, () => console.log("Server started at port"));
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
