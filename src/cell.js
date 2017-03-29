import Component from  './component.js';

import './cell.css';

/*
 * [Event name: params]
 * click: this, color
 */
export default class Cell extends Component {
    static getRootClass() {
        return '.cell';
    }

    constructor(root) {
        super(root);
        console.log("cell");
        this.color = "N";
        this.id = 0;
        root.addEventListener("click", this.handleCellClick.bind(this));
        this.reset();
    }

    reset() {
        this.color = "N";
    }

    handleCellClick(e) {
      if (this.color==="N"){
          this.fire('click',this.id);
          console.log("C");
      }
    }

    changeColor(turn){
      this.color = turn;
      if (turn === "B") {
        this.root.style.backgroundColor="blue";
      }else if (turn === "R") {
        this.root.style.backgroundColor="red";
      }
    }
}
