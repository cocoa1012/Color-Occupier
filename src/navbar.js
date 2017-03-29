import Component from './component.js';

import './navbar.css';

export default class Navbar extends Component {
    static getRootClass() {
        return '.navbar';
    }

    constructor(root) {
        super(root);
        this.brand = root.querySelector('.brand');
    }

}
