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

function generateMovie(endpoint){
   return fetch( endpoint, options)
    .then(function(response){
        if(!response.ok){
            throw new Error(`HTTP Request ${response}`)
        }else{
            return response.json()
        }
    })
    .catch(function(error){
        console.log(error)
    })
}
generate.addEventListener("click",function(event){
    event.preventDefault()
    const query=input.value
    generateMovie(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`).then(function(result){
        result.results.map(movie => {
          const container=document.createElement("div")
          const header=document.createElement("h1")
          const description=document.createElement("p")
          const image=document.createElement("img")
          image.src = "https://media.themoviedb.org/t/p/w94_and_h141_bestv2/" + movie.poster_path
          header.textContent=movie.title
          description.textContent=movie.overview
          container.appendChild(header)
          container.appendChild(description)
          container.appendChild(image)
          container.classList.add("container")
          results.appendChild(container)
        })

    })
})