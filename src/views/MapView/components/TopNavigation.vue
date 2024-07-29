<template>
  <div>
    <div class="nav">
      <div class="location" @click="$router.push('/city')">
        {{ city }}
        <i class="iconfont ic_site"></i>
      </div>
      <div class="search">
        <i class="iconfont search1"
          @click="handleSearchCity(searchCity)"></i>
        <input 
          type="text" 
          placeholder="请输入你所在的城市"
          v-model="searchCity"
          @keydown.enter="handleSearchCity(searchCity)"
          />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref,onMounted,toRefs,watch} from 'vue'
import {useRouter} from 'vue-router'
import { useCityStore } from '../../../stores/city';
const $store = useCityStore()
const {city} = toRefs($store)
const $router = useRouter()

const searchCity = ref('')

const handleSearchCity = (searchCity) => {
  if(searchCity){
    $store.changeCity(searchCity)
  }
}

onMounted(()=>{
  searchCity.value = city.value
})
</script>

<style scoped>
    .nav {
        width: 100%;
        height: 62px;
        position: fixed;
        top: 0;
        display: flex;
        align-items: center;
        background-color: #4264fb;
        color: #fff;
        z-index: 10;
    }
    .location {
        width: 88px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #ffd04b;
        cursor: pointer;
        transition: all .3s;
    }
    .location:hover {
        background-color:#3550c9;
    }
    .location i {
        color: #ff2d51;
        font-weight: 600;
        font-size: 13px;
    }
    .search {
        position: relative;
        width: 300px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;
        padding: 1px 11px;
        background-color: #fff;
        border-radius: 4px;
    }
    .search i {
        width: 30px;
        height: 30px;
        color: #a8abb2;
        font-size: 18px;
        line-height: 30px;
        cursor: pointer;
    }
    .search input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background-color: #fff;
        font-size: 14px;
        color: #a8abb2;
        padding-left: 18px;
    }
</style>
