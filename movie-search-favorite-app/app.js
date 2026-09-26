// 1. Select DOM Elements
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const moviesContainer = document.querySelector('#movies-container');

// Note: Get your free API key from https://www.omdbapi.com/apikey.aspx
const API_KEY = 'your_omdb_api_key_here'; 

// 2. Add Click Event Listener for Search
searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  
  if (!query) {
    moviesContainer.innerHTML = `<p class="message">Please enter a movie title to search.</p>`;
    return;
  }

  try {
    // Show loading indicator
    moviesContainer.innerHTML = `<p class="message">Searching movies...</p>`;

    // Fetch data from OMDb API using query parameter
    const response = await fetch(`https://www.omdbapi.com/?apikey=${'414659f8'}&s=${query}`);
    const data = await response.json();

    // Check if movies were found
    if (data.Response === "True") {
      renderMovies(data.Search);
    } else {
      moviesContainer.innerHTML = `<p class="message">No movies found for "${query}". Try another search!</p>`;
    }

  } catch (error) {
    moviesContainer.innerHTML = `<p class="message">Failed to fetch movies. Check your internet connection.</p>`;
    console.error("API Error:", error);
  }
});

// 3. Render Movie Cards to the DOM
function renderMovies(movies) {
  moviesContainer.innerHTML = ''; // Clear previous search results

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    // Handle movies that do not have a poster image available
    const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";

    card.innerHTML = `
      <img src="${poster}" alt="${movie.Title}">
      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </div>
    `;

    moviesContainer.appendChild(card);
  });
}