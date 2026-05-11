export type TMatrix = number[][];

class Matrix {

    matrixCreate(fill: number, count: number): TMatrix{
        let matrix: TMatrix = [];
        for(let i = 0; i < count; i++){
            matrix.push([]);
            for(let j = 0; j < count; j++){
                matrix[i].push(fill);
            }
        }
        return matrix;
    }

    matrixMainDiagonal(count: number): TMatrix{
        let matrix = this.matrixCreate(0,count);
        for(let i = 0; i < count; i++){
            matrix[i][i] = 1;
        }
        return matrix;
    }

    matrixSideDiagonal(count: number): TMatrix{
        let matrix = this.matrixCreate(0,count);
        for(let i = 0; i < count; i++){
            matrix[i][count-1-i] = 1;
        }
        return matrix;
    }

    matrixUpRight(count: number): TMatrix{
        let matrix = this.matrixCreate(1,count);
        for(let i = count-1; i !== -1; i--){
            for(let j = 0; j < i; j++){
                matrix[i][j] = 0;
            }
        }
        return matrix;
    }

    matrixDownLeft(count: number): TMatrix{
        let matrix = this.matrixCreate(0,count);
        for(let i = 0; i < count; i++){
            for(let j = 0; j < i+1; j++){
                matrix[i][j] = 1;
            }
        }
        return matrix;
    }

    matrixQuarters(count: number): TMatrix{
        let matrix = this.matrixCreate(0,count);
        for(let i = 0; i < count / 2; i++){
            for(let j = i + 1; j < count - 1 - i; j++){
                matrix[i][j] = 1;
            }
        }
        for(let i = Math.round(count / 2); i < count; i++){
            for(let j = count - i; j < i; j++){
                matrix[i][j] = 3;
            }
        }
        for(let i = 0; i < count / 2; i++){
            for(let j = 0; j < i; j++){
                matrix[i][j] = 4;
            }
        }
        for(let i = Math.round(count / 2); i < count; i++){
            for(let j = 0; j < count - 1 - i; j++){
                matrix[i][j] = 4;
            }
        }
        for(let i = 0; i < count / 2; i++){
            for(let j = count - i; j < count; j++){
                matrix[i][j] = 2;
            }
        }
        for(let i = Math.round(count / 2); i < count; i++){
            for(let j = i + 1; j < count; j++){
                matrix[i][j] = 2;
            }
        }
        return matrix;
    }

    matrixRow(count: number): TMatrix{
        let matrix = this.matrixCreate(0,count);
        for(let i = 0; i < count; i++){
            for(let j = 0; j < count; j++){
                matrix[i][j] = i + 1;
            }
        }
        return matrix;
    }

    matrixCol(count: number): TMatrix{
        let matrix = this.matrixCreate(0,count);
        for(let i = 0; i < count; i++){
            for(let j = 0; j < count; j++){
                matrix[i][j] = j + 1;
            }
        }
        return matrix;
    }

    matrixSquareMaxInside(count: number): TMatrix{
        let matrix = this.matrixCreate(0,count);
        for(let n = 0; n < count / 2; n++){
            for(let j = n; j < count - n; j++){
                matrix[n][j] = n + 1;
                matrix[count-1-n][j] = n + 1;
            }
        }
        for(let n = 0; n < count / 2; n++){
            for(let i = n; i < count - 1 - n; i++){
                matrix[i][n] = n + 1;
                matrix[i][count-1-n] = n + 1;
            }
        }
        return matrix;
    }

    matrixSquareMinInside(count: number): TMatrix{
        let matrix = this.matrixCreate(0,count);
        for(let n = 0; n < count / 2; n++){
            for(let j = n; j < count - n; j++){
                matrix[n][j] = Math.round(count / 2) - n;
                matrix[count-1-n][j] = Math.round(count / 2) - n;
            }
        }
        for(let n = 0; n < count / 2; n++){
            for(let i = n; i < count - 1 - n; i++){
                matrix[i][n] = Math.round(count / 2) - n;
                matrix[i][count-1-n] = Math.round(count / 2) - n;
            }
        }
        return matrix;
    }

    matrixSnake(count: number): TMatrix{
        let matrix = this.matrixCreate(0,count);
        let number = 1;
        for(let n = 0; n < count / 2; n++){
            for(let j = n; j < count - n; j++){
                matrix[n][count-1-j] = number;
                number++;
            }
            for(let i = n + 1; i < count - n; i++){
                matrix[i][n] = number;
                number++;
            }
            for(let j = n + 1; j < count - n; j++){
                matrix[count-1-n][j] = number;
                number++;
            }
            for(let i = n + 1; i < count - 1 - n; i++){
                matrix[count-1-i][count-1-n] = number;
                number++;
            }
        }
        return matrix;
    }

    matrixCircle(count: number): TMatrix{
        let matrix = this.matrixSquareMinInside(count);
        for(let i = 0; i < count; i++){
            matrix[i][i] = 0;
        }
        for(let i = 0; i < count; i++){
            matrix[i][count - 1 - i] = 0;
        }
        let center = Math.round((count - 1) / 2);
        (count % 2 === 0) ? matrix[center][center] = 0 : matrix[center][center] = 1;
        return matrix;
    }

    matrixEight(count: number): TMatrix{
        let matrix = this.matrixCreate(0,count);
        for(let i = 0; i < count / 2; i++){
            for(let j = i + 1; j < count - 1 - i; j++){
                matrix[i][j] = 1;
            }
        }
        for(let i = 0; i < count / 2; i++){
            for(let j = Math.round(count / 2); j < count - 1 - i; j++){
                matrix[i][j] = 2;
            }
        }
        for(let i = Math.round(count / 2); i < count; i++){
            for(let j = count - i; j < Math.round(count / 2); j++){
                matrix[i][j] = 6;
            }
        }
        for(let i = Math.round(count / 2); i < count; i++){
            for(let j = Math.round(count / 2); j < i; j++){
                matrix[i][j] = 5;
            }
        }
        for(let i = 0; i < count / 2; i++){
            for(let j = 0; j < i; j++){
                matrix[i][j] = 8;
            }
        }
        for(let i = Math.round(count / 2); i < count; i++){
            for(let j = 0; j < count - 1 - i; j++){
                matrix[i][j] = 7;
            }
        }
        for(let i = 0; i < count / 2; i++){
            for(let j = count - i; j < count; j++){
                matrix[i][j] = 3;
            }
        }
        for(let i = Math.round(count / 2); i < count; i++){
            for(let j = i + 1; j < count; j++){
                matrix[i][j] = 4;
            }
        }
        if (!(count % 2 === 0)){
            for(let j = 0; j < count; j++){
                matrix[Math.round(count/2)-1][j] = 0;
            }
        }
        if (!(count % 2 === 0)){
                for(let i = 0; i < count; i++){
                    matrix[i][Math.round(count/2)-1] = 0;
                }
        }
        return matrix;
    }

}

export default Matrix;