/**
 * @Description:
 * @author 冷暖自知
 * @date 2019/12/31 14:39
 */
import {Http} from "../utils/http";

class Spu {
    static getDetail(id) {
        return Http.request({
            url: `spu/id/${id}/detail`
        });
    }
}

export {
    Spu
}