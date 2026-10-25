//switch form
function switchForm(isLogin) {
  //tab move active in selection box
  $(".selection .login").toggleClass("active", isLogin);
  $(".selection .register").toggleClass("active", !isLogin);

  //switch form
  $(".box.signin").toggleClass("active", isLogin);
  $(".box.register").toggleClass("active", !isLogin);
}

//show fill fields alert
function showFillAlert() {
  alertBox = $(".fillAllFieldsAlert");

  alertBox.addClass("show");

  setTimeout(function () {
    alertBox.removeClass("show");
  }, 3000);
}

//success login
function showSuccessAlert() {
  let alertBox = $(".successAlert");

  alertBox.addClass("show");

  setTimeout(function () {
    alertBox.removeClass("show");
  }, 3000);
}

//login alert
function showLoginErrorAlert() {
  let alertBox = $(".loginErrorAlert");

  alertBox.addClass("show");

  setTimeout(function () {
    alertBox.removeClass("show");
  }, 3000);
}

//switch eye icon
$(" i.fa-eye-slash").on("click", function () {
  let input = $(this).siblings("input");
  let isPassword = input.attr("type") === "password";

  input.attr("type", isPassword ? "text" : "password");

  $(this).toggleClass("fa-eye-slash", !isPassword).toggleClass("fa-eye", isPassword);
});

let films = document.querySelectorAll(".film-track .box");

// Set poster images
films.forEach((film) => {
  film.style.setProperty("--film-image", `url("${film.querySelector("img").src}")`);
});

// Show film
function focusPoster() {
  let center = innerWidth / 1.5;
  let closest = films[0];
  let min = innerWidth;

  films.forEach((film) => {
    let distance = film.getBoundingClientRect().left + film.offsetWidth / 2 - center;

    if (distance < 0) distance = -distance;

    if (distance < min) {
      min = distance;
      closest = film;
    }
  });

  films.forEach((film) => {
    film.classList.toggle("is-focused", film === closest);
  });

  requestAnimationFrame(focusPoster);
}
focusPoster();

//move films in trending
function move(step = 0) {
  let cards = $("#top .container .row").children();
  let row = cards.parent();
  current = (current + step + 8) % 8; //default we are on second film

  row.css("transform", `translateX(${(2 - current) * cards.width()}px)`);

  cards.removeClass("center").eq(current).addClass("center");
}

// Get top-rated data
async function getTopRatedData() {
  let response = await fetch("https://basmla-mohamed.github.io/api1/top-rated.json");
  myData = await response.json();

  showTopRatdData(myData);
}

// Show top-rated films
function showTopRatdData(data) {
  let dataRow = $("#top .container .body .row");
  dataRow.empty();

  data.forEach(function (film) {
    dataRow.append(`
      <div class="col-lg-3" data-film-id="${film.id}">
        <div class="item">
          <img src="${film.film}" class="img-fluid">
          <div class="react d-flex flex-column row-gap-3">
            <div class="latter"><i class="fa-solid fa-bookmark"></i></div>
            <div class="heart"><i class="fa-regular fa-heart"></i></div>
            <div class="info"><i class="fa-solid fa-circle-info details"></i></div>
          </div>
        </div>
      </div>
    `);
  });
  updateWatchLaterButtons();
  updateFavoriteIcons();
  move();
}

// Open film details in top-rated
$(document).on("click", "#top .item img, #top .details", function () {
  let popup = $("#filmsInfo");
  let id = $(this).closest("[data-film-id]").attr("data-film-id");
  let film = myData.find(function (film) {
    return film.id === id;
  });

  //instead paste html popup code
  popup.find(".popup-background").attr("src", film.filmBackground);
  popup.find(".popup-filmImage").attr("src", film.film);
  popup.find(".popup-title").text(film.title);
  popup.find(".popup-rate").text(film.rate);
  popup.find(".popup-stat-rate").text(film.rate + "/10");
  popup.find(".popup-date").text(film.date);
  popup.find(".popup-runtime").text(film.runTime);
  popup.find(".popup-stat-runtime").text(film.runTime);
  popup.find(".popup-adult").text(film.adult);
  popup.find(".popup-description").text(film.description);
  popup.find(".popup-genres").html(`<span>${film.genres.split(",").join("</span><span>")}</span>`);
  //we split here because in some films we have many genres
  popup.find(".popup-stat-genre").text(film.genres);
  popup.find(".film-note p").text(film.overview);
  popup.find(".popup-trailer").attr("href", "#").data("trailer", film.tailer);
  updateWatchLaterButtons();
  updateFavoriteIcons();
  popup.addClass("active");
});

