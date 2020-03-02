import axios from 'axios'

let req=axios.create({
    // 设置默认地址
    baseURL: 'http://localhost:3000', 
    // 设置超时限制，毫秒为单位
    timeout:10000
})
// 把axios封装成函数，以便于如果请求地址发生改变，不用去每个网页修改，方便管理
// 获取商家信息
export function getSeller() {
    return req.get('/api/seller')
}

export function getRating(){
    return req.get('/api/ratings')
}
// 获取商品的信息
export function getGoods(){
    return req.get('/api/goods')
}