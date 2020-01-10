/**
 * @Description:
 * @author 冷暖自知
 * @date 2020/1/10 14:19
 */
import {Paging} from "../utils/paging";

class Search {
    static search(q) {
        return new Paging({
            url: `search?q=${q}`
        })
    }
}

export {
    Search
}