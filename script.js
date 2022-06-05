import {MENU} from './menu.js';

const menu = document.querySelector('#menu');
const h4 = document.querySelector('h4');

const buttonMenu = document.querySelector('#buttonMenu');
const buttonTheme = document.querySelector('#buttonTheme');
const buttonSaveUser = document.querySelector('#buttonSaveUser');
const buttonSaveMenu = document.querySelector('#buttonSaveMenu');
const buttonMenuSaved = document.querySelector('#buttonMenuSaved');
const username = document.querySelector('#username');
const vegan = document.querySelector('#vegan');

const week = 7;
const month = 30;

let menuList = [];

//menu
const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

const getDayMenu = () => {

    let menuChoice = [];
    if(vegan.checked) {
        menuChoice = MENU.filter(e => e.type === 'vegan');
    } else {
        menuChoice = MENU;
    }

    const breakfast = menuChoice.filter(e => e.time === 'breakfast');
    const lunch = menuChoice.filter(e => e.time === 'lunch');
    const dinner = menuChoice.filter(e => e.time === 'dinner');
    const snack = menuChoice.filter(e => e.time === 'snack');

    return {
        breakfast: randomElement(breakfast),
        lunch: randomElement(lunch),
        dinner: randomElement(dinner),
        snack: randomElement(snack)
    };
};

const saveList = () => {
    if(menuList.length) {
        return localStorage.setItem('menu', JSON.stringify(menuList));
    } else {
        return;
    }
};

const render = () => {
    menu.innerHTML = '';
    menuList.map((e, i) =>
        menu.innerHTML += `<h5>День ${i + 1}</h5>
            <ul>
            <li>Завтрак: ${e.breakfast.name}</li>
            <li>Обед: ${e.lunch.name}</li>
            <li>Полдник: ${e.snack.name}</li>
            <li>Ужин: ${e.dinner.name}</li >
            </ul > `);
};

const getList = () => {

    menuList = JSON.parse(localStorage.getItem('menu'));
    render();

};

const getMenu = () => {
    const timeWeek = document.querySelector('#timeWeek');
    const timeMonth = document.querySelector('#timeMonth');

    let period = 1;
    let i = 1;

    if(timeWeek.checked) {period = week;}
    if(timeMonth.checked) {period = month;}

    menuList.length = 0;

    while(i <= period) {
        menuList.push(getDayMenu());
        i++;
    };

    render();

};

//theme
const isDark = () => {
    return localStorage.getItem("theme");
};

const toggleRootClass = () => {
    document.querySelector(":root").classList.toggle("dark-mode");
};

const switchTheme = () => {
    if(isDark()) {
        localStorage.removeItem("theme");
    } else {
        localStorage.setItem("theme", "dark");
    }
};

if(isDark()) {
    toggleRootClass();
}

const getUser = () => {
    return localStorage.getItem("user");
};

if(getUser()) h4.innerText = getUser();

//todo
const saveUser = () => {
    if(confirm('Сохранить меню?')) {
        localStorage.setItem("user", username.value);
        saveList();
    }
    modal.style.display = "none";
    h4.innerText = getUser();
};

//modal
const modal = document.querySelector("#modal");
const close = document.querySelector("#close-icon");

const showModal = () => {
    if(!menuList.length) {
        return menu.innerHTML = 'Составьте меню';
    } else {
        modal.style.display = "flex";
        username.value = getUser();
    }
};

close.addEventListener('click', () => {
    modal.style.display = "none";
});

modal.addEventListener('blur', (event) => {
    if(event.target === modal) {
        modal.style.display = "none";
    }
});

buttonMenu.addEventListener('click', getMenu);

buttonTheme.addEventListener('click', () => {
    switchTheme();
    toggleRootClass();
});

buttonSaveUser.addEventListener('click', saveUser);

buttonSaveMenu.addEventListener('click',
    showModal);

buttonMenuSaved.addEventListener('click', getList);