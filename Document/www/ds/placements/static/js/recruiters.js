arrows=document.getElementsByClassName("arrow")
left=arrows[0]
right=arrows[1]

high=document.getElementById("highlights")

setInterval(() => {
    high.scr
})

left.addEventListener('click', ()=> {
    high.scrollBy(-120,0)
  })

right.addEventListener('click', ()=> {
    high.scrollBy(120,0)
})