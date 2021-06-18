// Getting access to Modal add-modal - It can be found in index.html with id: add-modal line 14
//WAY 1:
const addMovieModal = document.getElementById("add-modal");
// //WAY 2:
// const addMovieModal = document.querySelector('#add-modal');
// //WAY 3:
// const addMovieModal = document.body.children[1];
const addBackdropModal = document.body.children[0];

const cancelButton = addMovieModal.querySelector(".btn--passive");
const addButton = cancelButton.nextElementSibling;

// Accessing all User Input Sections
// Way 1
const userInput = addMovieModal.querySelectorAll("input");
// // Way 2
// const userInput = addMovieModal.getElementsByTagName('input')

//Storing Movies
const movies = [];
let movieCount = 0;

//Accessing Entry text section
const entryTextSection = document.getElementById("entry-text");

//Accessing Delete Modal
const deleteMovieModal = document.getElementById("delete-modal");
    //Access No Button
  const doNotDelete = deleteMovieModal.querySelector(".btn--passive");
  //Access Yes Button
  const deleteMovie = deleteMovieModal.querySelector(".btn--danger");
//  FUNCTIONS

const deleteBackdrophandler = () => {
    removeDeleteWarning();
} 

const removeDeleteWarning = () => {
    deleteMovieModal.classList.remove("visible");
}

const warningHandler = (id) => {
  deleteMovieModal.classList.add("visible");
  console.log(id);

  doNotDelete.addEventListener('click', removeDeleteWarning);
  deleteMovie.addEventListener('click', deleteMoviehandler.bind(null, id));
};


const deleteMoviehandler = (movieId) => {
  console.log(movieId)
  
  const movieListInitializer = document.getElementById("movie-list");
  movieListInitializer.children[movieId].remove();
  movies.splice(movieId, 1);
  console.log(movies);
  removeDeleteWarning();
  updateUI();
};

const renderMovieList = (id, title, imageURL, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageURL}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 STARS</p>
    </div>
    `;

  const movieListInitializer = document.getElementById("movie-list"); //check index.html
  movieListInitializer.append(newMovieElement);

  newMovieElement.addEventListener("click", warningHandler.bind(null, id));
};

const updateUI = () => {
  if (movies.length === 0) {
    //Remove the entry text section box
    entryTextSection.style.display = "block";
  } else {
    //Add the entry text section box
    entryTextSection.style.display = "none";
  }
};

const toggleBackdrop = () => {
  addBackdropModal.classList.toggle("visible");
  clearInputSection();
};

const toggleMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  //Make background dark and fix - backdrop
  toggleBackdrop();
  
};

//Dismiss when clicked on screen
const backdropHandler = () => {
  toggleMovieModal();
};

const cancelButtonHandler = () => {
  toggleMovieModal();
};

const clearInputSection = () => {
  //   //WAY 1
  //   userInput[0].value = "";
  //   userInput[1].value = "";
  //   userInput[2].value = "";
  //WAY 2
  for (const input of userInput) {
    input.value = "";
  }
};

const addMovieButtonHandler = () => {
  const userInputMovieTitle = userInput[0].value;
  const userInputImageURL = userInput[1].value;
  const userInputMovieRating = userInput[2].value;

  //Checking userinput is not an empty string
  if (
    userInputMovieTitle.trim() === "" ||
    userInputImageURL.trim() === "" ||
    userInputMovieRating.trim() === "" ||
    +userInputMovieRating < 1 ||
    +userInputMovieRating > 5
  ) {
    alert("Invalid User Input !");
    return;
  }

  const newMovie = {
    id: movieCount.toString(),
    title: userInputMovieTitle,
    imageURL: userInputImageURL,
    rating: userInputMovieRating,
  };

  movies.push(newMovie);
  movieCount++;
  console.log(movies);
  toggleMovieModal();
  clearInputSection();
  renderMovieList(
    newMovie.id,
    newMovie.title,
    newMovie.imageURL,
    newMovie.rating
  );
  updateUI();
};

//Getting access to Add Movie Button - HTML Line 49
//This works only when the last element is the one you want to access
const startAddMovieButton = document.querySelector("header").lastElementChild;

startAddMovieButton.addEventListener("click", toggleMovieModal);
addBackdropModal.addEventListener("click", backdropHandler);
cancelButton.addEventListener("click", cancelButtonHandler);
addButton.addEventListener("click", addMovieButtonHandler);
