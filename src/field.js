import Component from './component.js';
import Cell from './cell.js';

import './field.css';

/*
 * [Event name: params]
 * wrongClick: this
 * rightClick: this, pickedColor
 */
export default class Field extends Component {
    static getRootClass() {
        return '.deck';
    }

    constructor(root) {
        super(root);

        this.gameOver = false;
        this.turn = "R"
        this.cells = [];
        const els = root.querySelectorAll(Cell.getRootClass());
        console.log(els);
        this.id = 0;
        this.RED = 0;
        this.BLUE = 0;
        for (let el of els) {
          console.log("F");
            const cell = new Cell(el);
            cell.id = this.id;
            this.id++;
            cell.on('click', this.handleCellClick.bind(this));
            console.log(cell.id);
            this.cells.push(cell);
        }
    }

    reset() {
        this.gameOver = false;
        for (let cell of this.cells)
            cell.reset();
    }

    handleCellClick(firer,id) {
        if (this.turn === "R") {
          this.fire('click',"B");
          this.manageChangeColor(this.turn,id);
          this.turn = "B";
          console.log(id);
          console.log(this.cells[id].color);
          console.log(this.turn);
        }else if(this.turn === "B"){
          this.fire('click',"R");
          this.manageChangeColor(this.turn,id);
          this.turn = "R";
          console.log(id);
          console.log(this.cells[id].color);
          console.log(this.turn);
        }
    }
    changeColor(turn,id){
      this.cells[id].changeColor(turn);
    }
    manageChangeColor(turn,id){
      if (id === 0) {                           //special case corner
        this.changeColor(turn,id);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id+16);
        this.changeColor(turn,id+17);
      }else if (id === 15) {
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id+15);
        this.changeColor(turn,id+16);
      }else if (id === 240) {
        this.changeColor(turn,id);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id-15);
        this.changeColor(turn,id-16);
      }else if (id === 255) {
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id-16);
        this.changeColor(turn,id-17);
      }else if (id>0&&id<15) {                   //special case edge
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id+15);
        this.changeColor(turn,id+16);
        this.changeColor(turn,id+17);
      }else if (id>240&&id<255) {
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id-15);
        this.changeColor(turn,id-16);
        this.changeColor(turn,id-17);
      }else if (id%16===15) {
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id-17);
        this.changeColor(turn,id-16);
        this.changeColor(turn,id+15);
        this.changeColor(turn,id+16);
      }
      else if (id%16===0) {
        this.changeColor(turn,id);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id-15);
        this.changeColor(turn,id-16);
        this.changeColor(turn,id+17);
        this.changeColor(turn,id+16);
      }else {                                   //normalcase
        this.changeColor(turn,id);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id-16);
        this.changeColor(turn,id-17);
        this.changeColor(turn,id-15);
        this.changeColor(turn,id+16);
        this.changeColor(turn,id+17);
        this.changeColor(turn,id+15);
      }
      this.countArea();
    }
    countArea(){
      this.BLUE = 0;
      this.RED = 0;
      for (let i=0 ; i<256 ;i++){
        if(this.cells[i].color === "B")
          this.BLUE++;
        else if (this.cells[i].color === "R")
          this.RED++;
      }
      console.log(this.RED);
      console.log(this.BLUE);
      if ((this.BLUE+this.RED) === 256) {
        this.fire('gameover',this.BLUE,this.RED);
        this.fire('count',this.BLUE,this.RED);
      }else {
        this.fire('count',this.BLUE,this.RED);
      }
    }
}
