import Letters from './modules/Letters.js';
const letters = new Letters();
console.log(letters);

const app = document.querySelector('#app');

// Params
const settings = document.createElement('section');
app.appendChild(settings);
settings.classList.add('settings-section');
const title = document.createElement('h2');
title.textContent = 'Nouvelle partie';
const form = document.createElement('form');
settings.appendChild(title);
settings.appendChild(form);
form.innerHTML = `
<div>
    <label for="nbPlayers">Nombre de joueurs</label>
    <select id="nbPlayers" name="nbPlayers">
        <option>2</option>
        <option>3</option>
        <option>4</option>
    </select>
</div>
<button id="startBtn">Démarrer la partie</button>`;

const startBtn = document.querySelector('#startBtn');
const nbPlayers = document.querySelector('#nbPlayers');

startBtn.addEventListener('click',startGame);
const players = [];
let curPlayer = 0;
let curLetter;

function startGame(e) {
    e.preventDefault();
    addLetters();

    for(let i=0; i<nbPlayers.value; i++) {
        players.push({
            'playerId' : i+1,
            'playerName' : `Joueur ${i+1}`,
            'score' : 0,
            'letters': []
        })

        giveLetters(i);
    }
    settings.classList.add('hidden');
    createGrid();
    createPlayerSpace();
    nextPlayer();
}

function nextPlayer() {
    app.children[2].children[0].textContent = players[curPlayer].playerName;
    while(app.children[2].children[1].firstChild) {
        app.children[2].children[1].removeChild(app.children[2].children[1].firstChild)        
    }
    for(letter of players[curPlayer].letters) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        app.children[2].children[1].appendChild(tile);
        const tileLetter = document.createElement('p');
        tileLetter.textContent = letter.letter;
        tile.appendChild(tileLetter);
        const tileScore = document.createElement('p');
        tileScore.classList.add('tile-score');
        tileScore.textContent = letter.score;
        tile.appendChild(tileScore);
        tile.addEventListener('click', selectTile);
    }

    curPlayer++;
}

function selectTile(e) {
    if(curLetter != e.currentTarget && !e.currentTarget.classList.contains('used')) curLetter = e.currentTarget;
    else curLetter = null;
    for(let i=0; i<app.children[2].children[1].children.length;i++) {
        if(app.children[2].children[1].children[i].classList.contains('selected') && app.children[2].children[1].children[i] !== curLetter) app.children[2].children[1].children[i].classList.remove('selected');
    }
    if(curLetter != null) curLetter.classList.toggle('selected');
}

function moveLetter(e) {
    if(e.currentTarget.dataset.status === "available" && curLetter != null) {
        // Display tile on board
        e.currentTarget.textContent = '';
        const tile = document.createElement('div');
        tile.classList.add('tile');
        e.currentTarget.appendChild(tile);
        const tileLetter = document.createElement('p');
        tileLetter.textContent = curLetter.children[0].textContent;
        tile.appendChild(tileLetter);
        const tileScore = document.createElement('p');
        tileScore.classList.add('tile-score');
        tileScore.textContent = curLetter.children[1].textContent;
        tile.appendChild(tileScore);

        // clear curLetter
        curLetter.classList.remove('selected');
        curLetter.classList.add('used');
        curLetter = null;

        // change status
        e.currentTarget.dataset.status = "used";
    }
    else if(e.currentTarget.dataset.status === "used") {
        // Reinit tile
        for(let i=0; i<app.children[2].children[1].children.length;i++) {
            if(e.currentTarget.firstChild.firstChild.textContent === app.children[2].children[1].children[i].firstChild.textContent && app.children[2].children[1].children[i].classList.contains('used')) {
                app.children[2].children[1].children[i].classList.remove('used');
                break;
            }
        }

        // Reinit slot
        e.currentTarget.removeChild(e.currentTarget.firstChild);
        if(e.currentTarget.hasAttribute('data-effect')) e.currentTarget.textContent = e.currentTarget.dataset.effect;
        e.currentTarget.dataset.status = "available";


    }

}

function giveLetters(playerIndex) {
    while(players[playerIndex].letters.length < 7 && letters.length > 0) {
        const letter = Math.floor(Math.random()*letters.length);
        players[playerIndex].letters.push(letters[letter]);
        letters.splice(letter,1);
    }
}

