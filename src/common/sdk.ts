import Axios, {Method, AxiosResponse} from 'axios'
import config from '@/config'
import { Token, Profile, Project, Module } from './models'

export enum AuthResult {
    OK,         //登录成功
    AUTH_FAILED,//登录认证失败
    EXPIRED,    //会话过期
    EXCEPTION,  //发生异常
    NO          //没有登录
}

interface Map<VALUE> { [T: string]: VALUE }

interface Return<T> {
    ok: boolean
    status: number
    data: T
}

interface ListResult<T> {
    count: number
    result: T[]
}

class RestEndpoint<T> {
    constructor(private sdk: SDKClass, private url: (params: Map<string>) => string) { }

    async list(nest?: Map<string>): Promise<Return<ListResult<T>>> {
        let res = await this.sdk.request(this.url(nest || {}), 'GET', {}, null)
        if(res.status === 200) {
            return {ok: true, status: 200, data: res.data}
        }else{
            return {ok: false, status: res.status, data: res.data}
        }
    }
    async retrieve(id: string, nest?: Map<string>): Promise<Return<T>> {
        let res = await this.sdk.request(this.url(nest || {}) + id + '/', 'GET', {}, null)
        if(res.status === 200) {
            return {ok: true, status: 200, data: res.data}
        }else{
            return {ok: false, status: res.status, data: res.data}
        }
    }
}

class ProfileEndpoint {
    private profile: Profile | null = null
    constructor(private sdk: SDKClass, private url: string) { }

    async get(): Promise<Return<Profile>> {
        if(this.profile == null) {
            let res = await this.sdk.request('/profile', 'GET', {}, null)
            if(res.status === 200) {
                this.profile = res.data
                return {ok: true, status: 200, data: res.data}
            }else{
                return {ok: false, status: res.status, data: res.data}
            }
        }else{
            return {ok: true, status: 200, data: this.profile}
        }
    }
}

class SDKClass {
    private static readonly EFFECTIVE = 1000 * 60 * 60 * 24 * 3
    private readonly headers: any = {'Content-Type': 'application/json', 'Authorization': ''}
    private token: Token | null = null
    private state: AuthResult | null = null

    async request(url: string, method: Method, params: any, data: any): Promise<AxiosResponse<any>> {
        try {
            return await Axios.request({baseURL: config.API_ADDRESS, url, method, headers: this.headers, params, data})
        }catch(e) {
            return e.response
        }
    }

    /**
     * 仅用于设置sdk对象内的token对象，并且生成header。设置为null可以清除token。
     * @param token
     * @param init
     */
    private setToken(token: any | null, init: boolean = false) {
        this.token = token
        if(this.token == null) {
            this.headers.Authorization = ''
            if(!init) window.localStorage.setItem(config.LOCAL_STORAGE_TOKEN, '')
        }else{
            this.headers.Authorization = `Bearer ${this.token.token}`
            if(!init) window.localStorage.setItem(config.LOCAL_STORAGE_TOKEN, JSON.stringify(this.token))
        }
    }
    /**
     * 获得当前会话的登录状态。
     */
    getState(): AuthResult | null {
        return this.state
    }

    /**
     * 手动调用初始化流程。
     * 流程将从本地存储获得上次使用的token，尝试验证并更新token。如果可用则标记为登录成功。并更新token。
     * 如果更新失败，那么回执为登录会话过期。
     * 如果没有token，回执为没有保存登录状态。
     */
    async initialize(): Promise<AuthResult> {
        if(this.state != null) {
            return this.state
        }
        let str = window.localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
        if(str) {
            let token = JSON.parse(str)
            this.setToken(token, true)
            return this.updateAuthentication()
        }
        this.state = AuthResult.NO
        return this.state
    }
    /**
     * 手动调用登录流程。
     * 仅在没有登录时才能使用。流程将用用户名和密码请求新的token，并尝试将其保存。
     * 返回值是http状态码。201表示登录成功。401表示认证失败。
     */
    async authenticate(username: string, password: string): Promise<AuthResult> {
        let res = await this.request('/token', 'POST', {}, {username, password, effectiveDuration: SDKClass.EFFECTIVE})
        if(res.status === 201) {
            this.setToken(res.data)
            this.state = AuthResult.OK
        }else if(res.status === 401) {
            this.setToken(null)
            this.state = AuthResult.AUTH_FAILED
        }else{
            this.setToken(null)
            console.warn('Unknown error.')
            this.state = AuthResult.EXCEPTION
        }
        return this.state
    }
    /**
     * 手动调用刷新token有效期流程。如果可用则标记为登录成功。并更新token。
     * 如果更新失败，那么回执为登录会话过期。
     * 如果没有token，回执为没有保存登录状态。
     */
    async updateAuthentication(): Promise<AuthResult> {
        if(this.token != null) {
            let res = await this.request(`/token/${this.token.token}`, 'PUT', {}, {effectiveDuration: SDKClass.EFFECTIVE})
            if(res.status === 200) {
                this.setToken(res.data)
                this.state = AuthResult.OK
            }else if(res.status === 401) {
                this.setToken(null)
                console.log(res.data)
                if(res.data === 'Expired' || res.data === 'No Such Token') this.state = AuthResult.EXPIRED
                else this.state = AuthResult.AUTH_FAILED
            }else{
                this.setToken(null)
                console.warn('Unknown error.')
                this.state = AuthResult.EXCEPTION
            }
            return this.state
        }
        this.state = AuthResult.NO
        return this.state
    }
    /**
     * 手动退出认证。这会清除上一个token。
     */
    async logout() {
        if(this.token != null) {
            await this.request(`/token/${this.token.token}`, 'DELETE', {}, null)
            this.setToken(null)
            this.state = AuthResult.NO
            return this.state
        }
    }

    
    readonly profile = new ProfileEndpoint(this, '/profile/')
    readonly projects = new RestEndpoint<Project>(this, p => `/projects/`)
    readonly modules = new RestEndpoint<Module>(this, p => `/projects/${p.project}/modules/`)
}

export const SDK = new SDKClass()