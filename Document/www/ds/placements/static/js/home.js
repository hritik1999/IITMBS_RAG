var sliders = document.getElementsByClassName("page-nav-bar")
var all_slides = document.getElementsByClassName("slide-banner")
var total_slides= all_slides.length
var current=0
all_slides[current].style.display="block"
function changeslider(i){
    sliders[i].classList.remove("active")
    all_slides[i].style.display="none";
    sliders[(i+1)%total_slides].classList.add("active")
    all_slides[(i+1)%total_slides].style.display="block"
}

setInterval(() => {
    changeslider(current%total_slides);
    current=(current+1)%total_slides
}, 6000);