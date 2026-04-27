import { useRef } from "react";
import Matrix from "../../modules/matrix/Matrix";

type TMatrix = number[][];

const MatrixPage: React.FC = () => {
    const matrix: Matrix = new Matrix();
    let currentMatrix: TMatrix = [];
    const countRef = useRef<HTMLInputElement>(null);
    const matrixRef = useRef<HTMLDivElement>(null);
    
    const matrixCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
        const count = Number(countRef.current?.value) || 0;
        const colLine = [];
        for (let i = 0; i < count; i++) {
            colLine.push('<div>|</div><div>_</div>');
        }
        if (matrixRef.current){
            matrixRef.current.innerHTML = '';
        }
        const data = (event.target as HTMLButtonElement).dataset.matrix;
        switch (data) {
            case 'matrixMainDiagonal': currentMatrix = matrix.matrixMainDiagonal(count); break;
            case 'matrixSideDiagonal': currentMatrix = matrix.matrixSideDiagonal(count); break;
            case 'matrixDownLeft': currentMatrix = matrix.matrixDownLeft(count); break;
            case 'matrixUpRight': currentMatrix = matrix.matrixUpRight(count); break;
            case 'matrixQuarters': currentMatrix = matrix.matrixQuarters(count); break;
            case 'matrixRow': currentMatrix = matrix.matrixRow(count); break;
            case 'matrixCol': currentMatrix = matrix.matrixCol(count); break;
            case 'matrixSquareMaxInside': currentMatrix = matrix.matrixSquareMaxInside(count); break;
            case 'matrixSquareMinInside': currentMatrix = matrix.matrixSquareMinInside(count); break;
            case 'matrixSnake': currentMatrix = matrix.matrixSnake(count); break;
            case 'matrixCircle': currentMatrix = matrix.matrixCircle(count); break;
            case 'matrixEight': currentMatrix = matrix.matrixEight(count); break;
        }
        for (let i = 0; i < currentMatrix.length; i++) {
            let col = [];
            for (let j = 0; j < currentMatrix.length; j++) {
                col.push(`<div>${currentMatrix[j][i]}</div>`);
            }
            if (matrixRef.current) {
                matrixRef.current.innerHTML += `<div className="flex_r">${col}</div>`;
                matrixRef.current.innerHTML = matrixRef.current.innerHTML.replaceAll(',','_');
                
                matrixRef.current.innerHTML += `<div className="flex_r">${colLine}</div>`;
                matrixRef.current.innerHTML = matrixRef.current.innerHTML.replaceAll(',','');
            }
            
            
        }
    }

    return (
            <div className="iconTop">

            <input ref={countRef} placeholder="size"></input>

            <div className="flex_c">
                <div className="flex_r">
                    <button onClick={(event) => matrixCreate(event)} data-matrix="matrixMainDiagonal">Создать матрицу главная диагональ</button>
                    <button onClick={(event) => matrixCreate(event)} data-matrix="matrixSideDiagonal">Создать матрицу побочная диагональ</button>
                    <button onClick={(event) => matrixCreate(event)} data-matrix="matrixDownLeft">Создать матрицу вниз лево</button>
                    <button onClick={(event) => matrixCreate(event)} data-matrix="matrixUpRight">Создать матрицу вверх право</button>
                    <button onClick={(event) => matrixCreate(event)} data-matrix="matrixQuarters">Создать матрицу четверти</button>
                    <button onClick={(event) => matrixCreate(event)} data-matrix="matrixRow">Создать матрицу строки</button>
                    <button onClick={(event) => matrixCreate(event)} data-matrix="matrixCol">Создать матрицу колонны</button>
                </div>
                
                <div className="flex_r">
                    <button onClick={(event) => matrixCreate(event)} data-matrix="matrixSquareMaxInside">Создать матрицу квадраты вовнутрь</button>
                    <button onClick={(event) => matrixCreate(event)} data-matrix="matrixSquareMinInside">Создать матрицу квадраты наружу</button>
                    <button onClick={(event) => matrixCreate(event)} data-matrix="matrixSnake">Создать матрицу змейку</button>
                    <button onClick={(event) => matrixCreate(event)} data-matrix="matrixCircle">Создать матрицу круг</button>
                    <button onClick={(event) => matrixCreate(event)} data-matrix="matrixEight">Создать матрицу восьмёрку</button>
                </div>
                
            </div>

            <div className="flex_r output max" ref={matrixRef}></div>
        </div>);
}

export default MatrixPage;