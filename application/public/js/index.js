var url = "https://jsonplaceholder.typicode.com/albums/2/photos";

function fadeOut(ev){
    var ele = ev.currentTarget
    ele.classList.add("fade-out")
        let timer = setInterval(function(){
            ele.remove();
            clearInterval(timer);
            var count = document.getElementById("album-list").childElementCount
            document.getElementById("total-albums").innerHTML = `<p>${count} Photos</p>`;
        }, 2900)
        
}

function buildCard(data){
    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "album-card");

    var imgTag = document.createElement("img");
    imgTag.setAttribute("class", "album-img");
    imgTag.setAttribute("src", data.url);
    
    var titleTag = document.createElement("p");
    titleTag.setAttribute("class", "album-title")
    titleTag.textContent = data.title;

    cardDiv.appendChild(imgTag);
    cardDiv.appendChild(titleTag);

    cardDiv.addEventListener("click", fadeOut);

    return cardDiv;
}

async function fetchWithDOMAPI() {
    try {
        var response = await fetch(url);
        var data = await response.json();
        var elements = data.map(buildCard);
        document.getElementById("album-list").append(...elements);
        var count = document.getElementById("album-list").childElementCount
        document.getElementById("total-albums").innerHTML = `<p>${count} Photos</p>`;
    } catch (error) {
        console.log(error);
    }
}

fetchWithDOMAPI();