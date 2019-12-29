// pages/home/home.js
import {TestData} from "../../config/testdata";
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE: null,
        bannerB: null,
        grid: [],
        activityD: null
    },


    async onLoad(options) {
        //this.initAllData()

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

        console.log(TestData.locationThemeH.data[0])
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


    onReachBottom() {

    },


    onShareAppMessage() {

    }
})