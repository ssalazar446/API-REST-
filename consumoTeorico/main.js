
/*
const url = 'https://api.thecatapi.com/v1/images/search' 
fetch(url) //promesa
.then(res => res.json()) //se resuelve con then y se convierte a formato JSON
.then(data => {
    const img = document.querySelector('img') //capturando la etiqueta img
    img.src = data[0].url // a la propiedad src se le asigna la imagen
}) */

/* como hacerlo con async - await */

const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = 'live_6NV6I9mm8SV8zAqE4OvisVDEa0C6NdnuIUwv1Ps7FqprViAOvoPB0IsDlAErVcNJ' //aqui va el header

const urlRandom = 'https://api.thecatapi.com/v1/images/search'
const limit = 'limit=10'
const apiKey =  'api_key=live_6NV6I9mm8SV8zAqE4OvisVDEa0C6NdnuIUwv1Ps7FqprViAOvoPB0IsDlAErVcNJ'
const urlFavourite = 'https://api.thecatapi.com/v1/favourites'
const urlUpload = 'https://api.thecatapi.com/v1/images/upload'

const spanError = document.getElementById('error')

async function loadRandomMichis() {
        const res = await fetch(`${urlRandom}?${limit}&${apiKey}`) //se asigna en una variable la respuesta
        const data = await res.json() // La respuesta se convierte a json y se asigna a una variable data
        console.log(data);

        if(res.status !== 200){ //Si el status es diferente a 200
            spanError.innerHTML = `Error al cargar las imagenes ${res.status}`
        } else {
            const img1 = document.getElementById('img1')//capturando el id la etiqueta img
            const img2 = document.getElementById('img2')
            const btn1 = document.getElementById('btn1')
            const btn2 = document.getElementById('btn2')
    
            img1.src = data[0].url// a la propiedad src se le asigna la imagen -- el [0] es porque la API devuelve un array
            img2.src = data[1].url

            btn1.onclick = () => saveFavoriteMichi(data[0].id);
            btn2.onclick = () => saveFavoriteMichi(data[1].id);
        }
    
    }


async function loadFavorteMichis() {
        const res = await fetch(`${urlFavourite}`,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': 'live_6NV6I9mm8SV8zAqE4OvisVDEa0C6NdnuIUwv1Ps7FqprViAOvoPB0IsDlAErVcNJ',
                }
            }); //Aqui va la url de favoritos
        const data = await res.json() 
        console.log('Se cargaron los favoritos');        
        console.log(data);

        if(res.status !== 200){
            spanError.innerHTML = `Error al cargar las imagenes ${res.status}`
        } else {
            const section = document.getElementById('favorites')
            section.innerHTML = "";
            /* const h2 = document.createElement('h2')
            const h2Text = document.createTextNode('Favoritos')
            h2.appendChild(h2Text)
            section.appendChild(h2) */

            data.forEach(gatos => {


                const article = document.createElement('article')
                const img = document.createElement('img')
                const btn = document.createElement('button')
                btn.classList.add('buttonCat')
                const btnText = document.createTextNode('Eliminar de favoritos')

                btn.appendChild(btnText) //Dento del botón va el texto
                img.src = gatos.image.url
                img.classList.add('aleatorioImg')

                article.appendChild(img)//Dento del article va la imagen
                article.appendChild(btn)

                btn.onclick = () => deleteFavoriteMichi(gatos.id);

                section.appendChild(article)
                section.classList.add('randomCats')
            });
        }
    }


async function saveFavoriteMichi(id){

    const {data, status} = await api.post('/favourites', {
        image_id: id,
    })
/*     const res = await fetch(`${urlFavourite}`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // lenguaje en común para front y back
            'X-API-KEY' : 'live_6NV6I9mm8SV8zAqE4OvisVDEa0C6NdnuIUwv1Ps7FqprViAOvoPB0IsDlAErVcNJ',
        },
        body: JSON.stringify (// JSON.stringify es para convertirlo y que se puede leer en cualquier lenguaje del backend
            { //aqui se especifica que imagen va a ser guardada en favoritos
                image_id: id,
            }
        ) 
    })
    const data = await res.json()  */

    //console.log(res);

    if(status !== 200){
        spanError.innerHTML = `Error al cargar las imagenes ${status}`
    } else {
        console.log('Se guardo en favoritos');
        loadFavorteMichis();
    }
}


async function deleteFavoriteMichi(id){
    const res = await fetch(`${urlFavourite}/${id}`,
    {
        method: 'DELETE',
        headers: {
            'X-API-KEY' : 'live_6NV6I9mm8SV8zAqE4OvisVDEa0C6NdnuIUwv1Ps7FqprViAOvoPB0IsDlAErVcNJ',
        },        
    })
    const data = await res.json()
    if(!res.ok && res.status !== 200){
        spanError.innerHTML = `Error al cargar las imagenes ${res.status}`
    } else {
        console.log('Se elimino de favoritos');
        loadFavorteMichis();
    }
}


async function uploadMichiPhoto(){
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form)

    console.log(formData.get('file'));

    const res = await fetch(`${urlUpload}`,
    {
        method: 'POST',
        headers: {
            /* 'Content-Type': 'multipart/form-data', */
            'X-API-KEY' : 'live_6NV6I9mm8SV8zAqE4OvisVDEa0C6NdnuIUwv1Ps7FqprViAOvoPB0IsDlAErVcNJ',
        },
        body: formData,
    })
    const data = await res.json()
    if (res.status !== 201) {
        spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
    }
    else {
        console.log("Foto de michi cargada :)");
        console.log({ data });
        console.log(data.url);
        saveFavoriteMichi(data.id) //para agregar el michi cargado a favoritos.
    }
}


const inputButton = document.querySelector('input') // se captura el boton -- Aquí comienza todo
inputButton.addEventListener('click', loadRandomMichis) // se escucha el evento click y se manda a llamar la función
loadRandomMichis() // Se llama la función para evitar de que cargue vacio la primera vez
loadFavorteMichis() // Se llama la función para evitar de que cargue vacio la primera vez