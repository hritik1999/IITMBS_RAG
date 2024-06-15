let news = document.getElementById("news-items")

function scroll(){
    news.scrollBy(0,75)
}
setInterval(scroll,2000)

document.getElementById("current-month").innerText="April 2022"