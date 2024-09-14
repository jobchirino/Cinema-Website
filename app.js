let openMenu  = document.getElementById('open-menu')
let closeMenu = document.getElementById('close-menu')
let dropdown  = document.getElementById('dropdown')
let tarjetas  = document.querySelectorAll('.tarjeta')
let peliculas = document.getElementById('movies')
let series    = document.getElementById('series')
let generos   = document.querySelectorAll('.genre')
let urlGenero = '&genres=' 
let urlType   = 'movie'
let buscar    = document.getElementById('buscar')
const yearMin = document.getElementById('yearMin')
const yearMax = document.getElementById('yearMax')
let btnBuscarPorTitulo   = document.getElementById('enviar')
let inputBuscarPorTitulo = document.getElementById('camp')

function imprimir(data){
    let i = 0
    data.forEach(() => {
        tarjetas[i].innerHTML = `<img src="${data[i].imageSet.verticalPoster.w240}"/>
                                 <button class="toinfo" data-id="${data[i].imdbId}">
                                    <p data-id="${data[i].imdbId}">${data[i].title}</p>
                                 </button>`
        i++
    })
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarPeliculas.then(datos => {
        let datosAImprimir = datos.shows
        let data = datos
        if(data.message){
            alert('Limite de consultas a la API excedido')
        }
        imprimir(datosAImprimir)
        let button = document.querySelectorAll('.toinfo')
        toPageInfo(button)        
    })
})


series.addEventListener('click', (e) => {
    e.stopPropagation()
    series.classList.add('active')
    peliculas.classList.add('active')
    urlType   = 'series'
    deleteFilters()
    mostrarSeries.then(datos => {
        let datosAImprimir = datos.shows
        imprimir(datosAImprimir)
        let buttonSeries = document.querySelectorAll('.toinfo')
        toPageInfo(buttonSeries)
        titleLarge()
    })
})

peliculas.addEventListener('click', (e) => {
    e.stopPropagation()
    series.classList.remove('active')
    peliculas.classList.remove('active')
    urlType   = 'movie'
    deleteFilters()
    mostrarPeliculas.then(datos => {
        let datosAImprimir = datos.shows
        imprimir(datosAImprimir)
        let buttonPeliculas = document.querySelectorAll('.toinfo')
        toPageInfo(buttonPeliculas)
    })
})

buscar.addEventListener('click', () => {
    if(urlGenero[urlGenero.length - 1] !== '='){
        dropdown.classList.remove('open')
        const mostrarFiltrado = buscarPorGenero(urlType, urlGenero, yearMax, yearMin)
        mostrarFiltrado.then(datos => {
            let datosAImprimir = datos.shows
            imprimir(datosAImprimir)
            let buttonPeliculas = document.querySelectorAll('.toinfo')
            toPageInfo(buttonPeliculas)
        })
    }
})

btnBuscarPorTitulo.addEventListener('click', (e) => {
    e.preventDefault()
    const regularExpression = /^\w+[^_]/
    if(regularExpression.test(inputBuscarPorTitulo.value)){
        tarjetas.forEach((element) => {
            element.innerHTML = ``
        })
        const mostrarBusqueda = buscarPorTitulo(inputBuscarPorTitulo)
        mostrarBusqueda.then(datos => {
            let datosAimprimir = datos
            imprimir(datosAimprimir)
            let botonBuscarPorTitulo = document.querySelectorAll('.toinfo')
            toPageInfo(botonBuscarPorTitulo)
            deleteFilters()
        })
        inputBuscarPorTitulo.value = ""
        inputBuscarPorTitulo.classList.remove('error')
    }else{
        inputBuscarPorTitulo.classList.add('error')
    }
})

openMenu.addEventListener('click', (e) => {
    e.stopPropagation()
    dropdown.classList.add('open')
})

closeMenu.addEventListener('click', (e) => {
    e.stopPropagation()
    dropdown.classList.remove('open')
})

function deleteFilters (){
    generos.forEach((elementos) => {
        elementos.classList.remove('active')
    })
}

function incrementMin(){
    if(parseInt(yearMin.value) < 2024){
        yearMin.value = parseInt(yearMin.value) + 1
    }
}

function incrementMax(){
    if(parseInt(yearMax.value) < 2024){
        yearMax.value = parseInt(yearMax.value) + 1
    }
}

function decrementMin(){
    if(parseInt(yearMin.value) > 1980){
        yearMin.value = parseInt(yearMin.value) - 1
    }
}

function decrementMax(){
    if(parseInt(yearMax.value) > 1980){
        yearMax.value = parseInt(yearMax.value) - 1
    }
}

function titleLarge(){
    let titlePar  = document.querySelectorAll('.tarjeta button')
    titlePar.forEach((element) => {
    if(element.innerText.length > 15 && !element.innerText.includes(' ')){
        element.classList.add('large')
    }
        
})
}

function toPageInfo (boton){
    const urlInfo = './info.html?'
    boton.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.stopPropagation()
            let objId     = {
                id: `${e.target.dataset.id}`
            }
            let searchParams = new URLSearchParams(objId)
            let queryString  = searchParams.toString()
            window.location.href = urlInfo + queryString
        })
    })
}

generos.forEach((elementos) => {
    elementos.addEventListener('click', (e) => {
        elementos.classList.toggle('active')
        if(elementos.classList.contains('active')){
            if(urlGenero[urlGenero.length - 1] === '='){
                urlGenero += e.target.id
            }else{
                urlGenero += '%2C'
                urlGenero += e.target.id
            }

        }else{
            if(urlGenero.includes(`${e.target.id}%2C`)){
                urlGenero = urlGenero.replace(`${e.target.id}%2C`, '')
            }else if(urlGenero.includes(`%2C${e.target.id}`)){
                urlGenero = urlGenero.replace(`%2C${e.target.id}`, '')
            }else{
                urlGenero = urlGenero.replace(`${e.target.id}`, '')
            }
            
        }
    })
})