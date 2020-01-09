// pages/detail/detail.js
import {Spu} from "../../models/spu";
import {TestData} from "../../config/testdata";
import {ShoppingWay} from "../../core/enum";
import {SaleExplain} from "../../models/sale-explain";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showRealm: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        // const pid = options.pid;
        // const spu = await Spu.getDetail(pid);
        // const explain = await SaleExplain.getFixed();
        // this.setData({
        //     spu,
        //     explain
        // })
        const explain = this._initSaleExplain();
        this.setData({
            spu: TestData.locationWithSpu.data[0],
            explain
        });
        console.log(TestData.locationSaleExplainG)
    },

    _initSaleExplain() {
        const explains = TestData.locationSaleExplainG;
        return explains.map(e => {
            return e.text;
        })
    },

    onAddToCart(event) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.CART
        });
    },
    onBuy(event) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.BUY
        });
    },
    onGotoHome(event) {
        wx.switchTab({
            url: '/pages/home/home'
        })
    },

    onGotoCart(event) {
        wx.switchTab({
            url: '/pages/cart/cart'
        })
    },
    onSpecChange(event) {
        this.setData({
            specs: event.detail
        })
    },

    onReady() {

    },
    onShareAppMessage() {
    },

});