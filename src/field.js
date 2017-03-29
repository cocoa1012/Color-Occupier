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
          this.manageChangeColor(this.turn,id);
          this.turn = "B";
          console.log(id);
          console.log(this.cells[id].color);
          console.log(this.turn);
        }else if(this.turn === "B"){
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
        this.changeColor(turn,id+8);
        this.changeColor(turn,id+9);
      }else if (id === 7) {
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id+7);
        this.changeColor(turn,id+8);
      }else if (id === 56) {
        this.changeColor(turn,id);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id-7);
        this.changeColor(turn,id-8);
      }else if (id === 63) {
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id-8);
        this.changeColor(turn,id-9);
      }else if (id>0&&id<7) {                   //special case edge
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id+7);
        this.changeColor(turn,id+8);
        this.changeColor(turn,id+9);
      }else if (id>56&&id<63) {
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id-7);
        this.changeColor(turn,id-8);
        this.changeColor(turn,id-9);
      }else if (id%8===7) {
        this.changeColor(turn,id);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id-9);
        this.changeColor(turn,id-8);
        this.changeColor(turn,id+7);
        this.changeColor(turn,id+8);
      }
      else if (id%8===0) {
        this.changeColor(turn,id);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id-7);
        this.changeColor(turn,id-8);
        this.changeColor(turn,id+9);
        this.changeColor(turn,id+8);
      }else {                                   //normalcase
        this.changeColor(turn,id);
        this.changeColor(turn,id+1);
        this.changeColor(turn,id-1);
        this.changeColor(turn,id-8);
        this.changeColor(turn,id-9);
        this.changeColor(turn,id-7);
        this.changeColor(turn,id+8);
        this.changeColor(turn,id+9);
        this.changeColor(turn,id+7);
      }
    }
}
