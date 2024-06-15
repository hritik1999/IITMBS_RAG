let scrollButton = document.getElementById('scrollToTop');

// Add Custom Margin for the main content
window.addEventListener('DOMContentLoaded', function () {
    let fixed = document.getElementById("fixedTop");
    const marginTop = window.getComputedStyle(fixed).getPropertyValue("height");
    let styles = `
                p:target::before {
                    content: "";
                      display: block;
                      height: ${marginTop}; /* fixed header height*/
                      margin: -${marginTop} 0 0; /* negative fixed header height */
                }
                h2:target::before {
                    content: "";
                      display: block;
                      height: ${marginTop}; /* fixed header height*/
                      margin: -${marginTop} 0 0; /* negative fixed header height */
                }
                div:target::before {
                    content: "";
                      display: block;
                      height: ${marginTop}; /* fixed header height*/
                      margin: -${marginTop} 0 0; /* negative fixed header height */
                }
                `
    document.getElementById("mainContent").style.marginTop = marginTop;
    let styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet);
})
window.onload = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
    weekShow();
}
window.onresize = function () {
    let fixed = document.getElementById("fixedTop");
    const marginTop = window.getComputedStyle(fixed).getPropertyValue("height");
    let styles = `
                p:target::before {
                    content: "";
                      display: block;
                      height: ${marginTop}; /* fixed header height*/
                      margin: -${marginTop} 0 0; /* negative fixed header height */
                }
                div:target::before {
                    content: "";
                      display: block;
                      height: ${marginTop}; /* fixed header height*/
                      margin: -${marginTop} 0 0; /* negative fixed header height */
                }
                h2:target::before {
                    content: "";
                      display: block;
                      height: ${marginTop}; /* fixed header height*/
                      margin: -${marginTop} 0 0; /* negative fixed header height */
                }`
    document.getElementById("mainContent").style.marginTop = marginTop;
    let styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
}
// Checking if to show scroll to top button
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
}
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Add Custom Margin for the main content
let fixed = document.getElementById("fixedTop");
let toggle = true;
document.getElementById("mainContent").style.marginTop = window.getComputedStyle(fixed).getPropertyValue("height");

let showHide = document.getElementById('show/hide');

function weekShow() {
    let hiddenItems = document.getElementsByClassName('week-hide');
    if (toggle) {
        for (let i = 0; i < hiddenItems.length; i++) {
            hiddenItems[i].style.display = 'none'
        }
        if (showHide) {
            showHide.innerText = '+ Show all weeks';
        }
        toggle = false;
    }
    else {
        for (let j = 0; j < hiddenItems.length; j++) {
            hiddenItems[j].style.display = ''
        }
        if (showHide) {
            showHide.innerText = '- Show less';
        }
        toggle = true;
    }

}

// handle paragraph cotent for instructor 
let about = document.getElementsByClassName('instructor-paragraph-small');
for (let i = 0; i < about.length; i++) {
    let contents = about[i].getElementsByClassName('lessAbout');
    for (let j = 0; j < contents.length; j++) {
        contents[j].classList.remove('d-inline');
        contents[j].classList.add('d-none');
    }
}

// Show detail/less
function showMore(id) {
    let contents = document.getElementById(id).getElementsByClassName('lessAbout');
    document.getElementById(`${id}-f`).classList.remove('d-inline')
    document.getElementById(`${id}-f`).classList.add('d-none');
    document.getElementById(`${id}-l`).classList.remove('d-none');
    document.getElementById(`${id}-l`).classList.add('d-inline');
    for (let j = 0; j < contents.length; j++) {
        contents[j].classList.remove('d-none');
        contents[j].classList.add('d-inline');
    }
}
function showLess(id) {
    let contents = document.getElementById(id).getElementsByClassName('lessAbout');
    document.getElementById(`${id}-f`).classList.remove('d-none')
    document.getElementById(`${id}-f`).classList.add('d-inline');
    document.getElementById(`${id}-l`).classList.remove('d-inline');
    document.getElementById(`${id}-l`).classList.add('d-none');
    for (let j = 0; j < contents.length; j++) {
        contents[j].classList.remove('d-inline');
        contents[j].classList.add('d-none');
    }
}

// footer links navigation
let footerLinks = document.getElementsByClassName('footerLinks');
for (let i = 0; i < footerLinks.length; i++) {
    footerLinks[i].addEventListener('click', function () {
        window.location = this.getAttribute('url');
    })
}