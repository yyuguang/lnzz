/**
 * @Description:
 * @author 冷暖自知
 * @date 2020/1/9 15:49
 */
import {Http} from "../utils/http";

class SaleExplain {
    static async getFixed() {
        const explains = await Http.request({
            url: `sale_explain/fixed`
        });
        return explains.map(e => {
            return e.text;
        })
    }
}

export {
    SaleExplain
}