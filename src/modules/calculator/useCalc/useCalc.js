import Calculator from "../Calculator";
import { Polynom } from "../types";

const useCalc = (aRef, bRef, cRef) => {
    const calc = new Calculator();

    return (act) => {
        const a = calc.getValue(aRef.current.value);
        const b = calc.getValue(bRef.current.value);
        let action = act;

        if (action === 'getValue' && a instanceof Polynom) {
            cRef.current.value = a.getValueP(b).toString();
            return;
        }

        if (
            ((action === 'pow' || action === 'prod') && typeof b === 'number') ||
            (typeof a === typeof b)
        ) {
            cRef.current.value = calc[action](a,b).toString();
        }
    };
}

export default useCalc;