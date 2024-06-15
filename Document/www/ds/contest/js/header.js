var  scrollPos = 0;
// adding scroll event
window.addEventListener('scroll', function(){
  // detects new state and compares it with the new one
  if ((document.body.getBoundingClientRect()).top > scrollPos) {
    if (typeof window.orientation !== 'undefined')
      document.getElementById("mainContent").style.display = "block";
    else
      document.getElementById("notification").style.display = "block";
  }
	else{

	  document.getElementById("mainContent").style.display = "none";
        document.getElementById("notification").style.display = "none";


  }
	// saves the new position for iteration.
	scrollPos = (document.body.getBoundingClientRect()).top;
});