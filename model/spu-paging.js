/**
 * @Description:
 * @author 冷暖自知
 * @date 2019/12/30 19:06
 */
import {Paging} from "../utils/paging";

class SpuPaging {
    static getLatestPaging() {
        return new Paging({
            url: `spu/latest`
        }, 3)
    }
}

export {
    SpuPaging
}