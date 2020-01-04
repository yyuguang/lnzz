// pages/detail/detail.js
import {Spu} from "../../models/spu";
import {TestData} from "../../config/testdata";

Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        // const pid = options.pid;
        // const spu = await Spu.getDetail(pid);
        // this.setData({
        //     spu
        // })

        this.setData({
            spu: TestData.locationWithSpu.data[0]
        })

        console.log(TestData.locationWithSpu.data[0])
    }
})