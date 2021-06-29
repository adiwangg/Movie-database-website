const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:term", function (req, res) {
  let term = req.params.term;
  let url =
    "https://api.themoviedb.org/3/search/multi?api_key=68e7bb305d9cc82e72833b8ffff4fc66&language=en-US&query=" +
    term;
  axios
    .get(url)
    .then((response) => {
      let temp_res = response.data["results"];
      var results = [];
      var idx = 0;
      for (var i = 0; i < temp_res.length; i++) {
        if (temp_res[i].backdrop_path == null) {
          continue;
        }

        var result = {};
        result.id = temp_res[i].id;
        if (temp_res[i].media_type === "tv") {
          result.name = temp_res[i].name;
        } else if (temp_res[i].media_type === "movie") {
          result.name = temp_res[i].title;
        } else {
          continue;
        }

        result.backdrop_path = temp_res[i].backdrop_path;
        result.media_type = temp_res[i].media_type;
        results[idx] = result;
        idx++;
      }

      //console.log(results);
      res.json({ results: results });
      //res.json(response.data["results"]);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
