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

        this.board = new Board(root.querySelector('.board'));

        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleRestClick.bind(this));
    }

    handleRestClick() {

        this.reset.reset();
    }
}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
};
