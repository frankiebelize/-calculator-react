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
      if (state.overwrite) {
        return {
          ...state,
          currentInput: payload.digit,
          overwrite:false,
        }
      }

      if (payload.digit === '0' && state.currentInput === '0') {return state}
      if (payload.digit === '.' && state.currentInput.includes('.')) {return state}
      return {
        ...state,
        currentInput: `${state.currentInput || ""}${payload.digit}`
      }

      case actions.choose_Operation:
        if (state.currentInput === null && state.previousInput == null){
          return state
        }

        if (state.currentInput == null) {
          return {
            ...state,
            operation: payload.operation,
          }
        }

        if (state.previousInput == null){
          return {
            ...state,
            operation: payload.operation,
            previousInput: state.currentInput,
            currentInput: null,
          }
        }

        return {
          ...state,
          previousInput: evaluate(state),
          operation: payload.operation,
          currentInput: null,
        }

        case actions.delete:
          if (state.overwrite) {
            return {
              ...state,
              overwrite: false,
              currentInput:null
            }
          }
          if (state.currentInput == null) return state
          if (state.currentInput.length === 1) {
            return { ...state, currentInput: null}
          }
          return {
            ...state,
            currentInput: state.currentInput.slice(0, -1)
          }

        case actions.clear:
          return {
            currentInput:null,
          }

        case actions.evaluate:
          if(
            state.operation == null || state.currentInput == null || state.previousInput == null
          ) {
            return state
          }
          return {
            ...state, 
            overwrite: true,
            previousInput: null,
            operation: null,
            currentInput: evaluate(state)
          }
  }  
}

function evaluate({currentInput, previousInput, operation}) {
  const previous = parseFloat(previousInput)
  const current = parseFloat(currentInput)
  if (isNaN(previous) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = previous + current
      break

    case "-":
      computation = previous + current
      break

    case "*":
      computation = previous * current
      break
      
    case "÷":
      computation = previous / current
  }
  return computation.toString()
}
const integer_Formatter = new Intl.NumberFormat("en-us", {
  maximumFractionDigits:0,
})

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return integer_Formatter.format(integer)
  return `${integer_Formatter.format(integer)}.${decimal}`
} 

function App() {
  const [{currentInput, previousInput,operation}, dispatch] = useReducer(reducer,{})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-input">{formatOperand(previousInput)} {operation}</div>
          <div className="current-input">{formatOperand(currentInput)}</div>
        
        
      </div>
      <button className="span-two" onClick={()=>dispatch({type: actions.clear})}>AC</button>
      <button onClick={()=>dispatch({type: actions.delete})}>DEL</button>
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
        <button className="span-two"  onClick={()=>dispatch({type: actions.evaluate})}>=</button>
    </div>  )
}

export default App
