var x = window.matchMedia("(min-width: 941px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

function myFunction(x) {
     if (x.matches)  // If media query matches
         document.getElementById("mood").style.display="none";
     else 
         document.getElementById("mood").style.display="block";
}  