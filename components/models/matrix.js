/**
 * @Description: 处理矩阵
 * @author 冷暖自知
 * @date 2019/12/31 16:27
 */
class Matrix {
    m;

    constructor(matrix) {
        this.m = matrix
    }

    //获取矩阵行数
    get rowsNum() {
        return this.m.length;
    }

    //获取矩阵列数
    get colsNum() {
        return this.m[0].length;
    }

    forEach(cb) {
        for (let j = 0; j < this.colsNum; j++) {
            for (let i = 0; i < this.rowsNum; i++) {
                const element = this.m[i][j]
                cb(element, i, j)
            }
        }
    }

    transpose() {
        const desArr = [];
        for (let j = 0; j < this.colsNum; j++) {
            desArr[j] = [];
            for (let i = 0; i < this.rowsNum; i++) {
                desArr[j][i] = this.m[i][j];
            }
        }
        return desArr;
    }
}

export {
    Matrix
}