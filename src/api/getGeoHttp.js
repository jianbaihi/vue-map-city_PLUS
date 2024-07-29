import request from './request'

// 获取城市位置信息,高亮图层显示
export function getCityGeo(adcode){
    // https://geo.datav.aliyun.com/areas_v3/bound/320100.json
    return request.get(`geo/${adcode}.json`)
}