"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Screen;
require("../styles/Screen.css");
const color_feedback_component_1 = __importDefault(require("./color-feedback-component"));
function Screen() {
    return (<>
      <div className='screen-container'>
        <div className='crt-effect'>
          <color_feedback_component_1.default />
        </div>
      </div>
    </>);
}
