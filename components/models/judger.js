/**
 * @Description:
 * @author 冷暖自知
 * @date 2020/1/4 15:12
 */
import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";

class Judger {

    fenceGroup;
    pathDict = [];

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup;
        this._initPathDict();
    }

    /**
     * 初始化路径字典
     */
    _initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
    }

    judge(cell, x, y) {
        console.log(cell, x, y);
        this._changeCellStatus(cell, x, y)
    }

    _changeCellStatus(cell, x, y) {
        console.log(cell, x, y);
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
        }
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
        }
    }
}

export {
    Judger
}