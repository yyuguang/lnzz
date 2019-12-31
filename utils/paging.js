/**
 * @Description:
 * @author 冷暖自知
 * @date 2019/12/30 20:00
 */
import {Http} from "./http";
import boolean from "../miniprogram_npm/lin-ui/common/async-validator/validator/boolean";

class Paging {

    start;
    count;
    req;
    locker = false; // 锁
    url;
    moreData = true;
    accumulator = [];//累加器

    constructor(req, count = 10, start = 0) {
        this.start = start;
        this.count = count;
        this.req = req;
        this.url = req.url;
    }

    async getMoreData() {
        if (!this.moreData) {
            return;
        }
        if (this._getLocker()) {
            return
        }
        const data = await this._actualGetData();
        this._releaseLocker();
        return data;
    }

    async _actualGetData() {
        const req = this._getCurrentReq();
        let paging = await Http.request(req);
        if (!paging) {
            return null;
        }

        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: this.accumulator
            }
        }

        this.moreData = Paging._moreData(paging.totalPage, paging.page);
        if (this.moreData) {
            this.start += this.count;
        }

        this._accumulate(paging.items);

        return {
            empty: true,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator
        }
    }

    _accumulate(items) {
        this.accumulator = this.accumulator.concat(items);
    }

    /**
     * 是否还有更多数据
     * @param totalPage
     * @param pageNum
     * @returns {boolean}
     * @private
     */
    static _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1;
    }

    /**
     * 获取当前请求对象
     * @private
     */
    _getCurrentReq() {
        let url = this.url;
        const params = `start=${this.start}&count=${this.count}`;

        if (url.includes('?')) {
            url += '&' + params;
        } else {
            url += '?' + params;
        }
        this.req.url = url;
        return this.req;
    }

    _getLocker() {
        if (this.locker) {
            return false;
        }
        this.locker = true;
        return true;
    }

    _releaseLocker() {
        this.locker = false;
    }

}

export {
    Paging
}