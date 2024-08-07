const form = document.querySelector('#searchForm');
const container = document.querySelector('#container');
console.log(form.dir);

function clearRes(){
    if(container){
        container.innerHTML = '';
    }
}

form.addEventListener('submit',async function(e){
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    // console.log(searchTerm);
    const config = {params: {q: searchTerm}}
    clearRes();
    const res = await(axios.get(`https://api.tvmaze.com/search/shows`,config));
    console.log(res.data);
    makeImg(res.data);
    form.elements.query.value = '';
})

const makeImg = (shows) =>{
    for(let res of shows){
        if(res.show.image && res.show.name){
            const resDiv = document.createElement('div');
            resDiv.classList.add('searchResult');

            const img = document.createElement('img');
            img.src = res.show.image.medium;
            img.alt = res.show.name;

            const name = document.createElement('p');
            name.textContent = res.show.name;
            
            resDiv.appendChild(img);
            resDiv.appendChild(name);

            container.appendChild(resDiv);
        }
    }
}
