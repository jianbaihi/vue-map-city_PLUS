import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCityStore = defineStore('city', () => {
  const getCurrentCity  = ()=>{
    let city = ref('北京')
    let currentCity = localStorage.getItem('currentCity')
    if(currentCity){
      city.value = currentCity
    }
    return city
  }
  const city = getCurrentCity()

  const changeCity = (val)=>{
    city.value = val
    localStorage.setItem('currentCity', val)
  }
  return { 
    city,
    changeCity
  }
})
