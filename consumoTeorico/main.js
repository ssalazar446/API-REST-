
/*
const url = 'https://api.thecatapi.com/v1/images/search' 
fetch(url) //promesa
.then(res => res.json()) //se resuelve con then y se convierte a formato JSON
.then(data => {
    const img = document.querySelector('img') //capturando la etiqueta img
    img.src = data[0].url // a la propiedad src se le asigna la imagen
}) */

/* como hacerlo con async - await */

const urlRandom = 'https://api.thecatapi.com/v1/images/search'
const limit = 'limit=10'
const apiKey =  'api_key=live_6NV6I9mm8SV8zAqE4OvisVDEa0C6NdnuIUwv1Ps7FqprViAOvoPB0IsDlAErVcNJ'
const urlFavourite = 'https://api.thecatapi.com/v1/favourites'

const spanError = document.getElementById('error')

async function loadRandomMichis() {
        const res = await fetch(`${urlRandom}?${limit}&${apiKey}`) //se asigna en una variable la respuesta
        const data = await res.json() // La respuesta se convierte a json y se asigna a una variable data
        console.log(data);

        if(res.status !== 200){
            spanError.innerHTML = `Error al cargar las imagenes ${res.status}`
        } else {
            const img1 = document.getElementById('img1')//capturando el id la etiqueta img
            const img2 = document.getElementById('img2')
    
            img1.src = data[0].url// a la propiedad src se le asigna la imagen -- el [0] es porque la API devuelve un array
            img2.src = data[1].url
        }
    
    }

const inputButton = document.querySelector('input') // se captura el boton -- Aquí comienza todo
inputButton.addEventListener('click', loadRandomMichis) // se escucha el evento click y se manda a llamar la función


async function loadFavorteMichis() {
        const res = await fetch(`${urlFavourite}?${limit}&${apiKey}`)
        const data = await res.json() 
        console.log('Se cargaron los favoritos');
        
        console.log(data);
        if(res.status !== 200){
            spanError.innerHTML = `Error al cargar las imagenes ${res.status}`
        }
    }

async function saveFavoriteMichis(){
    const res = await fetch(`${urlFavourite}?${limit}&${apiKey}`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify (// JSON.stringify es para convertirlo y que se puede leer en cualquier lenguaje del backend
            { //aqui se especifica que imagen va a ser guardada en favoritos
                image_id: '3t7',
            }
        ) 
    })
    const data = await res.json() 

    console.log('Se guardo en favoritos');
    console.log(res);

    if(!res.ok && res.status !== 200){
        spanError.innerHTML = `Error al cargar las imagenes ${res.status}`
    }
}



loadRandomMichis() // Se llama la función para evitar de que cargue vacio la primera vez
loadFavorteMichis() // Se llama la función para evitar de que cargue vacio la primera vez