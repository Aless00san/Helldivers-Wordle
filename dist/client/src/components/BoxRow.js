"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../styles/App.css");
require("../styles/BoxRow.css"); // Import the new CSS file
function BoxRow({ boxCount }) {
    return (<>
      <div className="row-container">
        {Array.from({ length: boxCount }, (_, i) => (<div key={i} className="box">
            <p className="box-number"></p>
          </div>))}
      </div>
    </>);
}
exports.default = BoxRow;
