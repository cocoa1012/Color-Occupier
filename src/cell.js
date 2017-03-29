import Component from  './component.js';

import './cell.css';


export default class Cell extends Component {
    static getRootClass() {
        return '.cell';
    }

    constructor(root) {
        super(root);
        this.color = "N";
        this.id = 0;
        root.addEventListener("click", this.handleCellClick.bind(this));
        this.reset();
    }

    reset() {
        this.color = "N";
        this.root.style.backgroundColor="white";
    }

    handleCellClick() {
      if (this.color==="N"){
          this.fire('click',this.id);
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
