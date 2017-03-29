import Component from  './component.js';

import './board.css';

export default class Board extends Component {
    static getRootClass() {
        return '.board';
    }

    constructor(root, color) {
        super(root);
    }
    
}
