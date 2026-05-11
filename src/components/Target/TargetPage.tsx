import { useRef, useMemo, useState } from "react";

import Target from "../../modules/target/Target";

import './TargetPage.css';

const TargetPage: React.FC = () => {
    const target = new Target();
    const [isManual, setManual] = useState<Boolean>(true);
    const inputXRef = useRef<HTMLInputElement>(null!);
    const inputYRef = useRef<HTMLInputElement>(null!);
    const inputX0Ref = useRef<HTMLInputElement>(null!);
    const inputY0Ref = useRef<HTMLInputElement>(null!);
    const countRef = useRef<HTMLInputElement>(null!);
    const resultRef = useRef<HTMLDivElement>(null!);
    const scoresRef = useRef<HTMLDivElement>(null!);
    let scores: number;
    scores = useMemo(() => scores = 0, []);

    const shotHandler = () => {
        const x0 = Number((inputX0Ref.current as HTMLInputElement).value) || 0;
        const y0 = Number((inputY0Ref.current as HTMLInputElement).value) || 0;
        if (isManual) {
            const x = Number((inputXRef.current as HTMLInputElement).value) || 0;
            const y = Number((inputYRef.current as HTMLInputElement).value) || 0;
            const result: number = target.shootOnTarget(x, y, x0, y0);
            scores += result;
            resultRef.current.innerHTML = `Получил: ${result}`;
        } else {
            let sum = 0;
            const count = Number((countRef.current as HTMLInputElement).value) || 1;
            for (let i = 0; i < count; i++) {
                let randomX = Math.random() * 4 - 2;
                let randomY = Math.random() * 4 - 2;
                const result = target.shootOnTarget(randomX, randomY, x0, y0);
                scores += result;
                sum += result;
                resultRef.current.innerHTML = `Получил: ${sum}`;
            }
        }
        scoresRef.current.innerHTML = `Всего: ${scores}`;
    }

    const shotReset = () => {
        scores = 0;
        resultRef.current.innerHTML = `Reset: Прошёл успешно!`;
        scoresRef.current.innerHTML = `Всего: ${scores}`;
    }

    return (
        <div className="flex_c iconTop center">
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
                    <input className="checkbox" type="checkbox" onChange={() => setManual(!isManual)}/>
                </label>  
            </div>

            </div>

            <div ref={resultRef} className="max output"></div>
            <div ref={scoresRef} className="max output"></div>
        </div>);
}

export default TargetPage;