// Close popup
function closPopup() {
  $("#filmsInfo").removeClass("active");
}

//get trending data
async function getTrendingData() {
  let myResponse = await fetch(`https://basmla-mohamed.github.io/apii/trending.json`);
  trendingData = await myResponse.json();

  showTrendingData(trendingData);
}

//show trending data and prepare indicators
function showTrendingData(Data) {
  let dataRow = $("#trending .carousel-inner");
  let indicators = $("#trending .carousel-indicators");

  dataRow.empty();
  indicators.empty();

  Data.forEach(function (film, index) {
    // Create film carousel
    dataRow.append(`
      <div class="carousel-item ${index === 0 ? "active" : ""}" data-film-id="${film.id}">
        <img src="${film.film}" class="d-block w-100" />

        <div class="details">VIEW DETAILS</div>

        <div class="info">
          <div class="name">
            <p>${film.title}</p>
          </div>

          <div class="dscribtion">
            <p>${film.description}</p>
          </div>

          <div class="rate">
            <p>${film.rate}/10 <i class="fa-solid fa-star"></i></p>
          </div>

          <div class="actions d-flex flex-row column-gap-3">
            <button class="d-flex flex-row align-items-center column-gap-3">
              <p class="m-0">Add to WatchList</p>
              <i class="fa-solid fa-bookmark"></i>
            </button>

            <button class="favorite">
              <i class="fa-regular fa-heart"></i>
              <span>Add to Favorites</span>
            </button>
          </div>
        </div>
      </div>
    `);

    // Create indicator
    indicators.append(`
      <button 
      data-bs-target="#carouselExampleFade"
        data-bs-slide-to="${index}"
        class="${index === 0 ? "active" : ""}"
        ${index === 0 ? 'aria-current="true"' : ""}
        aria-label="Slide ${index + 1}">
      </button>
    `);
  });
  updateWatchLaterButtons();
  updateFavoriteIcons();
}

// Open film details in top-rated
$(document).on("click", "#trending .details", function () {
  let popup = $("#filmsInfo"),
    id = $(this).closest(".carousel-item").attr("data-film-id"),
    film = trendingData.find((film) => film.id == id);

  popup.find(".popup-background").attr("src", film.filmBackground);
  popup.find(".popup-filmImage").attr("src", film.film);
  popup.find(".popup-title").text(film.title);
  popup.find(".popup-rate").text(film.rate);
  popup.find(".popup-stat-rate").text(film.rate + "/10");
  popup.find(".popup-date").text(film.date);
  popup.find(".popup-runtime, .popup-stat-runtime").text(film.runTime);
  popup.find(".popup-adult").text(film.adult);
  popup.find(".popup-description").text(film.description);
  popup.find(".popup-genres").html("<span>" + film.genres.split(",").join("</span><span>") + "</span>");
  popup.find(".popup-stat-genre").text(film.genres);
  popup.find(".film-note p").text(film.overview);
  popup.find(".popup-trailer").attr("href", "#").data("trailer", film.tailer);
  updateWatchLaterButtons();
  updateFavoriteIcons();
  popup.addClass("active");
});

//popular carousel
function moveSlider(step = 0) {
  popularPage += step;

  if (popularPage < 0) {
    popularPage = 0;
  }

  //stop count wen we have 5 on screen
  if (popularPage > $("#popular .body .col-lg-4").length - 5) {
    popularPage = $("#popular .body .col-lg-4").length - 5;
  }

  $("#popular .body .row").css("transform", `translateX(-${popularPage * 265}px)`);

  $("#popular .item").removeClass("active side-left side-right");

  $("#popular .col-lg-4").each(function (i) {
    //left films
    if (i < popularPage + 2) {
      $(this).find(".item").addClass("side-left");
    }
    //right films
    if (i > popularPage + 2) {
      $(this).find(".item").addClass("side-right");
    }
    //centre film
    if (i === popularPage + 2) {
      $(this).find(".item").addClass("active");
    }
  });
}

// Get popular data
async function getPopularData() {
  let popularResponse = await fetch("https://basmla-mohamed.github.io/api-3/popular.json");

  popularData = await popularResponse.json();

  console.log(popularData);
  showPopularData(popularData);
}

