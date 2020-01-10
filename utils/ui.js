/**
 * @Description:
 * @author 冷暖自知
 * @date 2020/1/10 14:54
 */

const showToast = function (title) {
    wx.showToast({
        icon: "none",
        duration: 2000,
        title
    })
};

export {
    showToast
}