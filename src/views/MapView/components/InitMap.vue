<template>
<div id="map"></div>
</template>

<script setup>
import {app} from '../../../main.js'
import {onMounted} from 'vue'

onMounted(()=>{
    // 设置瓦片图层
    const gaode = new ol.layer.Tile({
        title:'高德地图',
        source:new ol.source.XYZ({
            url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
            wrapX:false,
        })
    })
    // 实例化地图
    const map = new ol.Map({
        target:'map',
        layers:[gaode],
        view:new ol.View({
            center:[114.3,30.5],
            zoom:4,
            projection: 'EPSG:4326'
        })
    })
    // 全局挂载地图实例
    app.config.globalProperties.$map = map
})


</script>

<style scoped>
#map{
    width:100vw;
    height:100vh;
}
</style>