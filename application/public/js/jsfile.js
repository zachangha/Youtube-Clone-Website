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


document.getElementById("username").addEventListener("input", function(ev) {
    let userIput = ev.currentTarget;
    let username = userIput.value;
    var firstCharacter = username.charAt(0);
    var alphanumeric = username.match(/[a-zA-Z0-9]/g);
    if (alphanumeric.length >= 3 && firstCharacter.match(/[a-zA-Z]/)){
        userIput.classList.add("valid_text")
        userIput.classList.remove("invalid_text")
    }
    else{
        userIput.classList.add("invalid_text")
        userIput.classList.remove("valid_text")
    }
});

document.getElementById("username").addEventListener("click", function(ev) {
    var usernameRequirements = document.getElementById("username_requirements")
    usernameRequirements.style.display = "block";
});

document.getElementById("password").addEventListener("click", function(ev){
    var passwordRequirements = document.getElementById("password_requirements")
    passwordRequirements.style.display = "block";
})

document.getElementById("email").addEventListener("input", function(ev){
    let userIput = ev.currentTarget;
    let email = userIput.value;
    if(email.match(/[@]/)){
        userIput.classList.add("valid_text")
        userIput.classList.remove("invalid_text")
    }
    else{
        userIput.classList.add("invalid_text")
        userIput.classList.remove("valid_text")
    }
})

document.getElementById("password").addEventListener("input", function(ev){
    let userIput = ev.currentTarget;
    let password = userIput.value;
    if (password.length >= 8 && password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[/*\-+@!#$^&~\[\]]/)){
        userIput.classList.add("valid_text")
        userIput.classList.remove("invalid_text")
    }
    else {
        userIput.classList.add("invalid_text")
        userIput.classList.remove("valid_text")
    } 
});

document.getElementById("confirm_password").addEventListener("input", function(ev){
    let userIput = ev.currentTarget;
    let confirm_password = userIput.value;
    let password = document.getElementById("password").value;
    if (confirm_password == password){
        userIput.classList.add("valid_text")
        userIput.classList.remove("invalid_text")
    }
    else{
        userIput.classList.add("invalid_text")
        userIput.classList.remove("valid_text")
    } 
});

document.getElementById("submission").addEventListener("submit", function(ev){
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let confirm_password = document.getElementById("confirm_password");
    let email = document.getElementById("email");
    if(username.value === '' || password.value === '' || confirm_password.value === '' || email.value === ''){
        ev.preventDefault();
        alert("Please fill in all fields correctly.")
    }
    else if(username.classList.contains("invalid_text") || password.classList.contains("invalid_text") || confirm_password.classList.contains("invalid_text") || email.classList.contains("invalid_text")){
        ev.preventDefault();
        alert("Please fill in all fields correctly.")
    }
    else if(password.value != confirm_password.value){
        ev.preventDefault();
        alert("Passwords do not match.")
    }
    else{
        ev.currentTarget.submit();
        console.log(ev);
    }
});
