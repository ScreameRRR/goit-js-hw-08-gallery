import { galleryItems } from "./app.js"; // імпортую сюди зображення з apps.js. Нас так вчив Андрій при роботі з посиланнями.

// ссилки на потрібні елементи
const ulListRef = document.querySelector(".js-gallery"); 
const modalRef = document.querySelector(".js-lightbox"); 
const modalImageRef = document.querySelector(".lightbox__image");

// Функція перебирає массив с картинками та повертає розмітку
function createImageMarkup(galleryItems) { 
    return galleryItems.map(({preview, original, description}) => {
        return `<li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
        </a>
        </li>
        `}).join('')
    };
    
// Тут ми вставляєм розмітку
ulListRef.insertAdjacentHTML("beforeend", createImageMarkup(galleryItems)); 

// Тут є функція відкриття модального вікна
const modalIsOpen = (e) => { 
    if(!e.target.classList.contains("gallery__image")) { // Переевірка на клік по img. Якщо це не img, то виходимо
        return;
    }
    e.preventDefault(); // Тут відміна дїі браузера по замовченням
    modalRef.classList.add("is-open"); // При кліку ми добавляєм класс is-open і в img записуємо атрибути
    modalImageRef.src = e.target.dataset.source;
    modalImageRef.alt = e.target.alt;
    modalImageRef.dataset.index = e.target.dataset.index;
    window.addEventListener("keydown", closeModalEscAndSlider);
};

// Тут є функція закриття модального вікна
const modalIsClose = (e) =>{ 
    if(e.target.classList.contains("lightbox__button") || e.target.classList.contains("lightbox__overlay")) { // Якщо нажали на кнопку button або на overlay
        modalRef.classList.remove("is-open");// Знімаємо класс is-open і в img обновлюємо усі атрибути
        modalImageRef.src = "";
        modalImageRef.alt = "";
        modalImageRef.dataset.index = "";
        window.removeEventListener("keydown", closeModalEscAndSlider);
    }
    return;
}


const galleryImageRef = document.querySelectorAll(".gallery__image"); // Посилання на всі потрібні зображення img 
galleryImageRef.forEach((item, index) => item.dataset.index = `${index}`); // В кожен img добавляєм атрибут data-index значення якого буде індекс

const closeModalEscAndSlider = (e) => { // При нажиманні на клавішу Esc атрибути обнуляются и модальне вікно закривается
    if(e.code === "Escape") {
        modalRef.classList.remove("is-open");
        modalImageRef.src = "";
        modalImageRef.alt = "";
        modalImageRef.dataset.index = "";
        window.removeEventListener("keydown", closeModalEscAndSlider);
    };
  
    
    let currentIndexImageInModal = Number(modalImageRef.dataset.index) // У змінну currentIndexImageInModal записуємо індекс поточної картинки в модальному вікні


    if(e.key === "ArrowRight" && currentIndexImageInModal <= galleryItems.length -2) { // Якшо нажимається ArrowRight та індекс <= довжини массива
        modalImageRef.src = galleryItems[currentIndexImageInModal + 1 ].original; // В src поточна картинка перезаписується у src наступної картинки
        modalImageRef.dataset.index = currentIndexImageInModal + 1;// а у data-index поточний індекс +1
    } 
    if(e.key === "ArrowLeft" && currentIndexImageInModal > 0) {
        modalImageRef.src = galleryItems[currentIndexImageInModal-1].original;
        modalImageRef.dataset.index = currentIndexImageInModal -1;
    }
};


ulListRef.addEventListener("click", modalIsOpen);
modalRef.addEventListener("click", modalIsClose);