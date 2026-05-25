import { useRef } from "react";
import { Figure, SingleHyperbole } from "../../../../modules/math3D";

type TSettings = {
    figure: Figure
}

const SingleHyperboleSettings: React.FC <TSettings> = ({figure}) => {
    
    const xRef = useRef <HTMLInputElement>(null!);
    const yRef = useRef <HTMLInputElement>(null!);
    const zRef = useRef <HTMLInputElement>(null!);

    const keyupInputX = (event: React.KeyboardEvent) => {
        const value = Number((event.target as HTMLInputElement).value);
        const y = Number(yRef.current.value);
        const z = Number(zRef.current.value);
        if (!isNaN(value)) {
            (figure as SingleHyperbole).setCenter(value, y, z);
        }
    }

    const keyupInputY = (event: React.KeyboardEvent) => {
        const value = Number((event.target as HTMLInputElement).value);
        const x = Number(xRef.current.value);
        const z = Number(zRef.current.value);
        if (!isNaN(value)) {
            (figure as SingleHyperbole).setCenter(x, value, z);
        }
    }

    const keyupInputZ = (event: React.KeyboardEvent) => {
        const value = Number((event.target as HTMLInputElement).value);
        const x = Number(xRef.current.value);
        const y = Number(yRef.current.value);
        if (!isNaN(value)) {
            (figure as SingleHyperbole).setCenter(x, y, value);
        }
    }

    const keyupInputA = (event: React.KeyboardEvent) => {
        const value = Number((event.target as HTMLInputElement).value);
        if (value > 0) {
            (figure as SingleHyperbole).setA(value);
        }
    }

    const keyupInputB = (event: React.KeyboardEvent) => {
        const value = Number((event.target as HTMLInputElement).value);
        if (value > 0) {
            (figure as SingleHyperbole).setB(value);
        }
    }

    const keyupInputC = (event: React.KeyboardEvent) => {
        const value = Number((event.target as HTMLInputElement).value);
        if (value > 0) {
            (figure as SingleHyperbole).setC(value);
        }
    }

    const keyupInputCount = (event: React.KeyboardEvent) => {
        const value = Number((event.target as HTMLInputElement).value);
        if (value > 4) {
            (figure as SingleHyperbole).setCount(value);
        }
    }

    const keyupInputColor = (event: React.KeyboardEvent) => {
        const value = String((event.target as HTMLInputElement).value);
        if (value.length === 7) {
            (figure as SingleHyperbole).setColor(value);
        }
    }

    return (
        <div className="flex_r mar_b">
            <input className="cInput output mar_r" ref={xRef} placeholder="x" onKeyUp={(event) => keyupInputX(event)}></input>
            <input className="cInput output mar_r" ref={yRef} placeholder="y" onKeyUp={(event) => keyupInputY(event)}></input>
            <input className="cInput output mar_r" ref={zRef} placeholder="z" onKeyUp={(event) => keyupInputZ(event)}></input>
            <input className="cInput output mar_r" placeholder="a" onKeyUp={(event) => keyupInputA(event)}></input>
            <input className="cInput output mar_r" placeholder="b" onKeyUp={(event) => keyupInputB(event)}></input>
            <input className="cInput output mar_r" placeholder="c" onKeyUp={(event) => keyupInputC(event)}></input>
            <input className="cInput output mar_r" placeholder="count" onKeyUp={(event) => keyupInputCount(event)}></input>
            <input className="cInput output mar_r" placeholder="color" onKeyUp={(event) => keyupInputColor(event)}></input>
        </div>
    );
}

export default SingleHyperboleSettings;