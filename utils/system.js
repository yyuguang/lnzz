/**
 * @Description:
 * @author 冷暖自知
 * @date 2020/1/9 18:07
 */

import {promisic} from "./util";
import {px2rpx} from "../miniprogram_npm/lin-ui/utils/util";


const getSystemSize = async function () {
    const res = await promisic(wx.getSystemInfo)();
    return {
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth,
        screenWidth: res.screenWidth,
        screenHeight: res.screenHeight,
    }
};

const getWindowHeightRpx = async function () {
    const res = await getSystemSize();
    return px2rpx(res.windowHeight);
};

export {
    getSystemSize,
    getWindowHeightRpx
}