// Create a front-end application that shows information about movies by connecting to The Movie Database API.
// The application will show information about the following types of movies: Now playing, Popular, Top rated, Upcoming.
// Responsiveness must be enforced.

import {apiKey} from "./api.js"
const baseUrl = "https://api.themoviedb.org/3/movie/"


// Iterate over each button and attach event listeners
document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
        // Get the endpoint which is the button's `id`
        const endpoint = button.id;
        fetchMovies(endpoint); // Call fetchMovies with the appropriate endpoint byt the button that is clicked
    });
});


// Automatically load the "Now Playing" movies on page load
window.onload = function () {
    fetchMovies("now_playing");
};


// Function to handle movie fetching and updating the UI
function fetchMovies(endpoint) {
    // Add 'active' class to the clicked button and remove it from others
    document.querySelectorAll("button").forEach((btn) => {
        btn.classList.remove("active");
    });
    document.getElementById(endpoint).classList.add("active");

    // Clear previous movies from the container
    document.getElementById("movies_container").innerHTML = "";

    // Fetch movies from the API and creates the item(s)
    fetch(baseUrl + endpoint + apiKey)
        .then((response) => response.json())
        .then((data) => {
            data.results.forEach((theChosenGenre) => {
                const movieTitleText = document.createTextNode(theChosenGenre.title);
                const movieTitle = document.createElement("h2");
                movieTitle.append(movieTitleText);

                const movieOverviewText = document.createTextNode(theChosenGenre.overview);
                const movieOverview = document.createElement("p");
                movieOverview.append(movieOverviewText);

                const originalTitleText = document.createTextNode(`Original title: ${theChosenGenre.original_title}`);
                const originalTitle = document.createElement("p");
                originalTitle.append(originalTitleText);

                const releaseDateText = document.createTextNode(`Release date: ${theChosenGenre.release_date}`);
                const releaseDate = document.createElement("p");
                releaseDate.append(releaseDateText);

                const theSpan = document.createElement("span");
                theSpan.append(movieOverview, originalTitle, releaseDate);

                const imageElement = document.createElement("img");
                imageElement.setAttribute("src", "https://image.tmdb.org/t/p/w300/" + theChosenGenre.poster_path);

                const theDiv = document.createElement("div");
                theDiv.append(imageElement, theSpan);

                const movieArticle = document.createElement("article");
                movieArticle.append(movieTitle, theDiv);

                document.getElementById("movies_container").append(movieArticle);
            });
        });
}















// #################################### OLD SOLUTION #########################################
// import {apiKey} from "./api.js"

// const baseUrl = "https://api.themoviedb.org/3/movie/"

// // Jeg benytter dette array til at loop' gennem det and creates an item for each objects.
// const arrayWithEndpoints = [
//     {
//         endpoint: "upcoming"
//     },
//     {
//         endpoint: "popular" 
//     },
//     {
//         endpoint: "top_rated"
//     },
//     {
//         endpoint: "now_playing"
//     }
// ];

// arrayWithEndpoints.forEach(function(item){
//     //----------------------makes sure the clicked button got the .active or not--------------------------
//     const button = document.getElementById(item.endpoint); // Get the button element for this item
//     button.addEventListener("click", function() {
//         // Remove the 'active' class from all buttons
//         document.querySelectorAll("button").forEach(btn => {
//             btn.classList.remove('active');
//         });

//         // Add 'active' class to the clicked button
//         button.classList.add('active');
//     })
//     //---------------------------------------------------------------------------------------------

//     // Sørger for at "Now playing" bliver vist ved window-load
//     window.onload = fetchMovies;

//     // The content is fetched and shown when a specifik nav-button is clicked
//     document.getElementById(item.endpoint).addEventListener("click", fetchMovies);
//     function fetchMovies(){
//         button.classList.add('active'); // Sikrer underline på nav-item ved window.load
//         document.getElementById("movies_container").innerHTML = ""; // Clear; before some new content is appended.
//         fetch(baseUrl + item.endpoint + apiKey)
//         .then(response => response.json())
//         .then(data => {
//             // "results" comes from the json. Because the array-name is results.
//             data.results.forEach( (theChosenGenre) => {
//                 // Then the textnodes and elements are created and appended to their right places and to the DOM
//                 const movieTitleText = document.createTextNode(theChosenGenre.title);
//                 const movieTitle = document.createElement("h2");
//                 movieTitle.append(movieTitleText);
//                 const movieOverviewText = document.createTextNode(theChosenGenre.overview);
//                 const movieOverview = document.createElement("p");
//                 movieOverview.append(movieOverviewText);
//                 const originalTitleText = document.createTextNode(`Original title: ${theChosenGenre.original_title}`);
//                 const originalTitle = document.createElement("p");
//                 originalTitle.append(originalTitleText);
//                 const releaseDateText = document.createTextNode(`Release date: ${theChosenGenre.release_date}`);
//                 const releaseDate = document.createElement("p");
//                 releaseDate.append(releaseDateText);
//                 const theSpan = document.createElement("span")
//                 theSpan.append(movieOverview, originalTitle, releaseDate)
//                 const imageElement = document.createElement("img");
//                 imageElement.setAttribute('src', "https://image.tmdb.org/t/p/w300/" + theChosenGenre.poster_path)
//                 const theDiv = document.createElement("div");
//                 theDiv.append(imageElement, theSpan)
//                 // The article is made and all of the elements above are appended to it
//                 const movieArticle = document.createElement("article");
//                 movieArticle.append(movieTitle, theDiv);
//                 // The article is appended to the movies_container
//                 document.getElementById("movies_container").append(movieArticle);
//             })
//     })
// }
// })
