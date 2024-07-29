import request from './request'

export function getCity(){
    return request.get('cities/city')
}
