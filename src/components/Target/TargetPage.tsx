import { useRef, useMemo, useState } from "react";

import Target from "../../modules/target/Target";

import './TargetPage.css';

const TargetPage = () => {
    const target = new Target();
    const [isManual, setManual] = useState(true);
    const inputXRef = useRef<HTMLInputElement>(null);
    const inputYRef = useRef<HTMLInputElement>(null);
    const inputX0Ref = useRef<HTMLInputElement>(null);
    const inputY0Ref = useRef<HTMLInputElement>(null);
    const countRef = useRef<HTMLInputElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const scoresRef = useRef<HTMLDivElement>(null);
    let scores: Number;
    scores = useMemo(() => scores = 0, []);

    const shotHandler = () => {
        const x = Number(inputXRef.current?.value) || 0;
        const y = Number(inputYRef.current?.value) || 0;
        const x0 = Number(inputX0Ref.current?.value) || 0;
        const y0 = Number(inputY0Ref.current?.value) || 0;
        const count = Number(countRef.current?.value) || 0;
        if (isManual) {
            const result = target.shootOnTarget(x, y, x0, y0);
            scores =+ result;
            if (resultRef.current) {
                resultRef.current.innerHTML = `Получил: ${result}`;
            }
        } else {
            let sum = 0;
            for (let i = 0; i < count; i++) {
                let randomX = Math.random() * 4 - 2;
                let randomY = Math.random() * 4 - 2;
                const result = target.shootOnTarget(randomX, randomY, x0, y0);
                scores =+ result;
                sum += result;
                if (resultRef.current) {
                    resultRef.current.innerHTML = `Получил: ${sum}`;
                }
            }
        }
        if (scoresRef.current) {
            scoresRef.current.innerHTML = `Всего: ${scores}`;
        }
    }

    const shotReset = () => {
        scores = 0;
        if (resultRef.current && scoresRef.current) {
            resultRef.current.innerHTML = `Reset: Прошёл успешно!`;
            scoresRef.current.innerHTML = `Всего: ${scores}`;
        }
    }

    return (
        <div className="flex_c iconTop">
            <div className="flex_r">

            {isManual ?
                <div>
                    <p><input placeholder="X" ref={inputXRef}/></p>
                    <p><input placeholder="Y" ref={inputYRef}/></p>  
                </div> 
                :
                <p><input placeholder="Count" ref={countRef}/></p>
            }
            
            <p><input placeholder="X0" ref={inputX0Ref}/></p>
            <p><input placeholder="Y0" ref={inputY0Ref}/></p>
     
            <div className="flex_c">
                <div className="flex_r">
                    <p><button className="max_b" onClick={() => shotHandler()}>fire</button></p>
                    <p><button className="max_b" onClick={() => shotReset()}>reset</button></p>
                </div>

                <label className="max_l output">Ручная стрельба?
                    <input className="checkbox" type="checkbox" onChange={() => setManual(!isManual)} defaultChecked={isManual}/>
                </label>  
            </div>

            </div>

            <div ref={resultRef} className="max output"></div>
            <div ref={scoresRef} className="max output"></div>
        </div>);
}

export default TargetPage;