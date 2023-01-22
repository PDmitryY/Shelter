const pets = await fetch('./../../assets/pets.json')
  .then((response) => {
    return response.json();
  });

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

const popup = document.querySelector('.popup');
const popup_body = document.querySelector('.popup-body');
const popup_content = document.querySelector('.popup-content');
const popup_button = document.querySelector('.popup-btn');

const active_items = document.querySelector('.slider');

const btn_first = document.querySelector('.first');
const btn_prev = document.querySelector('.prev');
const btn_next = document.querySelector('.next');
const btn_last = document.querySelector('.last');
const curr_page = document.querySelector('.curr');


let pets_array = [];
let carouselLength = 8;
let current_page = 1;

if (window.matchMedia('(max-width: 1279.5px)').matches) {
  carouselLength = 6;
};

if (window.matchMedia('(max-width: 767.5px)').matches) {
  carouselLength = 3;
};


function toggleMenu() {
    body.classList.toggle('open');
    shadow.classList.toggle('open')
    hamburger.classList.toggle('open');
    menu.classList.toggle('open');
    header.classList.toggle('open');
    // main.classList.toggle('open');
    logo.classList.toggle('open');
  }
  
  function closeMenu() {
      body.classList.remove('open');
      shadow.classList.remove('open')
      hamburger.classList.remove('open');
      menu.classList.remove('open');
      // hero.classList.remove('open');
      header.classList.remove('open');
      // main.classList.remove('open');
      logo.classList.remove('open');
  }

  function changeClassActive(className) {
    className.classList.add('active');
}

function popupOpen (event) {
  popup.classList.add('open');
  body.classList.add('open');

  const id = event.target.parentNode.id -1;
  
  const popupImg = document.querySelector('.popup-img');
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

function petsArrayIdCreate () {
  for (let i = 0; i < 6; i++) {
    let arr = randomArrGenerator(1, 8, 8);
    pets_array = pets_array.concat(arr);
  }
  return pets_array;
}

petsArrayIdCreate();

let page_count = pets_array.length / carouselLength;

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

function carouselFilling () {
  active_items.innerHTML='';
  
  let IdArrActive = pets_array.slice((current_page-1)*carouselLength, (carouselLength*current_page))

  for(let i=0; i<carouselLength; i++) {
    let index = IdArrActive[i]-1;
    let slide = createSliderItem(index);
    active_items.appendChild(slide);
  }
}

carouselFilling()

function activationButtons () {
  if (current_page == 1) {
    btn_first.classList.add('deactivate');
    btn_prev.classList.add('deactivate');
    btn_next.classList.remove('deactivate');
    btn_last.classList.remove('deactivate');
  } else if (current_page == page_count) {
    btn_next.classList.add('deactivate');
    btn_last.classList.add('deactivate');
    btn_first.classList.remove('deactivate');
    btn_prev.classList.remove('deactivate');
  } else {
    btn_first.classList.remove('deactivate');
    btn_prev.classList.remove('deactivate');
    btn_next.classList.remove('deactivate');
    btn_last.classList.remove('deactivate');
  }
}


hamburger.addEventListener('click', toggleMenu);

menu_list.addEventListener('click', closeMenu);

shadow.addEventListener('click', closeMenu);

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
});

popup_content.addEventListener('mousemove', (event) => {
  popup_button.classList.remove('change-btn-background');
});

btn_first.addEventListener('click', () => {
  if(current_page != 1) {
    current_page = 1;
    curr_page.innerHTML = current_page;
    carouselFilling();
    activationButtons ()
  }
});

btn_prev.addEventListener('click', () => {
  if(current_page != 1) {
    current_page --;
    curr_page.innerHTML = current_page;
    carouselFilling();
    activationButtons ()
  }
  
});

btn_next.addEventListener('click', () => {
  if(current_page < page_count) {
    current_page ++;
    curr_page.innerHTML = current_page;
    carouselFilling();
    activationButtons ()
  }
  
});

btn_last.addEventListener('click', () => {
  if(current_page != page_count) {
    current_page = page_count;
    curr_page.innerHTML = current_page;
    carouselFilling();
    activationButtons ()
  }
});
