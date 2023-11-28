export default class BagOfTiles {
    letters = []

    constructor() {
        this.addLetters();
    }

    drawLetters(playerIndex) {
        while(players[playerIndex].letters.length < 7 && letters.length > 0) {
            const letter = Math.floor(Math.random()*letters.length);
            players[playerIndex].letters.push(letters[letter]);
            letters.splice(letter,1);
        }
    }

    addLetter(qty,letter,score) {
        for(let i=0; i<qty; i++) {
            this.letters.push({'letter':letter, 'score':score})
        }
    }

    addLetters() {
        this.addLetter(9,"A",1);
        this.addLetter(15,"E",1);
        this.addLetter(8,"I",1);
        this.addLetter(5,"L",1);
        this.addLetter(6,"N",1);
        this.addLetter(6,"O",1);
        this.addLetter(6,"R",1);
        this.addLetter(6,"S",1);
        this.addLetter(6,"T",1);
        this.addLetter(6,"U",1);
        this.addLetter(3,"D",2);
        this.addLetter(2,"G",2);
        this.addLetter(3,"M",2);
        this.addLetter(2,"B",3);
        this.addLetter(2,"C",3);
        this.addLetter(2,"P",3);
        this.addLetter(2,"F",4);
        this.addLetter(2,"H",4);
        this.addLetter(2,"V",4);
        this.addLetter(1,"J",8);
        this.addLetter(1,"Q",8);
        this.addLetter(1,"K",10);
        this.addLetter(1,"W",10);
        this.addLetter(1,"X",10);
        this.addLetter(1,"Y",10);
        this.addLetter(1,"Z",10);
    }
}