<template>
  <div class="weather" v-if="currentCity">
    <table>
      <tr>
        <td>城市</td>
        <td>{{currentCity.city}}</td>
      </tr>
      <tr>
        <td>天气</td>
        <td>{{ currentCity.weather }}</td>
      </tr>
      <tr>
        <td>温度</td>
        <td>{{ currentCity.temperature }}°C</td>
      </tr>
      <tr>
        <td>风向</td>
        <td>{{ currentCity.winddirection }}</td>
      </tr>
      <tr>
        <td>风力</td>
        <td>{{ currentCity.windpower }}级</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import {toRefs,onMounted,ref,watch} from 'vue';
import { useCityStore } from '../../../stores/city';
import {getWeather} from '../../../api/getMapHttp'
const $store = useCityStore();
const {city} = toRefs($store);

const currentCity = ref({})
// onMounted(() => {
//     currentCity.value = city.value;
//     getWeather($store.city).then(res => {
//         console.log(res.lives[0]);
//         currentCity.value = res.lives[0];
//     })
// })
watch(city,(val)=>{
    getWeather(val).then(res => {
        // console.log(res.lives[0]);
        if(res.lives[0]){
            currentCity.value = res.lives[0];
        }else{
            currentCity.value = ''
        }
        
    })
},{immediate:true})
</script>

<style scoped>
.weather {
    position: fixed;
    right: 20px;
    top: 70px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 0 3px 2px #333;
    background: #2193b0a1;
    background: -webkit-linear-gradient(to top, #6dd5ed, #2193b0);
    background: linear-gradient(to top, #6dd5edb0, #2193b0);
    z-index: 100;
}
table {
    color: #fff;
    text-align: center;
    width: 200px;
    line-height: 30px;
    border-radius: 15px;
    font-size: 15px;
}
table, td {
    border-collapse: collapse;
}
td {
    border: 1px solid #eeeeee79;
}
</style>