// show popular data
function showPopularData(dataa) {
  let dataRow = $("#popular .content .basmala");
  //when we type .row (side-right and side-left show under the section and i must change .row  to another name)??

  dataRow.empty();

  dataa.forEach(function (film) {
    dataRow.append(`
      <div class="col-lg-4" data-film-id="${film.id}">
        <div class="item">
          <img src="${film.film}" alt="${film.title}" />

          <div class="icons">
            <i class="fa-solid fa-circle-info details"></i>
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-bookmark"></i>
          </div>
        </div>
      </div>
    `);
  });
  updateWatchLaterButtons();
  updateFavoriteIcons();
  moveSlider(0);
}

// Open film details in popular
$(document).on("click", "#popular .details", function () {
  let popup = $("#filmsInfo");
  let id = $(this).closest("[data-film-id]").attr("data-film-id");
  let film = popularData.find((film) => film.id == id);
  let genres = "";

  popup.find(".popup-background").attr("src", film.filmBackground);
  popup.find(".popup-filmImage").attr("src", film.film);
  popup.find(".popup-title").text(film.title);
  popup.find(".popup-rate").text(film.rate);
  popup.find(".popup-stat-rate").text(film.rate + "/10");
  popup.find(".popup-date").text(film.date);
  popup.find(".popup-runtime, .popup-stat-runtime").text(film.runTime);
  popup.find(".popup-adult").text(film.adult);

  film.genres.forEach(function (genre) {
    genres += "<span>" + genre + "</span>";
  });
  popup.find(".popup-genres").html(genres);

  popup.find(".popup-description").text(film.description);
  popup.find(".popup-stat-genre").text(film.genres);
  popup.find(".film-note p").text(film.overview);
  popup.find(".popup-trailer").attr("href", "#").data("trailer", film.tailer);
  updateWatchLaterButtons();
  updateFavoriteIcons();
  popup.addClass("active");
});

// Get movies data
async function getMoviesData() {
  let response = await fetch("https://basmla-mohamed.github.io/api-4/moves.json");

  moviesData = await response.json();

  currentMovies = moviesData;
  visibleMoviesCount = 24;

  showMovies(moviesData);
}

// Show movies
function showMovies(data) {
  let dataRow = $("#movies .dataRow");

  dataRow.empty();
  $("#loadMoreMovies").remove();

  data.slice(0, visibleMoviesCount).forEach(function (film) {
    dataRow.append(`
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 b">
        <div class="item">
          <div class="movie-cart" data-film-id="${film.id}">
            <img src="${film.film}" alt="${film.title}" class="img-fluid">
            <span class="movie-rating"><i class="fa-solid fa-star"></i> ${film.rate}</span>
            <button class="favorite-btn"><i class="fa-regular fa-heart"></i></button>
            <div class="movie-layer">
              <span class="movie-genre">${film.genres}</span>
             <h3>${film.title.length > 15 ? film.title.slice(0, 15) + "..." : film.title}</h3>
              <p>${film.description}</p>
             <div class="d-flex flex-row column-gap-3 info">
                <button class="details-btn details"><i class="fa-solid fa-circle-info"></i> View Details</button>
                <button class="watch-btn"><i class="fa-solid fa-bookmark"></i> Watch Latter</button>
             </div>
            </div>
          </div>
          <div class="movie-info">
            <h3>${film.title.length > 20 ? film.title.slice(0, 20) + "..." : film.title}</h3>
            <span><i class="fa-regular fa-calendar-days"></i> ${film.date}</span>
          </div>
        </div>
      </div>
    `);
  });

  if (visibleMoviesCount < data.length) {
    dataRow.after(`
      <div id="loadMoreMovies" class="text-center mt-5">
        <p class="movies-count">Showing ${visibleMoviesCount} of ${data.length} movies</p>
        <button id="loadMoreMovies" class="load-more-btn">
          Load More Movies <i class="fa-solid fa-arrow-down"></i>
        </button>
      </div>
    `);
  }
  updateWatchLaterButtons();
  updateFavoriteIcons();
}

// Filter movies by category
$(".choosing-category .item").click(function () {
  let category = $(this).find("p").text();

  $(".choosing-category .item").removeClass("active");
  $(this).addClass("active");

  if (category === "All Movies") {
    currentMovies = moviesData;
  } else {
    if (category === "Cartoon") {
      category = "Animation";
    }

    currentMovies = moviesData.filter(function (film) {
      return (film.genres || []).includes(category);
    });
  }

  visibleMoviesCount = 24;
  showMovies(currentMovies);
});

