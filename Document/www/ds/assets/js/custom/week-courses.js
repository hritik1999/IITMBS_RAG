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

// footer links navigation
let footerLinks = document.getElementsByClassName('footerLinks');
for (let i = 0; i < footerLinks.length; i++) {
    footerLinks[i].addEventListener('click', function () {
        window.location = this.getAttribute('url');
    })
}