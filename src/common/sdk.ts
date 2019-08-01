import Axios from 'axios'
import config from '@/config'

class SDK {
    private readonly API_ADDRESS: string
    private readonly LOCAL_STORAGE_TOKEN: string
    private readonly headers: any = {'content-type': 'application/json'}

    constructor() {
        this.API_ADDRESS = config.API_ADDRESS
        this.LOCAL_STORAGE_TOKEN = config.LOCAL_STORAGE_TOKEN
    }

    private async request(url: string) {
        return await Axios.request({
            baseURL: this.API_ADDRESS,
            url,
            headers: this.headers
        })
    }
}

/**SDK的逻辑：
 * 1. 使用local storage保存本地信息
 * 2. 使用token与服务器交互
 */
const instance = new SDK()

export default instance