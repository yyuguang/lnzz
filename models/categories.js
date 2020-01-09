/**
 * @Description:
 * @author 冷暖自知
 * @date 2020/1/9 20:28
 */
import {Http} from "../utils/http";
import {TestData} from "../config/testdata";

class Categories {
    roots = [];
    subs = [];

    async getAll() {
        // const data = await Http.request({
        //     url: `category/all`
        // });
        const data = TestData.locationCategoryK;
        this.roots = data.roots;
        this.subs = data.subs;
    }

    getRoots() {
        return this.roots;
    }

    getRoot(rootId) {
        return this.roots.find(r => r.id == rootId);
    }

    getSubs(parentId) {
        return this.subs.filter(sub => sub.parent_id == parentId);
    }
}

export {
    Categories
}