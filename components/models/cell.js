/**
 * @Description:
 * @author 冷暖自知
 * @date 2019/12/31 17:53
 */
import {CellStatus} from "../../core/enum";

class Cell {
    title;
    id;
    status = CellStatus.WAITING;
    spec;
    skuImg;

    constructor(spec) {
        this.title = spec.value;
        this.id = spec.value_id;
        this.spec = spec;
    }

    getCellCode() {
        return this.spec.key_id + '-' + this.spec.value_id;
    }
}

export {
    Cell
}