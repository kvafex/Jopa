import { useState } from "react";
import Func from "../../../modules/math2D/entities/Func";
import FuncUI from "./FuncUI";

const UI2D = (props) => {
    const [funcs, setFuncs] = useState(props.funcs);
    const [update, setUpdate] = useState(0);

    const addFunction = () => {
        const newFuncs = funcs;
        newFuncs.push(new Func({}));
        setFuncs(newFuncs);
        setUpdate(update + 1);
    }

    const deleteFunction = index => {
        funcs.splice(index, 1);
        setUpdate(update + 1);
    }

    return (
        <div>
            <button className="mar_t mar_l mar_b" onClick={() => addFunction()}>Добавить функцию</button>
            <div className="flex_c">
                {funcs.map((func, index) => (<div key={index}>
                    <FuncUI func={func} />
                    <button className="mar_b" onClick={() => deleteFunction(index)}>DELETE</button>
                    <div className="mar_l">_______________________________________</div>
                </div>)
                )}
            </div>
        </div>);
}

export default UI2D;