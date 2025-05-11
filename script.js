const input=document.getElementById("movie")
const results=document.querySelector("p")
const generate=document.querySelector("button")

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWVlZmExMDFkMjZkNTA3Mjk1ZmE5Y2QxZjMyM2Q1YSIsIm5iZiI6MS43NDY3ODAxNDIxOTgwMDAyZSs5LCJzdWIiOiI2ODFkYmZlZTkwODQxNjQxODRiMWNjZmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.guW0ObZ2k4X6brux0a56pJ4BnYGNM7i6lsUAGH3WkjA'
    }
  };

function generateMovie(url){
    return fetch(url, options)
    .then(function(response){
        if(!response.ok){
            throw new Error(`HTTP Request ${response.status}`)
        }else{
            return response.json()
        }
    })
    .catch(err => console.error(err));
}
generate.addEventListener("click",function(event){
    event.preventDefault()
    const query=input.value
    generateMovie(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
    .then(function(response){
        //console.log(response)
       response.results.map(movie => {
        const container=document.createElement("div")
        const title=document.createElement("h1")
        const description=document.createElement("div")
        const date=document.createElement("p")
        const image=document.createElement("img")
        title.textContent=movie.title
        image.src = movie.poster_path
        ? "https://image.tmdb.org/t/p/w200" + movie.poster_path
        : "https://via.placeholder.com/200x300?text=No+Image";

        description.textContent=movie.overview
        date.textContent=` Release Date : ${movie.release_date}`
        container.classList.add("container");
        title.classList.add("title");
        description.classList.add("description");
        date.classList.add("date");
        image.classList.add("poster");
        container.appendChild(title)
        container.appendChild(image)
        container.appendChild(description)
        container.appendChild(date)
        results.appendChild(container)


       })
    })
})