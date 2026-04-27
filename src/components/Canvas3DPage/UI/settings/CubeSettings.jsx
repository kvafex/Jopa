import { useRef } from "react";

const CubeSettings = (props) => {

    const figure = props.figure;
    const xRef = useRef();
    const yRef = useRef();
    const zRef = useRef();

    const keyupInputX = (event) => {
        const value = Number(event.target.value);
        const y = Number(yRef.current.value);
        const z = Number(zRef.current.value);
        if (!isNaN(value)) {
            figure.setCenter(value, y, z);
        }
    }

    const keyupInputY = (event) => {
        const value = Number(event.target.value);
        const x = Number(xRef.current.value);
        const z = Number(zRef.current.value);
        if (!isNaN(value)) {
            figure.setCenter(x, value, z);
        }
    }

    const keyupInputZ = (event) => {
        const value = Number(event.target.value);
        const x = Number(xRef.current.value);
        const y = Number(yRef.current.value);
        if (!isNaN(value)) {
            figure.setCenter(x, y, value);
        }
    }

    const keyupInputSize = (event) => {
        const value = Number(event.target.value);
        if (value > 0) {
            figure.setSize(value);
        }
    }

    const keyupInputColor = (event) => {
        const value = String(event.target.value);
        if (value.length === 7) {
            figure.setColor(value);
        }
    }

    return (<div className="flex_r mar_b">
            <input className="cInput output mar_r" ref={xRef} placeholder="x" onKeyUp={(event) => keyupInputX(event)}></input>
            <input className="cInput output mar_r" ref={yRef} placeholder="y" onKeyUp={(event) => keyupInputY(event)}></input>
            <input className="cInput output mar_r" ref={zRef} placeholder="z" onKeyUp={(event) => keyupInputZ(event)}></input>
            <input className="cInput output mar_r" placeholder="size" onKeyUp={(event) => keyupInputSize(event)}></input>
            <input className="cInput output mar_r" placeholder="color" onKeyUp={(event) => keyupInputColor(event)}></input>
        </div>);
}

export default CubeSettings;