/**
 * @Description:
 * @author 冷暖自知
 * @date 2019/12/20 17:38
 */
import {Http} from "../utils/http";

class Activity {
    static LocationD = 'a-2';

    static async getHomeLocationD() {
        return Http.request({
            url: `activity/name/${Activity.LocationD}`
        })
    }
}

export {
    Activity
}