// Load more movies
$(document).on("click", ".load-more-btn", function () {
  visibleMoviesCount += 8;
  showMovies(currentMovies);
});

// Open movie details from Movies section
$(document).on("click", "#movies .details-btn", function () {
  let popup = $("#filmsInfo");
  let id = $(this).closest(".movie-cart").attr("data-film-id");
  let film = moviesData.find((film) => film.id == id);
  let bgName = film.filmBackground.split("/").pop();
  let genresHTML = "";

  popup.find(".popup-filmImage").attr("src", film.film);
  popup.find(".popup-background").attr("src", `https://basmla-mohamed.github.io/api-4/backgrounds/${bgName}`);
  //film.filmBackground        JSON: ./../images/backgrounds/Abominable.jfif  (that is was the error )
  // .split("/")               array: [".", "..", "images", "backgrounds", "Abominable.jfif"]
  // .pop()                    give us the last ele in array  (Abominable.jfif)
  //we put it finally          in src

  // Show movie information
  popup.find(".popup-title").text(film.title);
  popup.find(".popup-rate").text(film.rate);
  popup.find(".popup-stat-rate").text(film.rate + "/10");
  popup.find(".popup-date").text(film.date);
  popup.find(".popup-runtime, .popup-stat-runtime").text(film.runTime);
  popup.find(".popup-adult").text(film.adult);
  popup.find(".popup-description").text(film.description);

  // Show genres
  film.genres.forEach((genre) => {
    genresHTML += `<span>${genre}</span>`;
  });

  popup.find(".popup-genres").html(genresHTML);
  popup.find(".popup-stat-genre").text(film.genres.join(", "));
  popup.find(".film-note p").text(film.overview);
  popup.find(".popup-trailer").attr("href", "#").data("trailer", film.tailer);
  console.log(film.filmBackground);
  updateWatchLaterButtons();
  updateFavoriteIcons();
  popup.addClass("active");
});

//prevent default to dont scroll to home when i open a trailer because i  us #
$(".popup-trailer").click(function (e) {
  e.preventDefault();

  let trailer = $(this).data("trailer");

  openTrailer(trailer);
});

// Open popup
function openPopup(name) {
  $(`.popup[data-popup-name="${name}"]`).addClass("active");
}

// Close popup
function closePopup() {
  $(".popup").removeClass("active");
}

// Save favorites in localStorage
function saveFavorites() {
  localStorage.setItem("muvanaFavorites", JSON.stringify(favorites));
}

// Check if a movie is already in favorites or no
function isFavorite(film) {
  for (let movie of favorites) {
    if (movie.title === film.title) {
      return true;
    }
  }
  return false;
}

// Add or remove a movie from favorites
function toggleFavorite(film) {
  if (isFavorite(film)) {
    favorites = favorites.filter((movie) => movie.title !== film.title);
  } else {
    favorites.push({ ...film });
  }

  saveFavorites();
  showFavorites();
  updateFavoriteIcons();
  updateWatchLaterButtons();
}

// Display saved favorites
function showFavorites() {
  let content = $('.popup[data-popup-name="fav"] .content');
  content.empty();

  if (favorites.length === 0) {
    content.html(`
      <div class="empty-favorites">
        <i class="fa-regular fa-heart"></i>
        <h3>No Favorites Yet</h3>
        <p>Explore movies and add your favorite stories here.</p>
      </div>
    `);
    return;
  }

  favorites.forEach(function (film) {
    content.append(`
      <div class="col-lg-3 col-md-4 col-6">
        <div class="item">
          <img src="${film.film}" class="img-fluid">
          <footer>
            <h3>${film.title.length > 15 ? film.title.slice(0, 15) + "..." : film.title}</h3>
            <p>${film.date}</p>
            <button class="remove-favorite" data-title="${film.title}">
              <i class="fa-solid fa-heart"></i>
            </button>
          </footer>
        </div>
      </div>
    `);
  });
}

// Display Watch Later movies
function showWatchLater() {
  let content = $('.popup[data-popup-name="watchLetter"] .content');

  content.empty();

  if (watchLater.length === 0) {
    content.html(`
      <div class="empty-favorites">
        <i class="fa-regular fa-clock"></i>
        <h3>No Movies Yet</h3>
        <p>Add movies you want to watch later.</p>
      </div>
    `);
    return;
  }

  watchLater.forEach(function (film) {
    content.append(`
      <div class="col-lg-3 col-md-4 col-6">
        <div class="item">
          <img src="${film.film}" class="img-fluid" alt="${film.title}">
          <footer>
            <h3>${film.title}</h3>
            <p class="date">${film.date || ""}</p>
            <i class="fa-solid fa-bookmark remove-watch" data-title="${film.title}"></i>
          </footer>
        </div>
      </div>
    `);
  });
}

