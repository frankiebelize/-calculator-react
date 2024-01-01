import { actions } from "./App"

export default function DigitButton({dispatch, digit}) {
    return ( <button onClick={() => dispatch({type:actions.Adding, payload: {digit} })}>
        {digit}
    </button>
    )
}