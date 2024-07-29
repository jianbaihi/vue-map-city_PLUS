import request from './request'

// 获取IP地址所在城市
export function getIPCity(){
    return request.get('map/ip')
}

// 获取天气信息
export function getWeather(city){
    return request.get(`map/weather/weatherInfo?city=${city}`)
}

// 获取城市位置信息
export function getCityLocation(city){
    return request.get(`map/geocode/geo?address=${city}`)
}

