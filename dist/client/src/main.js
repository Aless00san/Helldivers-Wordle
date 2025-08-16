"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
require("./styles/index.css");
const App_tsx_1 = __importDefault(require("./components/App.tsx"));
const Navbar_tsx_1 = __importDefault(require("./components/Navbar.tsx"));
const Footer_tsx_1 = __importDefault(require("./components/Footer.tsx"));
(0, client_1.createRoot)(document.getElementById('root')).render(<react_1.StrictMode>
    <Navbar_tsx_1.default />
    <App_tsx_1.default />
    <Footer_tsx_1.default />
  </react_1.StrictMode>);
