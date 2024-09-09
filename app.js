var openMenu  = document.getElementById('open-menu')
var closeMenu = document.getElementById('close-menu')
var dropdown  = document.getElementById('dropdown')
var tarjetas  = document.querySelectorAll('.tarjeta')
var peliculas = document.getElementById('movies')
var series    = document.getElementById('series')
var generos   = document.querySelectorAll('.genre')
var urlGenero = '&genres=' 
var urlType   = 'movie'
var buscar    = document.getElementById('buscar')
const yearMin = document.getElementById('yearMin')
const yearMax = document.getElementById('yearMax')
var btnBuscarPorTitulo   = document.getElementById('enviar')
var inputBuscarPorTitulo = document.getElementById('camp')

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

function toPageInfo (){
    const urlInfo = 'file:///C:/Users/maria/Desktop/Programaci%C3%B3n/Java%20Script/Cinema%20website/info.html?'
    let toinfo    = document.querySelectorAll('.toinfo')
    console.log(toinfo)
    toinfo.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.stopPropagation()
            let objId     = {
                id: `${e.target.dataset.id}`
            }
            console.log(e.target.dataset.id)
            let searchParams = new URLSearchParams(objId)
            let queryString  = searchParams.toString()
            window.location.href = urlInfo + queryString
            console.log('funcionando')
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
        console.log(urlGenero)
    })
})

document.addEventListener('DOMContentLoaded', () => {
    mostrarPeliculas()
    setTimeout(() => {
        titleLarge()
        toPageInfo()
    }, 2000)
})

peliculas.addEventListener('click', (e) => {
    e.stopPropagation()
    series.classList.remove('active')
    peliculas.classList.remove('active')
    urlType   = 'movie'
    mostrarPeliculas()
    deleteFilters()
    setTimeout(() => {
        titleLarge()
        toPageInfo()
    }, 2000)
})

series.addEventListener('click', (e) => {
    e.stopPropagation()
    series.classList.add('active')
    peliculas.classList.add('active')
    urlType   = 'series'
    mostrarSeries()
    deleteFilters()
    setTimeout(() => {
        titleLarge()
        toPageInfo()
    }, 2000)
})

buscar.addEventListener('click', () => {
    if(urlGenero[urlGenero.length - 1] !== '='){
        dropdown.classList.remove('open')
        buscarPorGenero()
        setTimeout(() => {
            titleLarge()
            toPageInfo()
        }, 2000)
    }
})

btnBuscarPorTitulo.addEventListener('click', (e) => {
    e.preventDefault()
    buscarPorTitulo()    
    setTimeout(() => {
        titleLarge()
        toPageInfo()
    }, 2000)
    inputBuscarPorTitulo.value = ""
})