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
}

function giveLetters(playerIndex) {
    while(players[playerIndex].letters.length < 7) {
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
            slot.setAttribute('data-position-x', i);
            slot.setAttribute('data-position-y', j);
            board.appendChild(slot);

            // Assign effects if necessary

            // center slot
            if(i === 7 && j === 7) {
                slot.setAttribute('data-effect', 'center');
                slot.classList.add('slot-center');
                const circle = document.createElement('div');
                slot.appendChild(circle);
                circle.classList.add('center-circle');
            }

            // triple word
            if( (i === 0 || i === 7 || i === 14) && (j === 0 || j=== 7 || j === 14) && !slot.hasAttribute('data-effect') ) {
                slot.setAttribute('data-effect', 'tw');
                slot.classList.add('slot-tw');
                slot.textContent = "MOT TRIPLE";
            }

            // triple letter
            if( ((i === 1 || i === 13) && (j === 5 || j === 9)) || ((i === 5 || i === 9) && (j=== 1 || j === 5 || j === 9 || j === 13)) ) {
                slot.setAttribute('data-effect','tl');
                slot.classList.add('slot-tl');
                slot.textContent = "LETTRE TRIPLE";
            }

            // double letter 
            if ( ((i === 0 || i === 7 || i === 14) && (j === 3 || j === 11)) || 
            ((i === 2 || i === 12) && (j === 6 || j === 8)) || 
            ((i === 3 || i === 11) && (j === 0 || j === 7 || j === 14)) ||
            ((i===6 || i===8) && (j===2 || j===6 || j===8 || j===12))
            ) {
                slot.setAttribute('data-effect', 'dl'); 
                slot.classList.add('slot-dl');
                slot.textContent = "LETTRE DOUBLE";

            }

            // double word
            if ( (i === j || i === 14-j) && !slot.hasAttribute('data-effect') ) {
                slot.setAttribute('data-effect', 'dw');
                slot.classList.add('slot-dw');
                slot.textContent = "MOT DOUBLE";

            }

        }
    }
}

// Letters
const letters = [];
function addLetter(qty,letter,score) {
    for(let i=0; i<qty; i++) {
        letters.push({'letter':letter, 'score':score})
    }
}
function addLetters() {
    addLetter(9,"A",1);
    addLetter(15,"E",1);
    addLetter(8,"I",1);
    addLetter(5,"L",1);
    addLetter(6,"N",1);
    addLetter(6,"O",1);
    addLetter(6,"R",1);
    addLetter(6,"S",1);
    addLetter(6,"T",1);
    addLetter(6,"U",1);
    addLetter(3,"D",2);
    addLetter(2,"G",2);
    addLetter(3,"M",2);
    addLetter(2,"B",3);
    addLetter(2,"C",3);
    addLetter(2,"P",3);
    addLetter(2,"F",4);
    addLetter(2,"H",4);
    addLetter(2,"V",4);
    addLetter(1,"J",8);
    addLetter(1,"Q",8);
    addLetter(1,"K",10);
    addLetter(1,"W",10);
    addLetter(1,"X",10);
    addLetter(1,"Y",10);
    addLetter(1,"Z",10);
};

