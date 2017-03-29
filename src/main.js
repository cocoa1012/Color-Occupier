import Component from  './component.js';
import Navbar from  './navbar.js';
import Board from  './board.js';
import Field from  './field.js';
import Reset from  './reset.js';

import './main.css';

export default class Main extends Component {
    static getRootClass() {
        return '.main';
    }

    constructor(root) {
        super(root);

        this.navbar = new Navbar(root.querySelector('.navbar'));

        this.field = new Field(root.querySelector('.field'));
        this.field.on('gameover',this.handleGameover.bind(this));
        this.field.on('click',this.handleChangeTurn.bind(this));
        this.field.on('count',this.handleAreaCounting.bind(this));
        this.fieldDispaly = root.querySelector('.field');

        this.board = new Board(root.querySelector('.board'));
        this.turnDisplay = root.querySelector('#turn');
        this.messageDisplay =root.querySelector('#message');
        this.turnDisplay.textContent = "RED";
        this.RedDispaly = root.querySelector('#areaR');
        this.BlueDispaly = root.querySelector('#areaB');

        this.reset = new Reset(root.querySelector('.reset'));
        this.resetDisplay = root.querySelector('button')
        this.reset.on('click', this.handleRestClick.bind(this));
        this.resetDisplay.style.display = 'none';
    }

    handleGameover(firer,BLUE,RED){
        this.resetDisplay.style.display = 'block';
        if (BLUE > RED) {
          this.messageDisplay.textContent = "BLUE WIN!!";
          this.turnDisplay.textContent = "";
        }else if(RED > BLUE){
          this.messageDisplay.textContent = "RED WIN!!";
          this.turnDisplay.textContent = "";
        }else {
          this.messageDisplay.textContent = "Draw!!";
          this.turnDisplay.textContent = "";
        }
    }

    handleChangeTurn(firer,turn){
      if (turn === "R") {
        this.turnDisplay.textContent = "RED";
      }else if (turn === "B") {
        this.turnDisplay.textContent = "BLUE";
      }
    }

    handleAreaCounting(firer,blue,red){
      this.RedDispaly.textContent = red;
      this.BlueDispaly.textContent = blue;
    }

    handleRestClick() {
        this.turnDisplay.textContent = "RED";
        this.messageDisplay.textContent = "Turn : ";
        this.RedDispaly.textContent = 0;
        this.BlueDispaly.textContent = 0;
        this.resetDisplay.style.display = 'none';
        this.field.reset();
        this.reset.reset();
    }
}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
};
