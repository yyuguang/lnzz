/**
 * @Description:
 * @author 冷暖自知
 * @date 2019/12/20 15:24
 */
import {Http} from "../utils/http";

class Category {
    static async getHomeLocationC() {
        return await Http.request({
            url: `category/grid/all`
        })
    }
}

export {
    Category
}