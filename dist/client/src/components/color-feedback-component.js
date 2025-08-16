"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../styles/App.css");
const ColorFeedbackComponent = () => {
    const [feedback, setFeedback] = (0, react_1.useState)(['initial', 'initial', 'initial']);
    const [status, setStatus] = (0, react_1.useState)(null);
    const getColorForFeedback = (feedbackType) => {
        switch (feedbackType) {
            case 'correct':
                return 'var(--correct-color)';
            case 'misplaced':
                return 'var(--misplaced-color)';
            case 'wrong':
                return 'var(--dark-gray)';
            case 'initial':
                return 'var(--initial-color)';
            default:
                return '#6b7280';
        }
    };
    const simulateApiCall = async () => {
        try {
            const response = await fetch('http://localhost:3000/game/guess', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    guess: ['↓', '→', '↑'],
                    solution: ['↓', '→', '↑']
                })
            });
            if (!response.ok) {
                throw new Error('API request failed');
            }
            const data = await response.json();
            // Convert the response guesses to the expected type
            const validatedFeedback = data.guesses;
            setFeedback(validatedFeedback);
            setStatus(data.status);
        }
        catch (error) {
            console.error('Error calling API:', error);
        }
    };
    return (<div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Color Feedback Component</h2>

      <button onClick={simulateApiCall} className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit Guess
      </button>

      <button onClick={() => {
            setFeedback(['initial', 'initial', 'initial']);
            setStatus(null);
        }} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
        Reset
      </button>

      <div className="mb-8 mt-6">
        <div className="flex gap-4">
          {feedback.map((result, index) => (<div key={index} className="box w-20 h-20 rounded-lg border-2 border-gray-300 flex items-center justify-center font-bold" style={{
                backgroundColor: getColorForFeedback(result),
                color: result === 'initial' ? '#6b7280' : 'white'
            }}>
              {index + 1}
            </div>))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold">Current Feedback:</h4>
        <code className="text-sm">[{feedback.map(f => `"${f}"`).join(', ')}]</code>
        {status && (<p className="mt-2 font-semibold">
            Status: <span className="text-green-600">{status}</span>
          </p>)}
      </div>
    </div>);
};
exports.default = ColorFeedbackComponent;
