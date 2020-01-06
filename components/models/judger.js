/**
 * @Description:
 * @author 冷暖自知
 * @date 2020/1/4 15:12
 */
import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

class Judger {

    fenceGroup;
    pathDict = [];
    skuPending;

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup;
        this._initPathDict();
        this._initSkuPending();
    }

    _initSkuPending() {
        this.skuPending = new SkuPending();
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
        this._changeCurrentCellStatus(cell, x, y);

        //改变状态
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y);
            const isIn = this._isInDict(path);
            if (!path) {
                return
            }
            if (isIn) {
                this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING;
            } else {
                this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN;
            }
        });
    }

    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED;
            this.skuPending.insertCell(cell, x);
        }
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING;
            this.skuPending.removeCell(x);
        }
    }

    /**
     * 是否在字典中
     * @param path
     * @returns {boolean}
     * @private
     */
    _isInDict(path) {
        return this.pathDict.includes(path);
    }

    /**
     * 寻找潜在路径
     * @param cell
     * @param x
     * @param y
     * @returns {string}
     * @private
     */
    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner('#')
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPending.findSelectedCellByX(i);
            if (x === i) {
                // 当前行
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }
                const cellCode = this._getCellCode(cell.spec);
                joiner.join(cellCode)
            } else {
                // 其他行
                if (selected) {
                    const selectedCellCode = this._getCellCode(selected.spec);
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }

    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id;
    }
}

export {
    Judger
}