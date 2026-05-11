import Calculator, { EOperand } from "./Calculator";
import { Polynom } from "./entities";
import { TAnyType } from "./types";

const useCalculator = (
    aRef: React.RefObject<HTMLTextAreaElement>, 
    bRef: React.RefObject<HTMLTextAreaElement>, 
    cRef: React.RefObject<HTMLTextAreaElement>
) => {

    const calc = new Calculator();

    return (act: EOperand) => {
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
            cRef.current.value = calc[action](
                a as TAnyType & string,
                b as TAnyType & number
//              взято из непонятной шайтанама ошибки :^(           
            )!.toString();
        }
    };
}

export default useCalculator;