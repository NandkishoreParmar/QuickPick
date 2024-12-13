document.addEventListener("DOMContentLoaded", async () => {
  const movieListElement = document.getElementById('movie-list');

  const response = await fetch('http://localhost:3000/movies');
  const movies = await response.json();

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <h2>${movie.title}</h2>
      <p>${movie.description}</p>
      <p>Release Year: ${movie.releaseYear}</p>
      <p>Watched: <span id="watched-${movie._id}">${movie.watched ? 'Yes' : 'No'}</span></p>
      <button onclick="toggleWatchedStatus('${movie._id}')">Toggle Watched Status</button>
    `;
    movieListElement.appendChild(movieElement);
  });
});

async function toggleWatchedStatus(id) {
  const watched = document.getElementById(`watched-${id}`).textContent === 'No';
  const response = await fetch(`http://localhost:3000/movies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ watched })
  });
  const updatedMovie = await response.json();
  document.getElementById(`watched-${updatedMovie._id}`).textContent = updatedMovie.watched ? 'Yes' : 'No';
}
