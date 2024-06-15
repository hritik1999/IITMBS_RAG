function googleTranslateElementInit() {
    new google.translate.TranslateElement({ layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false }, 'google_translate_element');
}
window.onload = function () {
    document.body.style.top = "0px";
    document.getElementById('english').classList.add("active-lang")
}
function changeLanguage(item) {
    let id = item.id;
    let lang = document.getElementById(id).getAttribute('data-lang');

    $('.translation-lang').removeClass('active-lang');
    document.getElementById(id).classList.add("active-lang")

    let $frame = $('.goog-te-menu-frame:first');
    if ($frame.contents().find('.goog-te-menu2-item span.text:contains(' + lang + ')').get(0))
        $frame.contents().find('.goog-te-menu2-item span.text:contains(' + lang + ')').get(0).click();
    return false;
}
