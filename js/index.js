/*-------------------------------------------------select elements-----------------------------------------------*/
let current = 2,
  page = 0,
  popularPage = 0,
  popularData = [],
  currentMovies = [],
  favorites = JSON.parse(localStorage.getItem("muvanaFavorites")) || [],
  watchLater = JSON.parse(localStorage.getItem("muvanaWatchLater")) || [],
  savedTheme = localStorage.getItem("muvanaTheme");

((myData = []), (trendingData = []), (moviesData = []), (visibleMoviesCount = 24));

/*-----------------------------------------------switch form in login page--------------------------------------*/
switchForm(true);

/*------------------------------------------------switch by click on span---------------------------------------*/
$(".selection .login, .box.register .footer span").on("click", function () {
  switchForm(true);
});

/*----------------------------------------------switch by click on span-----------------------------------------*/
$(".selection .register, .signin .footer span").on("click", function () {
  switchForm(false);
});

/*-------------------------------------Register form(when i click on register)----------------------------------*/
$(".box.register .form > button").on("click", function () {
  let inputs = $(".box.register .form input");
  let user = {
    name: $(inputs[0]).val().trim(),
    email: $(inputs[1]).val().trim(),
    password: $(inputs[2]).val(),
  };

  if (!user.name || !user.email || !user.password) {
    showFillAlert();
    return;
  }

  localStorage.setItem("muvanaUser", JSON.stringify(user));
  $(".box.register .form input").val("");

  showSuccessAlert();

  switchForm(true); //AFTER I REGISTER OPEN LOGIN FORM
});

/*-----------------------------------------Login form(when i click on login)------------------------------------*/
$(".box.signin .form > button").on("click", function () {
  let inputs = $(".box.signin .form input");
  let email = $(inputs[0]).val().trim();
  let password = $(inputs[1]).val();

  if (email === "" || password === "") {
    showFillAlert();
    return;
  }

  let user = JSON.parse(localStorage.getItem("muvanaUser"));

  if (user && user.email === email && user.password === password) {
    Swal.fire({
      icon: "success",
      title: `Welcome, ${user.name}!`,
      text: "You have logged in successfully.",
      background: "#1a1c25",
      color: "#fff",
      showConfirmButton: true,
      confirmButtonText: "Continue",
      buttonsStyling: false,
      customClass: {
        popup: "muvana-alert",
        icon: "muvana-alert__icon",
        title: "muvana-alert__title",
        htmlContainer: "muvana-alert__text",
        confirmButton: "muvana-alert__button",
      },
    });
  } else {
    showLoginErrorAlert();
  }
});

/*------------------------------------------------trending indicators-------------------------------------------*/
$(".right").click(() => move(1));
$(".left").click(() => move(-1));

/*-----------------------------------------fire functions-------------------------------------------------------*/
getTopRatedData();
getTrendingData();
getPopularData();
getMoviesData();
showWatchLater();
updateWatchLaterButtons();
showFavorites();

/*-----------------------------------------open trailer-------------------------------------------------------*/
function openTrailer(trailer) {
  $("iframe#movieTrailer").attr("src", trailer);
  $("#watchPopup").addClass("show");
}

/*-----------------------------------------close trailer-------------------------------------------------------*/
function closeTrailer() {
  $("#watchPopup").removeClass("show");
}

/*-----------------------------------------close iframe icon----------------------------------------------------*/
$("#closeVideo").on("click", closeTrailer);

/*--------------------------------------close iframe popup on click on popup-------------------------------------*/
$("#watchPopup").on("click", function () {
  closeTrailer();
});

/*-------------------------------- Open movie trailer ------------------------------------------------------------*/

$(document).on("click", ".popup-trailer", function () {
  let trailer = $(this).data("trailer");

  openTrailer(trailer);
});

/*-----------------------------------------change active navbar link on scroll----------------------------------*/
$(window).on("scroll", function () {
  let currentSection = "";

  $("section").each(function () {
    let sectionTop = $(this).offset().top;

    if ($(window).scrollTop() >= sectionTop) {
      currentSection = $(this).attr("id");
    }
  });

  $(".navbar-links .nav-link").removeClass("active");

  $('.navbar-links .nav-link[href="#' + currentSection + '"]').addClass("active");
});

