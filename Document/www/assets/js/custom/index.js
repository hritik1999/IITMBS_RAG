function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
console.log("index script loaded");
function tabController(tab = "non-campus") {
  const elements = document.querySelectorAll(".programs");
  elements.forEach((el) => {
    el.classList.remove("d-flex");
    el.style.display = "none";
  });
  document.querySelectorAll(".tab-btn").forEach((el) => el.classList.remove("font-weight-bold"));

  document.querySelectorAll("." + tab).forEach((element) => {
    element.style.display = "flex";
  });
  document.getElementById(tab + "-btn").classList.add("font-weight-bold");
}
tabController();
// Contct form functionality
function handleCountrySelect() {
  let value = document.getElementById("country").value;
  if (value !== "India") {
    document.getElementById("state").style.display = "none";
    document.getElementById("city").style.display = "none";
    document.getElementById("state_input").style.display = "block";
    document.getElementById("city_input").style.display = "block";
    document.getElementById("state").required = false;
    document.getElementById("city").required = false;
    document.getElementById("city_input").required = true;
    document.getElementById("state_input").required = true;
    document.getElementById("mbNumber").setAttribute("maxlength", "15");
  } else {
    document.getElementById("state").style.display = "block";
    document.getElementById("city").style.display = "block";
    document.getElementById("state_input").style.display = "none";
    document.getElementById("city_input").style.display = "none";
    document.getElementById("state").required = true;
    document.getElementById("city").required = true;
    document.getElementById("state_input").required = false;
    document.getElementById("city_input").required = false;
    document.getElementById("mbNumber").setAttribute("maxlength", "10");
  }
}
handleStateSelect = () => {
  let state = document.getElementById("state").value;
  state = state.replace(/ /g, "-");
  if (state !== null) {
    $("#city").empty();
    $("#city").append('<option value="" disabled selected>Select from list</option>');
    for (let i = 0; i < options[state].length; i++)
      $("#city").append(`<option value=${options[state][i]}>${options[state][i]}</option>`);
    $("#city").append('<option value="other">Other</option>');
  }
};
function onSubmit(token) {
  submitButton.disabled = false;
}

// Show more/less functionality
let whyContent = document.getElementById("whyContent").innerHTML;
let show = whyContent.slice(0, 450);
let inlineContent = whyContent.slice(450, 500);
document.getElementById("whyContent").innerHTML =
  show +
  '<span class="d-inline-block">' +
  inlineContent +
  "...</span>" +
  '<span style="cursor: pointer;" onclick="showWhyMore();" id="whyMore" class="text-primary font-weight-600 d-inline-block">Read More</span>';
function showWhyMore() {
  document.getElementById("whyContent").innerHTML = whyContent;
  document.getElementById("whyMore").classList.remove("d-inline-block");
  document.getElementById("whyMore").classList.add("d-none");
}
function showWhyLess() {
  document.getElementById("whyContent").innerHTML =
    show +
    '<span class="d-inline-block">' +
    inlineContent +
    "...</span>" +
    '<span style="cursor: pointer;" onclick="showWhyMore();" id="whyMore" class="text-primary font-weight-600 d-inline-block">Read More</span>';
}

// Faq listing functionality
// let faqs = document.getElementsByClassName('faqExpand');
// for (let i = 0; i < faqs.length; i++) {
//     faqs[i].addEventListener('click', function () {
//         let content = this.nextElementSibling;
//         this.getElementsByClassName('expandMore')[0].classList.toggle('d-none');
//         this.getElementsByClassName('expandLess')[0].classList.toggle('d-none');
//         for (let j = 0; j < faqs.length; j++) {
//             if (j != i) {
//                 let content = faqs[j].nextElementSibling;
//                 if (content.style.maxHeight) {
//                     faqs[j].getElementsByClassName('expandMore')[0].classList.toggle('d-none');
//                     faqs[j].getElementsByClassName('expandLess')[0].classList.toggle('d-none');
//                     content.style.maxHeight = null;
//                     content.style.marginTop = 0;
//                 }
//             }
//         }
//         if (content.style.maxHeight) {
//             content.style.maxHeight = null;
//             content.style.marginTop = 0;
//         } else {
//             content.style.maxHeight = content.scrollHeight + "px";
//             content.style.marginTop = '1rem';
//         }
//     });
// }

// Testimonial coursal
$("#carouselExampleIndicators").carousel({
  interval: 3000,
  cycle: true,
});
var slides = document.getElementsByClassName("learner_slides");
var slideIndex = slides.length;
function showSlides() {
  var slides = document.getElementsByClassName("learner_slides");
  var learner_slides_dots = document.getElementsByClassName("learner_slides_dot");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    learner_slides_dots[i].className = learner_slides_dots[i].className.replace(" active", "");
  }
  slideIndex--;

  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  slides[slideIndex].style.display = "block";
  learner_slides_dots[slideIndex].className += " active";
  setTimeout(showSlides, 2000);
}

// footer links navigation
let footerLinks = document.getElementsByClassName("footerLinks");
for (let i = 0; i < footerLinks.length; i++) {
  footerLinks[i].addEventListener("click", function () {
    window.location = this.getAttribute("url");
  });
}

function dynamicAnnouncements(id, type) {
  let parent = document.getElementById(id);
  parent.innerHTML = "";

  updates.forEach((element) => {
    if (element.view === "No" && !type) return;

    let bulletIcon = `<span class="mr-2">
          <i class="fas fa-bullseye"></i>
        </span>`;

    if (element.content_type) bulletIcon = ``;

    // Paragraph tag
    let p = document.createElement("p");
    p.className = "latest-updates-item text-dark";
    p.innerHTML = element.text;

    if (element.ref !== "") {
      let anchorWord = "";
      let startIndex = element.text.indexOf("[");
      let lastIndex = element.text.indexOf("]");
      for (let i = startIndex + 1; i < lastIndex; i++) {
        anchorWord = anchorWord + element.text[i];
      }
      let tempWrod = "[" + anchorWord + "]";
      p.innerHTML = bulletIcon + element.text.replace(tempWrod, ` <a href="${element.ref}">${anchorWord}</a> `);
    }

    // Span tag
    if (element.date) {
      let span = document.createElement("span");
      span.className = "badge badge-secondary latest-updates-bedge ml-1";
      span.innerHTML = element.date;

      // Final paragraph
      p.appendChild(span);
    }
    parent.appendChild(p);
  });
}

function moreAnnouncement(item) {
  dynamicAnnouncements("latest-updates-modal", "modal");
  $("#announcementModal").modal("show");
}
// call sheets api - index page
indexPage();
