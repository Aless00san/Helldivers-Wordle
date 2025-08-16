"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ci_1 = require("react-icons/ci");
require("../styles/App.css");
function Navbar() {
    return (<>
      <nav>
        <button style={{ backgroundColor: 'transparent', marginLeft: '10px' }}>
          <ci_1.CiMenuBurger style={{ padding: '5px', scale: '125%' }}></ci_1.CiMenuBurger>
        </button>
        <p style={{ margin: '5px', padding: '35px' }}>Helldivers Wordle</p>
      </nav>
    </>);
}
exports.default = Navbar;
