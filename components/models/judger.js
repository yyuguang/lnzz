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

    isSkuIntact() {
        return this.skuPending.isIntact();
    }

    _initSkuPending() {
        const specsLength = this.fenceGroup.fences.length;
        this.skuPending = new SkuPending(specsLength);
        const defaultSku = this.fenceGroup.getDefaultSku();
        if (!defaultSku) {
            return
        }
        this.skuPending.init(defaultSku);
        this._initSelectedCell();
        this.judge(null, null, null, true);
    }

    /**
     * 初始化已选择Cell
     * @private
     */
    _initSelectedCell() {
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED);
        });
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

    getCurrentValues() {
        return this.skuPending.getCurrentSpecValues();
    }

    getMissingKeys() {
        const missingKeysIndex = this.skuPending.getMissingSpecKeysIndex();
        return missingKeysIndex.map(i => {
            return this.fenceGroup.fences[i].title;
        })
    }

    judge(cell, x, y, isInit = false) {
        if (!isInit) {
            this._changeCurrentCellStatus(cell, x, y);
        }

        //改变状态
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y);
            const isIn = this._isInDict(path);
            if (!path) {
                return
            }
            if (isIn) {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING);
            } else {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN);
            }
        });
    }

    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED);
            this.skuPending.insertCell(cell, x);
        }
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING);
            this.skuPending.removeCell(x);
        }
    }

    getDeterminateSku() {
        const code = this.skuPending.getSkuCode();
        return this.fenceGroup.getSku(code);
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