import { galleryItems } from "./gallery-items.js";

console.log(galleryItems);

const galleryElement = document.querySelector(".gallery");
const imagesElement = galleryItems
  .map(
    (item) =>
      `<div class = "gallery__item"><a class="gallery__link" href="${item.original}">
  <img
    class="gallery__image"
    src="${item.preview}"
    data-source="${item.original}"
    alt="${item.description}"
  />
</a>
</div>`
  )
  .join("");

galleryElement.insertAdjacentHTML("afterbegin", imagesElement);

galleryElement.addEventListener("click", imageClick);

function imageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  createModal(event.target).show();
}

function createModal(event) {
  const html = `<img src="${event.dataset.source}">`;
  let instance = basicLightbox.create(html, {
    onShow: () => {
      window.addEventListener("keydown", onKeyClose);
    },
    onClose: () => {
      window.removeEventListener("keydown", onKeyClose);
    },
  });
  return instance;

  function onKeyClose(event) {
    if (event.code !== "Escape") return;
    instance.close();
  }
}
