import { useReducer } from "react"
import "./App.css"
import DigitButton from "./digit"
import OperationButton from "./operation"


export const actions = {
  Adding: 'add-digit',
  choose_Operation:'choose-operation',
  clear:'clear',
  delete:'delete-digit',
  evaluate: 'evaluate'
}

function reducer(state, {type, payload}) {
  switch(type) {
    case actions.Adding:
      if (payload.digit === '0' && state.currentInput === '0') {return state}
      if (payload.digit === '.' && state.currentInput.includes('.')) {return state}
      return {
        ...state,
        currentInput: `${state.currentInput || ""}${payload.digit}`
      }
  }  
}

function App() {
  const [{currentInput, previousInput,operation}, dispatch] = useReducer(reducer,{})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-input">{previousInput} {operation}</div>
          <div className="current-input">{currentInput}</div>
        
        
      </div>
      <button className="span-two">AC</button>
        <OperationButton operation="DEL" dispatch={dispatch}/>
        <DigitButton digit="÷" dispatch={dispatch}/>
        <DigitButton digit="1" dispatch={dispatch}/>
        <DigitButton digit="2" dispatch={dispatch}/>
        <DigitButton digit="3" dispatch={dispatch}/>
        <OperationButton operation="*" dispatch={dispatch}/>
        <DigitButton digit="4" dispatch={dispatch}/>
        <DigitButton digit="5" dispatch={dispatch}/>
        <DigitButton digit="6" dispatch={dispatch}/>
        <OperationButton operation="+" dispatch={dispatch}/>
        <DigitButton digit="7" dispatch={dispatch}/>
        <DigitButton digit="8" dispatch={dispatch}/>
        <DigitButton digit="9" dispatch={dispatch}/>
        <OperationButton operation="-" dispatch={dispatch}/>
        <DigitButton digit="." dispatch={dispatch}/>
        <DigitButton digit="0" dispatch={dispatch}/>
        <button className="span-two">=</button>
    </div>  )
}

export default App
