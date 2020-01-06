/**
 * @Description:拼接工具类
 * @author 冷暖自知
 * @date 2020/1/6 20:26
 */

class Joiner {
    _str = ''
    _symbol = '-'
    _cutCharNum = 1

    constructor(symbol, cutCharNum) {
        if (symbol) {
            this._symbol = symbol
        }
        if (cutCharNum) {
            this._cutCharNum = cutCharNum
        }
    }

    join(part) {
        if (part) {
            this._str += `${part}${this._symbol}`;
        }
    }

    getStr() {
        return this._str.substring(0, this._str.length - this._cutCharNum)
    }

}

export {
    Joiner
}