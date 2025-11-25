const track = document.getElementById("track");
const slides = Array.from(track.children);
let index = 0;

// duplicar primer slide al final
track.appendChild(slides[0].cloneNode(true));

function next() {
  index++;
  track.style.transform = `translateX(-${index * 100}%)`;

  if (index === slides.length) {
    setTimeout(() => {
      track.style.transition = "none";
      index = 0;
      track.style.transform = "translateX(0)";
      // reactivar transición
      setTimeout(() => {
        track.style.transition = "transform 0.7s ease";
      }, 50);
    }, 500);
  }
}

setInterval(next, 12000);
