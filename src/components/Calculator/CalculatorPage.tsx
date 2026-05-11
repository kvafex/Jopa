import { useRef } from "react";
import useCalculator from "../../modules/calculator/useCalculator";
import { EOperand } from "../../modules/calculator/Calculator";

import "./CalculatorPage.css";

const CalculatorPage = () => {
    const aRef = useRef<HTMLTextAreaElement>(null!);
    const bRef = useRef<HTMLTextAreaElement>(null!);
    const cRef = useRef<HTMLTextAreaElement>(null!);
    const calc = useCalculator(aRef, bRef, cRef);

    return (
        <div className="iconTop">
            <div className="flex_r center">
                <div className="flex_c">
                    <textarea className="output mar_b" placeholder="a" ref={aRef}></textarea>
                    <textarea className="output" placeholder="b" ref={bRef}></textarea>  
                </div>
                    
                <div className="flex_c a_center">
                    <button className="mar_l mar_r mar_b max_size" onClick={() => calc(EOperand.add)}>+</button>
                    <button className="mar_l mar_r max_size" onClick={() => calc(EOperand.mult)}>*</button>
                </div>

                <div className="flex_c a_center">
                    <button className="mar_b max_size" onClick={() => calc(EOperand.sub)}>-</button>
                    <button className="mar_b max_size" onClick={() => calc(EOperand.div)}>/</button>
                    <button className="max_size" onClick={() => calc(EOperand.getValue)}>Value</button>
                </div>

                <div className="flex_c mar_r a_center">
                    <button className="mar_b max_size" onClick={() => calc(EOperand.prod)}>prod</button>
                    <button className="max_size" onClick={() => calc(EOperand.pow)}>**</button>
                </div>

                <textarea className="output" placeholder="c" ref={cRef} disabled></textarea>
            </div>
            
        </div>
        );
}

export default CalculatorPage;