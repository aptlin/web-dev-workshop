function toggleWarning(shouldHide) {
  const searchWarning = document.getElementById("search-warning");
  searchWarning.classList.toggle("is-hidden", shouldHide);
}

function fetchTrendingGifs(apiKey) {
  const searchQuery = document.getElementById("search-item").value;
  const searchURL =
    `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=` + searchQuery;
  if (searchQuery.length === 0) {
    toggleWarning(false);
  }
  const searchResults = document.getElementById("search-results");
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }
  fetch(searchURL)
    .then(data => data.json())
    .then(results => {
      console.log(results);
      if (results.data.length === 0) {
        toggleWarning(false);
      } else {
        toggleWarning(true);
        // <div class="column is-one-quarter-desktop is-half-tablet">
        //   <div class="card">
        //     <div class="card-image">
        //       <figure class="image is-3by2">
        //         <img src="https://unsplash.it/300/200/?random&pic=1" alt="" />
        //       </figure>
        //     </div>
        //   </div>
        // </div>
        for (const result of results.data) {
          const column = document.createElement("div");
          column.className = "column is-one-quarter-desktop is-half-tablet";
          const card = document.createElement("div");
          card.className = "card";
          const cardImage = document.createElement("div");
          cardImage.className = "card-image";
          const figure = document.createElement("figure");
          figure.className = "image is-3by2";
          const image = document.createElement("img");
          image.alt = result.title;
          image.src = result.images.fixed_width.url;
          figure.appendChild(image);
          cardImage.appendChild(figure);
          card.appendChild(cardImage);
          column.appendChild(card);
          searchResults.appendChild(column);
        }
      }
    });
}
