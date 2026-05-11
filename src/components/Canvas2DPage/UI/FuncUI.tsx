import Func, { EFN } from "../../../modules/math2D/entities/Func";

const FuncUI: React.FC <{func: Func}> = ({func}) => {

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

    return (
    <div className="mar_b">
            <div className="flex_r">
                <div className="flex_c mar_l">
                    <input placeholder="f(x)" defaultValue={func.toString(EFN.f)} className="mar_b" onKeyUp={event => keyUpF(event)}/>
                    <input placeholder="x(t)" defaultValue={func.toString(EFN.x)} className="mar_b" onKeyUp={event => keyUpX(event)}/>
                    <input placeholder="y(t)" defaultValue={func.toString(EFN.y)} className="mar_b" onKeyUp={event => keyUpY(event)}/>
                    <input placeholder="range" className="mar_b" onKeyUp={event => keyUpRange(event)}/>
                    <input placeholder="a-b" className="mar_b" onKeyUp={event => keyUpAB(event)}/>
                    <input placeholder="color" className="mar_b" onKeyUp={event => keyUpColor(event)}/>
                    <input placeholder="width" onKeyUp={event => keyUpWidth(event)}/>
                </div>
                <div className="output flex_c mar_l">
                    <label className="mar_b">Отрисовка нолей<input onChange={() => showZeros()} type="checkbox" className="checkbox"/></label>
                    <label className="mar_b">Отрисовка параметра<input onChange={() => showParam()} type="checkbox" className="checkbox"/></label>
                    <label className="mar_b">Отрисовка интеграла<input onChange={() => showIntegral()} type="checkbox" className="checkbox"/></label>               
                </div>
            </div>
    </div>
    );
}

export default FuncUI;