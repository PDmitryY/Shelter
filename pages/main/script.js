const pets = await fetch('./../../assets/pets.json')
  .then((response) => {
    return response.json();
  });
console.log("pets", pets);

const body = document.querySelector('body');
const shadow = document.querySelector('.shadow');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const menu_list = document.querySelector('.menu-list');
const hero = document.querySelector('#hero.section');
const header = document.querySelector('header>.container');
const main = document.querySelector('.main')
const logo = document.querySelector('.logo')

const menuLink = document.querySelectorAll('.menu-link')
const hamburgerLine = document.querySelectorAll('.line')

const btn_left = document.querySelector('.back');
const btn_right = document.querySelector('.forward');
const carousel = document.querySelector('#carousel');
const left_items = document.querySelector('#block-left');
const active_items = document.querySelector('#block-active');
const right_items = document.querySelector('#block-right');

const popup = document.querySelector('.popup');
const popup_body = document.querySelector('.popup-body');
const popup_content = document.querySelector('.popup-content');
const popup_button = document.querySelector('.popup-btn');

function toggleMenu() {
    body.classList.toggle('open');
    shadow.classList.toggle('open')
    hamburger.classList.toggle('open');
    menu.classList.toggle('open');
    header.classList.toggle('open');
    main.classList.toggle('open');
    logo.classList.toggle('open');
};
  
function closeMenu() {
    body.classList.remove('open');
    shadow.classList.remove('open')
    hamburger.classList.remove('open');
    menu.classList.remove('open');
    hero.classList.remove('open');
    header.classList.remove('open');
    main.classList.remove('open');
    logo.classList.remove('open');
};

function changeClassActive(className) {
    className.classList.add('active');
};

function popupOpen (event) {
  popup.classList.add('open');
  body.classList.add('open');

  const id = event.target.parentNode.id -1;
  
  const popupImg = document.querySelector('.popup-img');
        console.log("pets[id].img", pets[id].img);
        popupImg.src = pets[id].img;

        const popupTitle = document.querySelector('.popup-title');
        popupTitle.textContent = pets[id].name;

        const popupSubtitle = document.querySelector('.popup-subtitle');
        popupSubtitle.textContent = `${pets[id].type} - ${pets[id].breed}`;

        const popupDescription = document.querySelector('.popup-description');
        popupDescription.textContent = pets[id].description;

        const popupListItems = document.querySelectorAll('.popup-list-item');

        popupListItems.forEach((element) => {
            let popupData = element.querySelector("span[data-popup]").dataset.popup;
            element.querySelector("span[data-popup]").textContent = pets[id][popupData];
        })
}

function popupClose (event) {
  popup.classList.remove('open');
  body.classList.remove('open');
}

function randomArrGenerator (min, max, length) {
  let arr = [];
  let i = 0;
  if (max < length) {return}
  while (i < length) {
    let next_num = Math.round(Math.random() * (max - min ) + min);
    if (arr.indexOf(next_num) == -1) {
      arr.push(next_num);
      i++;
    }
  }
  return arr;
}

function moveLeft () {
  carousel.classList.add('transition-left');
  btn_left.removeEventListener('click', moveLeft);
  btn_right.removeEventListener('click', moveRight);
  carouselFilling ();
};

function moveRight () {
  carousel.classList.add('transition-right');
  btn_left.removeEventListener('click', moveLeft);
  btn_right.removeEventListener('click', moveRight);
  carouselFilling ();
};

function carouselMovement (animationEvent) {
  let tempItems; 
  if(animationEvent.animationName === 'move-left') {
    carousel.classList.remove('transition-left');
    tempItems = active_items.innerHTML;
    active_items.innerHTML = left_items.innerHTML;
    left_items.innerHTML = tempItems;
  } else {
    carousel.classList.remove('transition-right');
    tempItems = active_items.innerHTML;
    active_items.innerHTML = right_items.innerHTML;
    right_items.innerHTML = tempItems;
  }
  btn_left.addEventListener('click', moveLeft);
  btn_right.addEventListener('click', moveRight);
};

function createSliderItem (index) {
  const sliderItem = document.createElement('div');
  sliderItem.classList.add('slider-item');
  sliderItem.setAttribute('id', pets[index].id)

  const sliderItemImg = document.createElement('img');
  sliderItemImg.classList.add('slider-item-img');
  sliderItemImg.src = pets[index].img;
  sliderItem.append(sliderItemImg);

  const sliderItemTitle = document.createElement('h3');
  sliderItemTitle.classList.add('slider-item-title');
  sliderItemTitle.textContent = pets[index].name;
  sliderItem.append(sliderItemTitle);

  const sliderItemButton = document.createElement('button');
  sliderItemButton.classList.add('slider-item-btn');
  sliderItemButton.textContent = 'Learn more';
  sliderItem.append(sliderItemButton);

  return sliderItem;
}

let carouselLength;

function carouselFilling () {
  left_items.innerHTML='';
  active_items.innerHTML='';
  right_items.innerHTML='';

  carouselLength = 3;

  if (window.matchMedia('(max-width: 1279.5px)').matches) {
    carouselLength = 2;
  }

  if (window.matchMedia('(max-width: 767.5px)').matches) {
    carouselLength = 1;
  }

  let IdArrLeft = randomArrGenerator(1, 8, carouselLength);
  let IdArrActive = randomArrGenerator(1, 8, carouselLength);
  let IdArrRight = randomArrGenerator(1, 8, carouselLength);

  for(let i=0; i<carouselLength; i++) {
    let index = IdArrActive[i] - 1;
    let slide = createSliderItem(index);
    active_items.appendChild(slide);
  }

  for(let i=0; i<carouselLength; i++) {
    let index = IdArrLeft[i] - 1;
    let slide = createSliderItem(index);
    left_items.appendChild(slide);
  }

  for(let i=0; i<carouselLength; i++) {
    let index = IdArrRight[i] - 1;
    let slide = createSliderItem(index);
    right_items.appendChild(slide);
  }
}

carouselFilling ()

hamburger.addEventListener('click', toggleMenu);

menu_list.addEventListener('click', closeMenu);

shadow.addEventListener('click', closeMenu);

btn_left.addEventListener('click', moveLeft);

btn_right.addEventListener('click', moveRight);

carousel.addEventListener('animationend', carouselMovement);

active_items.addEventListener('click', (event) => {
  const sliderItem = document.querySelector('.slider-item').parentNode;
  if (event.target !== active_items && 
      active_items.contains(event.target) &&
      event.target !== sliderItem) {
      popupOpen(event);
  }
});

document.addEventListener('click', (event) => {
  if (event.target !== popup_content && 
      !popup_content.contains(event.target) && 
      event.target !== active_items && 
      !active_items.contains(event.target) && 
      event.target === popup_content.parentNode ||
      event.target === popup_button) {
      popupClose();
  } 
});

popup_button.addEventListener('click', popupClose);

popup_content.addEventListener('mouseleave', (event) => {
  popup_button.classList.add('change-btn-background');
})

popup_content.addEventListener('mousemove', (event) => {
  popup_button.classList.remove('change-btn-background');
})
