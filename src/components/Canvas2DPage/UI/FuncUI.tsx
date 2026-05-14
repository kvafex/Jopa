import { useRef, useState } from "react";
import Func, { EFN, TFn } from "../../../modules/math2D/entities/Func";

const FuncUI: React.FC <{
    func: Func, 
    funcsI: Array<TFn>, 
    index: number, 
    changeNotIntegral: (index: number, bool: boolean) => void
}> = ({
    func,
    index, changeNotIntegral, 
    funcsI
}) => {

    const NIRef = useRef<HTMLInputElement>(null!);
    let isDisable = false;
    for (let i = 0; i < funcsI.length; i++) {
        if (funcsI[i] === func[EFN.f]) isDisable = false;
    }
    const [update, setUpdate] = useState(0);
    
    const keyUpF = (event: React.KeyboardEvent): void => {
        func.setF((event.target as HTMLInputElement).value);
    }

    const keyUpX = (event: React.KeyboardEvent): void => {
        func.setX((event.target as HTMLInputElement).value);
    }

    const keyUpY = (event: React.KeyboardEvent): void => {
        func.setY((event.target as HTMLInputElement).value);
    }

    const keyUpRange = (event: React.KeyboardEvent): void => {
        const range = (event.target as HTMLInputElement).value.replaceAll('[','').replaceAll(']','').split(',');
        range[0] ? range[0] = range[0] : range[0] = '0';
        range[1] ? range[1] = range[1] : range[1] = `${2 * Math.PI}`;
        func.setRange([Number(range[0]), Number(range[1])]);
    }

    const keyUpAB = (event: React.KeyboardEvent): void => {
        const range = (event.target as HTMLInputElement).value.replaceAll('[','').replaceAll(']','').split(',');
        range[0] ? range[0] = range[0] : range[0] = '0';
        range[1] ? range[1] = range[1] : range[1] = '2';
        func.setAB([Number(range[0]), Number(range[1])]);
    }

    const keyUpColor = (event: React.KeyboardEvent): void => {
        const color = (event.target as HTMLInputElement).value.length === 7 ? (event.target as HTMLInputElement).value : '#000000';
        func.setColor(color);
    }

    const keyUpWidth = (event: React.KeyboardEvent): void => {
        func.setWidth(Number((event.target as HTMLInputElement).value));
    }

    const showZeros = (): void => {
        func.showZeros();
    }

    const showParam = (): void => {
        func.showParam();
    }

    const showIntegral = (): void => {
        func.showIntegral();
    }

    const getNotIntegral = (): void => {
        func.isNotIntegral = !func.isNotIntegral;
        setUpdate(update + 1);
        changeNotIntegral(index, func.isNotIntegral);
    }

    return (
    <div className="mar_b">
            <div className="flex_r">
                <div className="flex_c mar_l">
                    <label>f(x): <input placeholder="f(x)" defaultValue={func.toString(EFN.f)} className="mar_b" onKeyUp={event => keyUpF(event)}/></label>
                    <label>x(t): <input placeholder="x(t)" defaultValue={func.toString(EFN.x)} className="mar_b" onKeyUp={event => keyUpX(event)}/></label>
                    <label>y(t): <input placeholder="y(t)" defaultValue={func.toString(EFN.y)} className="mar_b" onKeyUp={event => keyUpY(event)}/></label>
                    <label>range: <input placeholder="range" className="mar_b" onKeyUp={event => keyUpRange(event)}/></label>
                    <label>a-b: <input placeholder="a-b" className="mar_b" onKeyUp={event => keyUpAB(event)}/></label>
                    <label>color: <input placeholder="color" className="mar_b" onKeyUp={event => keyUpColor(event)}/></label>
                    <label>width: <input placeholder="width" onKeyUp={event => keyUpWidth(event)}/></label>
                </div>
                <div className="flex_c mar_l">
                    <label className="mar_b">Отметить нули функции?<input onChange={() => showZeros()} type="checkbox" className="checkbox"/></label>
                    <label className="mar_b">Функция параметрическая?<input onChange={() => showParam()} type="checkbox" className="checkbox"/></label>
                    <label className="mar_b">Нарисовать и вывести определенный интеграл?<input onChange={() => showIntegral()} type="checkbox" className="checkbox"/></label>
                    <label>Взять эту функцию для интеграла из двух функции?<input disabled={funcsI.length < 3 && !isDisable? false : true} ref={NIRef} onChange={() => getNotIntegral()} type="checkbox" className="checkbox"/></label>               
                </div>
            </div>
    </div>
    );
}

export default FuncUI;