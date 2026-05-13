import { useState } from "react";
import Func, { EFN, TFn } from "../../../modules/math2D/entities/Func";
import FuncUI from "./FuncUI";

const UI2D: React.FC <{funcs: Array<Func>, funcsI: Array<TFn>}> = ({funcs, funcsI}) => {
    const [update, setUpdate] = useState(0);
    const [showPanel, setShowPanel] = useState(false);

    const addFunction = (): void => {
        funcs.push(new Func(
            {
                f: (x) => 0,
                x: (t) => 0, 
                y: (t) => 0,
                range: [0, 2 * Math.PI],
                rangeAB: [0, 2],
                color: '#ff00ff',
                width: 2
            }
        ));
        setUpdate(update + 1);
    }

    const deleteFunction = (index: number): void => {
        funcs.splice(index, 1);
        setUpdate(update + 1);
    }

    const changeNotIntegral = (index: number, bool: boolean): void => {
        if (funcsI.length < 3 && bool) {
            funcsI.push(funcs[index][EFN.f]);
        }
        if (funcsI.length < 3 && !bool) {
            let delIndex = 0;
            funcsI.forEach(f => {
                if (f === funcs[index][EFN.f]) {
                    delIndex = funcsI.indexOf(f);
                }
            })
            funcsI.splice(delIndex,1);
        }
        setUpdate(update + 1);
    }

    return (
        <div>
            <button className="iconTop mar_b" onClick={() => { setShowPanel(!showPanel)}}>{showPanel? '<' : '>'}</button>
            { showPanel &&
            <div className="panel">
                <button className="mar_t mar_l mar_b" onClick={() => addFunction()}>Добавить функцию</button>
                <div className="flex_c">
                    {funcs.map((func, index) => (<div key={index}>
                        <FuncUI func={func} funcsI={funcsI} index={index} changeNotIntegral={changeNotIntegral}/>
                        <button className="mar_l mar_b" onClick={() => deleteFunction(index)}>DELETE</button>
                        <div className="mar_b">______________________________________________________</div>
                    </div>)
                    )}
                </div>
            </div>
            }

        </div>);
}

export default UI2D;