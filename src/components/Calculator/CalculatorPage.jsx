import { useRef } from "react";
import useCalc from "../../modules/calculator/useCalc/useCalc";

import "./CalculatorPage.css";

const CalculatorPage = () => {
    const aRef = useRef();
    const bRef = useRef();
    const cRef = useRef();
    const calc = useCalc(aRef, bRef, cRef);

    return (
        <div className="iconTop">
            <div className="flex_r">
                <div className="flex_c">
                <textarea className="output" placeholder="a" ref={aRef}></textarea>
                <textarea className="output" placeholder="b" ref={bRef}></textarea>  
                </div>
                    <button className="mar_r" onClick={() => calc("add")}>+</button>
                    <button className="mar_r" onClick={() => calc("sub")}>-</button>                
                    <button className="mar_r" onClick={() => calc("mult")}>*</button>
                    <button className="mar_r" onClick={() => calc("div")}>/</button>
                    <button className="mar_r" onClick={() => calc("pow")}>**</button>
                    <button className="mar_r" onClick={() => calc("prod")}>prod</button>
                    <button className="mar_r" onClick={() => calc("getValue")}>Value</button>
                <textarea className="output" placeholder="c" ref={cRef} disabled></textarea>
            </div>
            
        </div>
        );
}

export default CalculatorPage;