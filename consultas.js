const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a798aa4642msh66d23608d2ef176p1aa796jsn34a3393a2805'
	}
};

function mostrarPeliculas(){
    let url = 'https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&series_granularity=show&order_direction=asc&order_by=original_title&genres_relation=and&output_language=en&show_type=movie';
    fetch(url, options)
        .then((respuesta) => {
            const promesa = respuesta.json()
            promesa
                .then((datos) => {
                    let data = datos.shows 
                    for(let i = 0; i < data.length; i++){
                        tarjetas[i].innerHTML = `<img src="${data[i].imageSet.verticalPoster.w240}"/>
                                                 <button class="toinfo" data-id="${data[i].imdbId}">
                                                     <p data-id="${data[i].imdbId}">${data[i].title}</p>
                                                 </button>
                                                 <p>${data[i].genres[0].name}</p>`

                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            })
            .catch((error) => {
                console.log(error)
            })
}

function mostrarSeries(){
    url = 'https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&series_granularity=show&order_direction=asc&order_by=original_title&genres_relation=and&output_language=en&show_type=series';
    fetch(url, options)
    .then((respuesta) => {
        const promesa = respuesta.json()
        promesa
            .then((datos) => {
                let data = datos.shows 
                for(let i = 0; i < data.length; i++){
                    tarjetas[i].innerHTML = ''
                }
                
                for(let i = 0; i < data.length; i++){
                    tarjetas[i].innerHTML = `<img src="${data[i].imageSet.verticalPoster.w240}"/>
                                             <button class="toinfo" data-id="${data[i].imdbId}">
                                                <p data-id="${data[i].imdbId}">${data[i].title}</p>
                                             </button>
                                             <p>${data[i].genres[0].name}</p>`  

                }
               
            })
            .catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
            console.log(error)
        })

}


function buscarPorGenero(){
    url = `https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&year_max=${yearMax.value}&series_granularity=show${urlGenero}&order_direction=asc&order_by=original_title&year_min=${yearMin.value}&genres_relation=or&output_language=en&show_type=${urlType}`;
    fetch(url, options)
        .then((respuesta) => {
        const promesa = respuesta.json()
        promesa
            .then((datos) => {
                let data = datos.shows 
                for(let i = 0; i < data.length; i++){
                    tarjetas[i].innerHTML = ''
                }
                console.log(data)
                for(let i = 0; i < data.length; i++){
                    tarjetas[i].innerHTML = `<img src="${data[i].imageSet.verticalPoster.w240}"/>
                                         <button class="toinfo" data-id="${data[i].imdbId}">
                                            <p data-id="${data[i].imdbId}">${data[i].title}</p>
                                         </button>
                                         <p>${data[i].genres[0].name}</p>`

                }
            })
            .catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

function buscarPorTitulo(){
    url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=us&title=${inputBuscarPorTitulo.value}&series_granularity=show`;
    fetch(url, options)
        .then((respuesta) => {
        const promesa = respuesta.json()
        promesa
            .then((datos) => {
                let data = datos
                for(let i = 0; i < data.length; i++){
                    tarjetas[i].innerHTML = ''
                }
                for(let i = 0; i < data.length; i++){
                    tarjetas[i].innerHTML = `<img src="${data[i].imageSet.verticalPoster.w240}"/>
                                         <button class="toinfo" data-id="${data[i].imdbId}">
                                            <p data-id="${data[i].imdbId}">${data[i].title}</p>
                                         </button>
                                         <p>${data[i].genres[0].name}</p>`

                }
            })
            .catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
            console.log(error)
        })
}
