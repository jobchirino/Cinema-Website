const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a798aa4642msh66d23608d2ef176p1aa796jsn34a3393a2805'
	}
};

let urlPrincipal = 'https://streaming-availability.p.rapidapi.com/shows/search/'
let parametros   = 'filters?country=us&series_granularity=show&order_direction=asc&order_by=original_title&genres_relation=and&output_language=en&show_'
let type         = 'type=movie'
let url          = ''
function obtenerDatosPeliculas(){
    url = urlPrincipal + parametros + type
    return fetch(url, options)
        .then(res => res.json())
}
const mostrarPeliculas = obtenerDatosPeliculas()

function obtenerDatosSeries(){
    type = 'type=series'
    url = urlPrincipal + parametros + type
    return fetch(url, options)
        .then(res => res.json())
}
const mostrarSeries = obtenerDatosSeries()

function buscarPorGenero(uType, uGen, yMax, yMin){
    url = urlPrincipal + `filters?country=us&year_max=${yMax.value}&series_granularity=show${uGen}&order_direction=asc&order_by=original_title&year_min=${yMin.value}&genres_relation=or&output_language=en&show_type=${uType}`;
    return fetch(url, options)
    .then(res => res.json())
}

function buscarPorTitulo(input){
    url = urlPrincipal  + `title?country=us&title=${input.value}&series_granularity=show`;
    return fetch(url, options)
    .then(res => res.json())
}