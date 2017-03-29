import Component from  './component.js';

import './board.css';

/*
 * [Event name: params]
 * click: this, color
 */
export default class Board extends Component {
    static getRootClass() {
        return '.board';
    }

    constructor(root, color) {
        super(root);


        this.reset(color);
    }

    reset(color) {
        console.log("BR");
    }

}