// Update favorite icons
function updateFavoriteIcons() {
  let sections = [
    { name: "#top", data: myData },
    { name: "#trending", data: trendingData },
    { name: "#popular", data: popularData },
    { name: "#movies", data: moviesData },
  ];

  sections.forEach(function (section) {
    $(section.name + " [data-film-id]").each(function () {
      let id = $(this).attr("data-film-id");
      let film = section.data.find((movie) => movie.id == id);
      let heart = $(this).find(".heart, .favorite, .fa-heart, .favorite-btn");
      let saved = isFavorite(film);
      let icon = heart.find("i").add(heart.filter("i"));

      icon.toggleClass("fa-solid", saved);
      icon.toggleClass("fa-regular", !saved);

      heart.find("span").text(saved ? "Remove from Favorites" : "Add to Favorites");
    });
  });

  let title = $("#filmsInfo .popup-title").text();
  let film = findFavoriteMovie(title);

  if (film) {
    let saved = isFavorite(film);

    $("#filmsInfo .popup-favorite i").toggleClass("fa-solid", saved).toggleClass("fa-regular", !saved);

    $("#filmsInfo .popup-favorite span").text(saved ? "Remove from Favorites" : "Add to Favorites");
  }
}

// Find a movie in the JSON data
function findFavoriteMovie(title) {
  return [...(myData || []), ...(trendingData || []), ...popularData, ...(moviesData || [])].find((film) => film.title === title);
}

// Find the selected movie in their section
function findFavoriteMovieById(id, card) {
  if (card.closest("#top").length) {
    return myData.find((film) => film.id == id);
  }

  if (card.closest("#trending").length) {
    return trendingData.find((film) => film.id == id);
  }

  if (card.closest("#popular").length) {
    return popularData.find((film) => film.id == id);
  }

  if (card.closest("#movies").length) {
    return moviesData.find((film) => film.id == id);
  }
}

// Check if movie is saved
function isInWatchLater(film) {
  return watchLater.some((movie) => movie.title === film.title);
}

// Save movies in localStorage
function saveWatchLater() {
  localStorage.setItem("muvanaWatchLater", JSON.stringify(watchLater));
}

// Update Watch Later buttons
function updateWatchLaterButtons() {
  let sections = [
    { name: "#top", data: myData },
    { name: "#trending", data: trendingData },
    { name: "#popular", data: popularData },
    { name: "#movies", data: moviesData },
  ];

  sections.forEach(function (section) {
    $(section.name + " [data-film-id]").each(function () {
      let card = $(this);
      let id = card.attr("data-film-id");
      let film = section.data.find((movie) => movie.id == id);

      let saved = isInWatchLater(film);
      let button = card.find(".latter, .actions button:first-child, .icons .fa-bookmark, .watch-btn");

      button.toggleClass("saved", saved);
      button.attr("title", saved ? "Saved to Watch Later" : "Add to Watch Later");
      button.attr("aria-label", saved ? "Saved to Watch Later" : "Add to Watch Later");
    });
  });

  // Update movie details popup button
  let title = $("#filmsInfo .popup-title").text();
  let film = findFavoriteMovie(title);

  if (film) {
    let saved = isInWatchLater(film);
    let button = $("#filmsInfo .popup-watchlist");

    button.toggleClass("saved", saved);
    button.find("span").text(saved ? "Saved to Watch Later ✓" : "Watch Later");
  }
}

// Display Watch Later movies
function showWatchLater() {
  let content = $('.popup[data-popup-name="watchLetter"] .content');

  content.empty();

  if (watchLater.length === 0) {
    content.html(`
      <div class="empty-favorites">
        <i class="fa-regular fa-clock"></i>
        <h3>No Movies Yet</h3>
        <p>Add movies you want to watch later.</p>
      </div>
    `);
    return;
  }

  watchLater.forEach(function (film) {
    content.append(`
      <div class="col-lg-3 col-md-4 col-6">
        <div class="item">
          <img src="${film.film}" class="img-fluid" alt="${film.title}">
          <footer>
            <h3>${film.title.length > 15 ? film.title.slice(0, 15) + "..." : film.title}</h3>
            <p class="date">${film.date || ""}</p>
          </footer>
        </div>
      </div>
    `);
  });
}
