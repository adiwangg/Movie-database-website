const express = require("express");
const router = express.Router();
const axios = require("axios");

// currently playing movie
router.get("/nowPlayingMovies", (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=68e7bb305d9cc82e72833b8ffff4fc66&language=en-US&page=1";

  axios
    .get(url)
    .then((response) => {
      const data = response.data["results"];
      const arr = [];
      for (i = 0; i < 5; i++) {
        arr.push(data[i]);
      }
      res.json(arr);
    })
    .catch((err) => {
      res.send(err);
    });
});

// popular movie
router.get("/popularMovies", (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/popular?api_key=68e7bb305d9cc82e72833b8ffff4fc66&language=en- US&page=1";

  axios
    .get(url)
    .then((response) => {
      res.json(response.data["results"]);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Top rated movies
router.get("/topRatedMovies", (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=68e7bb305d9cc82e72833b8ffff4fc66&language=en-US&page=1";

  axios
    .get(url)
    .then((response) => {
      res.json(response.data["results"]);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Trending movies
router.get("/trendingMovies", (req, res) => {
  const url =
    "https://api.themoviedb.org/3/trending/movie/day?api_key=68e7bb305d9cc82e72833b8ffff4fc66";

  axios
    .get(url)
    .then((response) => {
      res.json(response.data["results"]);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get movie detail
router.get("/:id", function (req, res) {
  let id = req.params.id;
  let url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=68e7bb305d9cc82e72833b8ffff4fc66&language=en-US&page=1";

  axios
    .get(url)
    .then((response) => {
      // process spoken languages
      var spoken_languages = "";
      response.data["spoken_languages"].forEach((element) => {
        spoken_languages += element["english_name"] + ", ";
      });
      spoken_languages = spoken_languages.substring(
        0,
        spoken_languages.length - 2
      );

      // process release year
      var release_year = response.data["release_date"].split("-")[0];

      // process runtime
      var runtime = time_convert(response.data["runtime"]);

      // process genres
      var genres = "";
      response.data["genres"].forEach((g) => {
        genres += g["name"] + ", ";
      });
      genres = genres.substring(0, genres.length - 2);

      const box = {
        id: response.data["id"],
        title: response.data["title"],
        tagline: response.data["tagline"],
        overview: response.data["overview"],
        spoken_languages: spoken_languages,
        release_year: release_year,
        runtime: runtime,
        vote_average: response.data["vote_average"],
        genres: genres,
        poster_path: response.data["poster_path"],
      };
      //console.log(box);
      res.json(box);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get movie cast
router.get("/cast/:id", function (req, res) {
  let id = req.params.id;
  let url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/credits?api_key=68e7bb305d9cc82e72833b8ffff4fc66&language=en-US&page=1";

  axios
    .get(url)
    .then((response) => {
      res.json(response.data["cast"]);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get movie reviews
router.get("/reviews/:id", function (req, res) {
  let id = req.params.id;
  let url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/reviews?api_key=68e7bb305d9cc82e72833b8ffff4fc66&language=en-US&page=1";

  axios
    .get(url)
    .then((response) => {
      let reviews = response.data["results"];
      boxes = [];

      reviews.forEach((ele) => {
        let avatar_path = ele.author_details.avatar_path;
        if (avatar_path === null) {
          avatar_path =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU";
        } else if (avatar_path.includes("http")) {
          avatar_path = avatar_path.substring(1, avatar_path.length);
        } else {
          avatar_path = "https://image.tmdb.org/t/p/original" + avatar_path;
        }

        let rating = ele.author_details.rating;
        if (rating === null) {
          rating = 0;
        }

        let created_at_raw = ele.created_at;
        let date = new Date(created_at_raw);

        let created_at = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(date);

        let box = {
          author: ele.author,
          content: ele.content,
          avatar_path: avatar_path,
          rating: rating,
          url: ele.url,
          created_at: created_at,
        };
        boxes.push(box);
      });

      res.json(boxes);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get recommended movies
router.get("/recommend/:id", function (req, res) {
  let id = req.params.id;
  let url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/recommendations?api_key=68e7bb305d9cc82e72833b8ffff4fc66&language=en-US&page=1";

  axios
    .get(url)
    .then((response) => {
      res.json(response.data["results"]);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get similar movies
router.get("/similar/:id", function (req, res) {
  let id = req.params.id;
  let url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/similar?api_key=68e7bb305d9cc82e72833b8ffff4fc66&language=en-US&page=1";

  axios
    .get(url)
    .then((response) => {
      res.json(response.data["results"]);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get movie video
router.get("/video/:id", function (req, res) {
  let id = req.params.id;
  let url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/videos?api_key=68e7bb305d9cc82e72833b8ffff4fc66&language=en-US&page=1";

  axios
    .get(url)
    .then((response) => {
      let videos = response.data["results"];
      let video_url = "";
      for (var i = 0; i < videos.length; i++) {
        if (videos[i]["type"] === "Trailer") {
          video_url = videos[i]["key"];
          break;
        }
      }
      for (var i = 0; i < videos.length; i++) {
        if (videos[i]["type"] === "teaser") {
          video_url = videos[i]["key"];
          break;
        }
      }
      if (video_url.length == 0) {
        video_url = "tzkWB85ULJY";
      }
      res.json(video_url);
    })
    .catch((err) => {
      res.send(err);
    });
});

function time_convert(num) {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  return hours == 0 ? minutes + "mins" : hours + "hrs " + minutes + "mins";
}

module.exports = router;