function createGrid() {
    // Game board
    const board = document.createElement('section');
    board.classList.add('board');
    app.appendChild(board);

    for(let i=0; i<15; i++) {
        for(let j=0;j<15;j++) {
            // Create slot
            const slot = document.createElement('div');
            slot.classList.add('slot');
            slot.setAttribute('data-position', 15*i+j);
            slot.setAttribute('data-status','available');
            board.appendChild(slot);
            slot.addEventListener('click', moveLetter);

            // Assign effects if necessary

            // center slot
            if(i === 7 && j === 7) {
                slot.setAttribute('data-effect', 'DEPART');
                slot.classList.add('slot-center');
                slot.textContent = "DEPART";
            }

            // triple word
            if( (i === 0 || i === 7 || i === 14) && (j === 0 || j=== 7 || j === 14) && !slot.hasAttribute('data-effect') ) {
                slot.setAttribute('data-effect', 'MOT TRIPLE');
                slot.classList.add('slot-tw');
                slot.textContent = "MOT TRIPLE";
            }

            // triple letter
            if( ((i === 1 || i === 13) && (j === 5 || j === 9)) || ((i === 5 || i === 9) && (j=== 1 || j === 5 || j === 9 || j === 13)) ) {
                slot.setAttribute('data-effect','LETTRE TRIPLE');
                slot.classList.add('slot-tl');
                slot.textContent = "LETTRE TRIPLE";
            }

            // double letter 
            if ( ((i === 0 || i === 7 || i === 14) && (j === 3 || j === 11)) || 
            ((i === 2 || i === 12) && (j === 6 || j === 8)) || 
            ((i === 3 || i === 11) && (j === 0 || j === 7 || j === 14)) ||
            ((i===6 || i===8) && (j===2 || j===6 || j===8 || j===12))
            ) {
                slot.setAttribute('data-effect', 'LETTRE DOUBLE'); 
                slot.classList.add('slot-dl');
                slot.textContent = "LETTRE DOUBLE";

            }

            // double word
            if ( (i === j || i === 14-j) && !slot.hasAttribute('data-effect') ) {
                slot.setAttribute('data-effect', 'MOT DOUBLE');
                slot.classList.add('slot-dw');
                slot.textContent = "MOT DOUBLE";

            }

        }
    }
}

function createPlayerSpace() {
    const playerSpace = document.createElement('section');
    playerSpace.classList.add('player-space');
    app.appendChild(playerSpace);
    const playerName = document.createElement('h3');
    playerSpace.appendChild(playerName);
    const playerLetters = document.createElement('div');
    playerLetters.classList.add('player-letters');
    playerSpace.appendChild(playerLetters);
    const validateBtn = document.createElement('button');
    validateBtn.addEventListener('click', findNewWords);
    validateBtn.textContent = "Valider";
    playerSpace.appendChild(validateBtn);
}



function checkWords(words) {
    let isValid = true;
    for(word of words) {
        if(!validWords.includes(word)) isValid = false;
    }     
    return isValid;       
}

function findNewWords() {
    let newWords = [];

    for(let i = 0; i<app.children[1].children.length; i++) {
        const tile = app.children[1].children[i];
        if(tile.dataset.status === "used") {
            let newWord = tile.firstChild.firstChild.textContent;
            // check for horizontal word
            let offset = 1;
            while(app.children[1].children[i-offset] != null && app.children[1].children[i-offset].dataset.status != "available") {
                newWord = app.children[1].children[i-offset].firstChild.firstChild.textContent + newWord;
                offset++;
            }
            offset = 1;
            while(app.children[1].children[i+offset] != null && app.children[1].children[i+offset].dataset.status != "available") {
                newWord = newWord + app.children[1].children[i+offset].firstChild.firstChild.textContent;
                offset++;
            }
            newWords.push(newWord);

            // check for vertical word
            newWord = tile.firstChild.firstChild.textContent;
            offset = 15;
            while(app.children[1].children[i-offset] != null && app.children[1].children[i-offset].dataset.status != "available") {
                newWord = app.children[1].children[i-offset].firstChild.firstChild.textContent + newWord;
                offset = offset + 15;
            }
            
            offset = 15;
            while(app.children[1].children[i+offset] != null && app.children[1].children[i+offset].dataset.status != "available") {
                newWord = newWord + app.children[1].children[i+offset].firstChild.firstChild.textContent;
                offset = offset + 15;
            }
            newWords.push(newWord);

            
        }
    }

    let words = [];
    for(let i=0; i<newWords.length; i++) {
        if(newWords[i].length > 2) {
            words.push(newWords[i])
        }
        words = [...new Set(words)];
    }

    if(checkWords(words)) {
        nextPlayer();
    }
}

validWords = [];
// Methods
(async function importDictionary() {
    try {
        const reponse = await fetch('mots.txt');
        const contenu = await reponse.text();
        let lines = contenu.split('\n');

        lines = lines.map(line => line.replace ('\r', ''));
        lines = lines.map(line => line.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
        lines = lines.filter(line => line.length > 1 && line.length < 15);
        validWords = [...new Set(lines)];
    } 
    catch(error) {
        console.error('Une erreur s\'est produite lors de l\'importation du fichier :', error);
    }
})();
