const app = document.querySelector('#app');

const board = document.createElement('div');
board.classList.add('board');
app.appendChild(board);

(function generateBoard() {
    createGrid();
    
})();

function createGrid() {
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