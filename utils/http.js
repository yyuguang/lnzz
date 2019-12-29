/**
 * @Description:
 * @author 冷暖自知
 * @date 2019/12/19 22:16
 */

import {config} from "../config/config";
import {promisic} from "./util";

class Http {
    static async request({
                       url,
                       data,
                       method = 'GET'
                   }) {
       const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appkey: config.appkey
            }
        });
        return res.data
    }
}

export {
    Http
}