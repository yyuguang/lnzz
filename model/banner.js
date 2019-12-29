/**
 * @Description: Banner业务层
 * @author 冷暖自知
 * @date 2019/12/20 10:53
 */
import {Http} from "../utils/http";

class Banner {
    static locationB = 'b-1';
    static locationG = 'b-2';

    static async getHomeLocationB(name) {
        return await Http.request({
            url: `banner/name/${Banner.locationB}`
        })
    }

    static async getHomeLocationG() {
        return await Http.request({
            url: `banner/name/${Banner.locationG}`
        })
    }
}

export {
    Banner
}