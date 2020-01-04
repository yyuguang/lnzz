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

    constructor(spec) {
        this.title = spec.value;
        this.id = spec.value_id;
    }
}

export {
    Cell
}