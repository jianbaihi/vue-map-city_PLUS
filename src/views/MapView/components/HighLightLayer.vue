<template>
  <div></div>
</template>

<script setup>
import { ref, watch, onMounted, getCurrentInstance, toRefs } from 'vue'
import { getCityGeo } from '../../../api/getGeoHttp'
import { getCityLocation } from '../../../api/getMapHttp'
import { useCityStore } from '../../../stores/city'
const $store = useCityStore()
const { city } = toRefs($store)
const { proxy } = getCurrentInstance()

// onMounted(async () => {
//   const $map = proxy.$map
//   // 获取城市的adcode
//   //   if (!val) return
//   //   val = val+'市'
//   let city = $store.city + '市'
//   let result = await getCityLocation(city)
//   let { adcode, location } = result.geocodes[0]
//   location = location.split(',')
//   const res = await getCityGeo(adcode)
//   // 处理数据
//   let feature = new ol.format.GeoJSON().readFeatures(res)[0]
//   // 创建矢量图层
//   const source = new ol.source.Vector({})
//   const layer = new ol.layer.Vector({
//     source: source,
//   })
//   $map.addLayer(layer)
//   // 添加要素到矢量图层
//   source.addFeature(feature)
//   // 设置高亮样式
//   layer.setStyle(
//     new ol.style.Style({
//       fill: new ol.style.Fill({
//         color: '#33333380',
//       }),
//       stroke: new ol.style.Stroke({
//         color: '#ff2d51',
//         width: 1.5,
//       }),
//     })
//   )
//   // 漫游动画
//   $map.getView().animate({
//     center: location,
//     zoom: 8,
//     duration: 1000,
//   })
// })
let $map = null
onMounted(() => {
    console.log(222)
    $map = proxy.$map
})
watch(city, async () => {
    console.log(111)
    // const $map = app.config.globalProperties.$map
// const $map = proxy.$map
  // 获取城市的adcode
//   console.log(city.value)
  let result = await getCityLocation($store.city)
  let { adcode, location } = result.geocodes[0]
  location = location.split(',')
  const res = await getCityGeo(adcode)
  // 处理数据
  console.log(res)
  let feature = new ol.format.GeoJSON().readFeatures(res)[0]
  // 创建矢量图层
  const source = new ol.source.Vector({})
  const layer = new ol.layer.Vector({
    source: source,
  })
  $map.addLayer(layer)
  // 添加要素到矢量图层
  source.addFeature(feature)
  // 设置高亮样式
  layer.setStyle(
    new ol.style.Style({
      fill: new ol.style.Fill({
        color: '#33333380',
      }),
      stroke: new ol.style.Stroke({
        color: '#ff2d51',
        width: 1.5,
      }),
    })
  )
  // 漫游动画
  $map.getView().animate({
    center: location,
    zoom: 7,
    duration: 1000,
  })
},{immediate: true})
</script>

<style scoped></style>
