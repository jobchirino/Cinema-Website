const urlQueryString = window.location.href
const searchParams   = new URL(urlQueryString).searchParams
const entries        = new URLSearchParams(searchParams).entries()
const array          = Array.from(entries)

let titulo      = document.querySelector('h1')
let seasonCount = document.getElementById('season')
let capCount    = document.getElementById('caps')
let director    = document.getElementById('director')
let stars       = document.getElementById('stars')
let generos     = document.getElementById('genres')
let poster      = document.getElementById('poster')
let background  = document.getElementById('info-principal')
let sinopsis    = document.getElementById('sinopsis')
let firstYear   = document.getElementById('first-year')
let lastYear    = document.getElementById('last-year')
let streaming   = document.getElementById('streaming')
let rating      = document.getElementById('rating')
let link        = document.querySelector('a')

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a798aa4642msh66d23608d2ef176p1aa796jsn34a3393a2805'
	}
};

function obtenerDatos(){
    url = `https://streaming-availability.p.rapidapi.com/shows/${array[0][1]}?series_granularity=season&output_language=en`;
    return fetch(url, options)
    .then((res => res.json())) 
}

const mostrarDatos = obtenerDatos()
mostrarDatos.then(datos => {
    let data = datos
    poster.setAttribute('src', `${data.imageSet.verticalPoster.w240}`)
    background.style.backgroundImage = `url(${data.imageSet.horizontalBackdrop.w720})`
    titulo.innerHTML = `${data.title}`
    stars.innerHTML  = `${data.cast[0]}, ${data.cast[1]}, ${data.cast[2]}`

    for(let i = 0; i < data.genres.length; i++){
        if(i == data.genres.length - 1){
            generos.innerHTML += `${data.genres[i].name}.`
            break
        }
        generos.innerHTML += `${data.genres[i].name}, `
    }
    
   
    sinopsis.innerHTML = `${data.overview}`
    rating.innerHTML   = `Rating: ${data.rating}`
    streaming.innerHTML = `Disponible en: ${data.streamingOptions.us[0].service.name}`
    

    if(data.showType === 'series'){
        seasonCount.innerHTML = `${data.seasonCount} Seasons`
        capCount.innerHTML = `${data.episodeCount} Episodes`
        firstYear.innerHTML = `Año de estreno: ${data.firstAirYear}`
        lastYear.innerHTML = `Ultimo año de emisión: ${data.lastAirYear}`
        if(data.streamingOptions.us[0].link){
            link.setAttribute('href', `${data.streamingOptions.us[0].link}`)
        }else{
            link.setAttribute('href', `${data.streamingOptions.us[0].service.videoLink}`)
        }

        for(let i = 0; i < data.creators.length; i++){
            if(i == data.creators.length - 1){
                director.innerHTML += `${data.creators[i]}.`
                break
            }
            director.innerHTML += `${data.creators[i]}, `
        }

    }else{
        for(let i = 0; i < data.directors.length; i++){
            if(i === data.directors.length - 1){
                director.innerHTML += `${data.directors[i]}.`
                break
            }
            director.innerHTML += `${data.directors[i]}, `
        }
        seasonCount.innerHTML = `${data.runtime} min`
        firstYear.innerHTML   =  `Año de estreno: ${data.releaseYear}`
        link.setAttribute('href', `${data.streamingOptions.us[0].service.link}`)
    }

    if(titulo.innerText.length > 13){
        titulo.classList.add('large')
    }
})