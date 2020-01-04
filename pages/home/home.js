// pages/home/home.js
import {TestData} from "../../config/testdata";
import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE: null,
        bannerB: null,
        grid: [],
        activityD: null,
        spuPaging: null,
        loadingType: 'loading'
    },


    async onLoad(options) {
        // this.initAllData();
        // this.initBottomSpuList();

        let themeESpu = [];
        const themeE = TestData.locationThemeE.data[0];
        if (themeE.online) {
            const data = TestData.locationThemeE.data[0];
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
            }
        }

        this.setData({
            activityD: TestData.locationActivityD.data[0],
            bannerB: TestData.locationBannerB.data[0],
            bannerG: TestData.locationBannerG.data[0],
            grid: TestData.locationCategoryC.data,
            themeA: TestData.locationThemeA.data[0],
            themeE: TestData.locationThemeE.data[0],
            themeESpu,
            themeF: TestData.locationThemeF.data[0],
            themeH: TestData.locationThemeH.data[0]
        });

        const data = TestData.locationSpuI.data[0];
        wx.lin.renderWaterFlow(data.items);
    },

    async initBottomSpuList() {
        const paging = SpuPaging.getLatestPaging();
        this.data.spuPaging = paging;
        const data = paging.getMoreData();
        if (!data) {
            return;
        }
        wx.lin.renderWaterFlow(data.items)
    },

    async initAllData() {
        const theme = new Theme();
        await theme.getThemes();
        const themeA = theme.getHomeLocationA();
        const themeE = theme.getHomeLocationE();
        let themeESpu = [];
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu();
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
            }
        }

        const themeF = theme.getHomeLocationF();
        const themeH = theme.getHomeLocationH();

        const bannerB = await Banner.getHomeLocationB();
        const grid = await Category.getHomeLocationC();
        const activityD = await Activity.getHomeLocationD();
        const bannerG = await Banner.getHomeLocationG();


        this.setData({
            activityD,
            bannerB,
            bannerG,
            grid,
            themeA,
            themeE,
            themeESpu,
            themeF,
            themeH
        });
    },


    onPullDownRefresh() {

    },


    async onReachBottom() {
        // //加载更多数据
        // const data = await this.data.spuPaging.getMoreData();
        // if (!data) {
        //     return;
        // }
        //
        // wx.lin.renderWaterFlow(data.items);
        // if (!data.moreData) {
        //     this.setData({
        //         loadingType: 'end'
        //     })
        // }

        this.setData({
            loadingType: 'end'
        })
    },


    onShareAppMessage() {

    }
})