/* ------------------------------------next and prev arrow in popular---------------------------------------------*/
$("#nextPopular").click(() => moveSlider(1));
$("#prevPopular").click(() => moveSlider(-1));

moveSlider();

//search
$("#searchInput").on("keydown", function (e) {
  if (e.key !== "Enter") return;
  e.preventDefault();

  let value = $(this).val().trim().toLowerCase();
  let movie = moviesData.find((film) => film.title.trim().toLowerCase() === value);

  if (!movie) {
    openPopup("not-found");
    return;
  }

  currentMovies = moviesData;
  visibleMoviesCount = moviesData.length;
  showMovies(currentMovies);

  let card = $(`#movies .movie-cart[data-film-id="${movie.id}"]`);

  if (card.length) {
    card.addClass("movie-highlight");

    $("html, body").animate({ scrollTop: card.offset().top - 120 }, 800);

    $(this).val("");
  }
});

//stop propagation
$(".popup .box").on("click", function (e) {
  e.stopPropagation();
});

// Add or remove favorite from any movie card
$(document).on("click", "#top .heart, #trending .favorite, #popular .icons .fa-heart, #movies .favorite-btn", function (e) {
  e.preventDefault();
  e.stopPropagation();

  let card = $(this).closest("[data-film-id]");
  let id = card.attr("data-film-id");
  let film = findFavoriteMovieById(id, card);

  if (film) {
    toggleFavorite(film);
  }
});

// Add or remove favorite from movie details popup
$(document).on("click", "#filmsInfo .popup-favorite", function (e) {
  e.preventDefault();

  let title = $("#filmsInfo .popup-title").text();
  let film = findFavoriteMovie(title);

  if (film) {
    toggleFavorite(film);
  }
});

// Remove a movie from the favorites popup
$(document).on("click", ".remove-favorite", function (e) {
  e.preventDefault();
  e.stopPropagation();

  let title = $(this).attr("data-title");

  favorites = favorites.filter((film) => film.title !== title);

  saveFavorites();
  showFavorites();
  updateFavoriteIcons();
});

// Add and remove movies from Watch Later
$(document).on("click", "#top .latter, #trending .actions button:first-child, #popular .icons .fa-bookmark, #movies .watch-btn, #filmsInfo .popup-watchlist", function (e) {
  e.preventDefault();
  e.stopPropagation();

  let button = $(this);
  let card = button.closest("[data-film-id]");
  let film;

  if (card.length) {
    film = findFavoriteMovieById(card.attr("data-film-id"), card);
  } else {
    film = findFavoriteMovie($("#filmsInfo .popup-title").text());
  }

  if (isInWatchLater(film)) {
    watchLater = watchLater.filter((movie) => movie.title !== film.title);
  } else {
    watchLater.push({ ...film });
  }

  saveWatchLater();
  showWatchLater();
  updateWatchLaterButtons();
});

// Remove movie from Watch Later popup
$(document).on("click", ".remove-watch", function (e) {
  e.preventDefault();
  e.stopPropagation();

  let title = $(this).attr("data-title");

  watchLater = watchLater.filter((movie) => movie.title !== title);

  saveWatchLater();
  showWatchLater();
  updateWatchLaterButtons();
});

/*loading page */
$(window).on("load", function () {
  setTimeout(function () {
    $(".loading-page").addClass("hide");
  }, 2000);
});

// Change Theme
if (savedTheme === "light") {
  $("body#login-page").addClass("white-theme");
  $("#main-page").addClass("white-theme");
}

$("#themeButton").on("click", function () {
  $("body#login-page").toggleClass("white-theme");
  $("#main-page").toggleClass("white-theme");

  let isLight = $("body#login-page").hasClass("white-theme") || $("#main-page").hasClass("white-theme");

  localStorage.setItem("muvanaTheme", isLight ? "light" : "dark");
});
