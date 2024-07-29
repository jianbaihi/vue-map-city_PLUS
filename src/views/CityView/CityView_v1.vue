<template>
    <div>
      <div class="container">
        <div class="search">
          <i class="iconfont search1"></i>
          <input
            type="text"
            placeholder="请输入城市名、拼音或字母查询"
            v-model="searchCity"
            @input="handleSearchCity"
          />
        </div>
        <div v-if="searchCity.length > 0 && resultCities.length >= 0">
          <li v-if="resultCities.length == 0">未搜索到该城市</li>
          <li 
            class="result"
            v-for="resultCity in resultCities"
            :key="resultCity.id"
            @click="handleClickLocation(resultCity)"
            >
            {{ resultCity }}
          </li>
        </div>
        <div v-else>
          <h3>当前城市</h3>
          <button class="current">{{ currentCity }}</button>
          <h3>定位/最近访问</h3>
          <div>
            <button class="location" @click="handleClickLocation(IPCity.slice(0,2))">
              <i class="iconfont ic_site"></i> {{ IPCity }}
            </button>
            <button 
              v-for="historyCity in historyCities"
              @click="handleClickLocation(historyCity)">
              {{ historyCity }}
            </button>
          </div>
          <h3>热门城市</h3>
          <div>
            <button
              v-for="(city, index) in hotCities"
              :key="city.id"
              @click="handleClickLocation(city.name)"
            >
              {{ city.name }}
            </button>
          </div>
          <div class="van-index-bar">
            <div class="van-index-bar__sidebar">
              <span
                class="van-index-bar__index"
                v-for="(cities, key) in cityList"
                :key="key"
                :class="{ active: key == currentKey }"
                @click="currentKey = key"
              >
                <a :href="`#${key}`">
                  {{ key }}
                </a>
              </span>
            </div>
            <div v-for="(cities, key) in cityList" :key="key">
              <div>
                <div
                  class="van-index-anchor"
                  :id="key"
                  :class="{ 'van-index-anchor-active': key == currentKey }"
                >
                  {{ key }}
                </div>
              </div>
              <div
                class="van-cell"
                v-for="(city, index) in cities"
                :key="city.id"
                @click="handleClickLocation(city.name)"
              >
                <div class="van-cell__title">
                  <span>{{ city.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { getCity } from '../../api/getCityHttp'
  import { getIPCity } from '../../api/getMapHttp'
  import { ref, onMounted, onBeforeUnmount, toRefs, watch, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCityStore } from '@/stores/city'
  const $store = useCityStore()
  const { city } = toRefs($store)
  
  const $router = useRouter()
  
  const currentKey = ''
  const currentCity = city
  const IPCity = ref('')
  const hotCities = ref([])
  const cityList = ref({})
  const historyCities = ref([])
  const resultCities = ref([])
  const searchCity = ref('')
  
  //搜索框输入绑定事件
  const handleSearchCity = () => {
    resultCities.value = []
    //   过滤数据
    if(searchCity.value.length > 0){
      for (let index in cityList.value) {
          cityList.value[index].map((item) => {
          console.log(item.spell,item.name,searchCity.value)
          if (
            item.name.startsWith(searchCity.value)||
            item.spell.startsWith(searchCity.value)
          ) {
            resultCities.value.push(item.name)
          }
        })
      }
    }
  }
  
  // 点击切换城市
  const handleClickLocation = (cityName) => {
    $store.changeCity(cityName)
    // 历史记录
    if (!historyCities.value.includes(cityName)) {
      historyCities.value.unshift(cityName)
    } else {
      let index = historyCities.value.indexOf(cityName)
      historyCities.value.splice(index, 1)
      historyCities.value.unshift(cityName)
    }
    // 限制历史记录长度
    historyCities.value = historyCities.value.slice(0, 3)
    // 清空搜索框
    searchCity.value = ''
    // 跳转路由
    $router.push('/')
  }
  // 当历史记录改变时，更新缓存
  watch(historyCities, (val) => {
    localStorage.setItem('historyCities', JSON.stringify(val))
  })
  
  onMounted(() => {
    // 获取IP定位城市
    getIPCity().then((res) => {
      // console.log(res.city)
      IPCity.value = res.city
    })
    // 获取城市列表和热门城市
    getCity().then((res) => {
      // console.log(res.data.cities)
      cityList.value = res.data.cities
      hotCities.value = res.data.hotCities
    })
    // 获取历史记录
    const localCities = localStorage.getItem('historyCities')
    if (localCities) {
      historyCities.value = JSON.parse(localCities)
    }
  })

  </script>
  
  <style scoped>
    .container {
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    .search {
      position: relative;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-block: 10px;
      padding: 1px 11px;
      background-color: #efefef;
      border: 1px solid #a2a2a2;
      border-radius: 4px;
    }
    .search i {
      color: #898989;
      font-size: 18px;
    }
    .search1:before {
      content: '\e6b9';
    }
    .search input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background-color: #efefef;
      font-size: 14px;
      color: #898989;
      padding-left: 18px;
    }
    .container li {
      list-style: none;
      height: 30px;
      padding: 0 15px;
      font-size: 14px;
      line-height: 30px;
      border-bottom: 1px solid #efefef;
    }
    .container .result {
      cursor: pointer;
    }
    .container h3 {
      text-indent: 15px;
      line-height: 40px;
      color: #666;
      font-size: 16px;
      font-weight: lighter;
      background-color: #efeeee;
      margin: 6px 0;
    }
    .container .current {
      background-color: #198754;
      color: #fff;
    }
    .location i {
      color: #2d6fff;
      font-weight: 600;
      font-size: 13px;
    }
    .container button {
      width: 80px;
      height: 40px;
      background-color: #fff;
      margin-right: 10px;
      border: 1px solid #c2c0c0;
      border-radius: 5px;
      margin-top: 6px;
      font-size: 14px;
      cursor: pointer;
    }
    button:hover {
      background-color: #efeeee;
    }
    .active {
      color: #1989fa;
      font-weight: 700;
    }
    .van-hairline--bottom:after {
      border-bottom-width: 1px;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
    .result:hover{
        background-color: #efeeee;
    }
  </style>
  