"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_tsx_1 = __importDefault(require("./Screen.tsx"));
require("../styles/App.css");
function App() {
    return (<>
      <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
        }}>
        <div style={{ width: '100%', height: '100%' }}>
          <Screen_tsx_1.default />
        </div>
      </div>
    </>);
}
exports.default = App;
