const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

// set static folder
// app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "dist/frontend")));

app.use("/api/movies", require("./routes/api/movies"));
app.use("/api/tvs", require("./routes/api/tvs"));
app.use("/api/search", require("./routes/api/search"));
app.use("/api/casts", require("./routes/api/casts"));

app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
