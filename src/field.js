import Component from './component.js';
import Cell from './cell.js';

import './field.css';

export default class Field extends Component {
    static getRootClass() {
        return '.deck';
    }

    constructor(root) {
        super(root);

        this.turn = "R"
        this.cells = [];
        const els = root.querySelectorAll(Cell.getRootClass());
        this.id = 0;
        this.RED = 0;
        this.BLUE = 0;
        for (let el of els) {
            const cell = new Cell(el);
            cell.id = this.id;
            this.id++;
            cell.on('click', this.handleCellClick.bind(this));
            this.cells.push(cell);
        }
    }

    reset() {
        this.BLUE = 0;
        this.RED = 0;
        this.turn = "R";
        for (let cell of this.cells)
            cell.reset();
    }

    handleCellClick(firer,id) {
        if (this.turn === "R") {
          this.fire('click',"B");
          this.manageChangeColor(this.turn,id);
          this.turn = "B";
        }else if(this.turn === "B"){
          this.fire('click',"R");
          this.manageChangeColor(this.turn,id);
          this.turn = "R";
        }
    }
    changeColor(turn,id){
      this.cells[id].changeColor(turn);
    }
    manageChangeColor(turn,id){
      if (id === 0) {                           //special case corner
        this.changeColor(turn,id);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id+15);
        this.changeColor(turn,id+16);
      }else if (id === 14) {
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id+14);
        this.changeColor(turn,id+15);
      }else if (id === 210) {
        this.changeColor(turn,id);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id-14);
        this.changeColor(turn,id-15);
      }else if (id === 224) {
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id-15);
        this.changeColor(turn,id-16);
      }else if (id>0&&id<14) {                   //special case edge
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id+14);
        this.changeColor(turn,id+15);
        this.changeColor(turn,id+16);
      }else if (id>210&&id<224) {
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id-14);
        this.changeColor(turn,id-15);
        this.changeColor(turn,id-16);
      }else if (id%15===14) {
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id-16);
        this.changeColor(turn,id-15);
        this.changeColor(turn,id+14);
        this.changeColor(turn,id+15);
      }
      else if (id%15===0) {
        this.changeColor(turn,id);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id-14);
        this.changeColor(turn,id-15);
        this.changeColor(turn,id+16);
        this.changeColor(turn,id+15);
      }else {                                   //normalcase
        this.changeColor(turn,id);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id-15);
        this.changeColor(turn,id-16);
        this.changeColor(turn,id-14);
        this.changeColor(turn,id+15);
        this.changeColor(turn,id+16);
        this.changeColor(turn,id+14);
      }
      this.countArea();
    }
    countArea(){
      this.BLUE = 0;
      this.RED = 0;
      for (let i=0 ; i<225 ;i++){
        if(this.cells[i].color === "B")
          this.BLUE++;
        else if (this.cells[i].color === "R")
          this.RED++;
      }
      if ((this.BLUE+this.RED) === 225) {
        this.fire('gameover',this.BLUE,this.RED);
        this.fire('count',this.BLUE,this.RED);
      }else {
        this.fire('count',this.BLUE,this.RED);
      }
    }
}
