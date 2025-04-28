const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

// button elements
const all = document.querySelector("#all");
const utah = document.querySelector("#utah");
const nonus = document.querySelector("#nonus");
const ten = document.querySelector("#served");
const childs = document.querySelector("#childs");
const old = document.querySelector("#old");

async function getProphetData(filter = "all") {
    const response = await fetch(url);
    const data = await response.json();
    let prophets = data.prophets; 

    switch (filter) {
        case "utah":
            prophets = prophets.filter((prophet) => prophet.birthplace === "Utah");
            break;
        case "nonus":
            prophets = prophets.filter((prophet) => prophet.birthplace === "England");
            break;
        case "served":
            prophets = prophets.filter((prophet) => prophet.length >= 15);
            break;
        case "childs":
            prophets = prophets.filter((prophet) => prophet.numofchildren >= 10);
            break;
        case "old":
            prophets = prophets.filter((prophet) => getAgeAtDeathInYears(prophet.birthdate, prophet.death) >= 95); 
            break;
        default:
            break;
    }
    console.table(prophets); // 暫時測試data

    displayProphets(prophets)
}

const displayProphets = (prophets) => {
    cards.innerHTML = "";
    prophets.forEach((prophet) => {
        // 每次選染出cards前遷清空cards
        
        const card = document.createElement('section');
        
        // build name
        const fullName = document.createElement('h2');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        
        // Add the Date of Birth and Place of Birth as shown in the screenshot at the start of this activity.
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // img
        const portrait = document.createElement('img');
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `portrait of ${prophet.name} ${prophet.lastname}`); // alt,
        portrait.setAttribute('loading', 'lazy'); // loading,
        portrait.setAttribute('width', '340'); // width, and
        portrait.setAttribute('height', '440'); // height attributes using setAttribute().
        
        // add prophet infor to card and add cards
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);
        cards.appendChild(card);
    }); // end of arrow function and forEach loop


}

getProphetData();

all.addEventListener('click', () => {
    clearButtonClasses(); // 使用一個負責清空?的涵式
    getProphetData('all');
    all.classList.add('active');
});

utah.addEventListener('click', () => {
    clearButtonClasses();
    getProphetData('utah');
    utah.classList.add('active');
})
nonus.addEventListener('click', () =>{
    clearButtonClasses();
    getProphetData('nonus');
    nonus.classList.add('active');
})
ten.addEventListener('click', () =>{
    clearButtonClasses();
    getProphetData('ten');
    ten.classList.add('active');
})
childs.addEventListener('click', () =>{
    clearButtonClasses();
    getProphetData('childs');
    childs.classList.add('active');
})
old.addEventListener('click', () =>{
    clearButtonClasses();
    getProphetData('old');
    old.classList.add('active');
})

// 負責清空?的涵式
function clearButtonClasses() {
    const filterButtons = document.querySelectorAll('button');
    filterButtons.forEach(button => button.className="");
}

function getAgeAtDeathInYears(birthdate, deathdate) {
    let birth = new Date(birthdate);
    let death = new Date(deathdate);
    if (deathdate === null) {
        death = new Date();
    }
    return Math.floor((death - birth) / (365 * 24 * 60 * 60 * 1000));
}