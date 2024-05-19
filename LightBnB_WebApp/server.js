const path = require("path");
const express = require("express");
const cookieSession = require("cookie-session");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");

// /api/endpoints
app.use("/api", apiRoutes);

// /user/endpoints
app.use("/users", userRoutes);

app.get("/test", (req, res) => {
  res.send("🤗");
});

//get all properties
app.get("/properties", (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;

  getAllProperties({}, limit)
    .then((properties) => {
      res.json(properties);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
