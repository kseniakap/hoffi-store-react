import { instance } from "../api/api.interceptor";

const GOODS = "goods";

export const GoodsService = {
    async getAll(){
        return instance({
            url:GOODS, 
            method: "GET"
        })
    }
} 