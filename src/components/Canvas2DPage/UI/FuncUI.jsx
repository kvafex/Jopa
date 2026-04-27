const FuncUI = (props) => {
    const func = props.func;

    const keyUpF = (event) => {
        func.setF(event.target.value);
    }

    const keyUpX = (event) => {
        func.setX(event.target.value);
    }

    const keyUpY = (event) => {
        func.setY(event.target.value);
    }

    const keyUpRange = (event) => {
        const range = event.target.value.replaceAll('[','').replaceAll(']','').split(',');
        range[0] ? range[0] = Number(range[0]) : range[0] = 0;
        range[1] ? range[1] = Number(range[1]) : range[1] = 2 * Math.PI;
        func.setRange(range);
    }

    const keyUpAB = (event) => {
        const range = event.target.value.replaceAll('[','').replaceAll(']','').split(',');
        range[0] ? range[0] = Number(range[0]) : range[0] = 0;
        range[1] ? range[1] = Number(range[1]) : range[1] = 2;
        func.setAB(range);
    }

    const keyUpColor = (event) => {
        const color = event.target.value.length === 7 ? event.target.value : '#000000';
        func.setColor(color);
    }

    const keyUpWidth = (event) => {
        func.setWidth(Number(event.target.value));
    }

    const showZeros = () => {
        func.showZeros();
    }

    const showParam = () => {
        func.showParam();
    }

    const showIntegral = () => {
        func.showIntegral();
    }

    return (<div className="mar_b">
            <div className="flex_r">
                <div className="flex_c mar_l">
                    <input placeholder="f(x)" defaultValue={func.toString('f')} className="mar_b" onKeyUp={event => keyUpF(event)}/>
                    <input placeholder="x(t)" className="mar_b" onKeyUp={event => keyUpX(event)}/>
                    <input placeholder="y(t)" className="mar_b" onKeyUp={event => keyUpY(event)}/>
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
    </div>);
}

export default FuncUI;