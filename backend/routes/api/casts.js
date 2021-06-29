const express = require("express");
const router = express.Router();
const axios = require("axios");

// get cast detail
router.get("/:id", function (req, res) {
  let id = req.params.id;
  let url =
    "https://api.themoviedb.org/3/person/" +
    id +
    "?api_key=68e7bb305d9cc82e72833b8ffff4fc66&language=en-US&page=1";

  axios
    .get(url)
    .then((response) => {
      if (response.data["also_known_as"].length == 0) {
        response.data["also_known_as"] = null;
      }
      res.json(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get cast social media info detail
router.get("/social/:id", function (req, res) {
  let id = req.params.id;
  let url =
    "https://api.themoviedb.org/3/person/" +
    id +
    "/external_ids?api_key=68e7bb305d9cc82e72833b8ffff4fc66&language=en-US&page=1";

  axios
    .get(url)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
