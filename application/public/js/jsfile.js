document.getElementById("username").addEventListener("input", function(ev) {
    let userIput = ev.currentTarget;
    let username = userIput.value;
    if (username.length >= 3){
        userIput.classList.add("valid_text")
        userIput.classList.remove("invalid_text")
    }
    else{
        userIput.classList.add("invalid_text")
        userIput.classList.remove("valid_text")
    }
});

document.getElementsByTagName('form').addEventListener("submit", function(ev){
    ev.preventDefault();
    console.log(ev);
});