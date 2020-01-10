/**
 * @Description:
 * @author 冷暖自知
 * @date 2020/1/10 13:47
 */
import {Http} from "../utils/http";
import {TestData} from "../config/testdata";

class Tag {
    static getSearchTags() {
        // return Http.request({
        //     url: `tag/type/1`
        // })
        return TestData.locationTagL;
    }
}

export {
    Tag
}