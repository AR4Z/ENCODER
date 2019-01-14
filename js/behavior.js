document.addEventListener("DOMContentLoaded", (e) => {
  let thumbnailElement = document.getElementById("smart_thumbnail");
  let smallThumbnail = document.getElementById('small_thumbnail');
  thumbnailElement.addEventListener('click', (e) => {
    if(thumbnailElement.classList.contains('small')) {
      thumbnailElement.className = "";
      smallThumbnail.textContent = "Click sobre la imagen para miniaturizarla"
    } else {
      thumbnailElement.className = "small";
      smallThumbnail.textContent = "Click sobre la imagen para verla"
    }
  })
});