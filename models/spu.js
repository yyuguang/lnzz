/**
 * @Description:
 * @author 冷暖自知
 * @date 2019/12/31 14:39
 */
import {Http} from "../utils/http";

class Spu {
    static isNoSpec(spu) {
        return spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0;
    }

    static getDetail(id) {
        return Http.request({
            url: `spu/id/${id}/detail`
        });
    }
}

export {
    Spu
}