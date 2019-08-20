export interface Token {
    token: string
    username: string
    createTime: number
    updateTime: number
    effectiveDuration: number
    expireTime: number
}

export interface Profile {
    username: string
    name: string
    dateJoined: number
    isStaff: boolean
}

export interface Project {
    id: string
    name: string
    description: string
    archived: boolean
    createTime: number
    updateTime: number
}

export interface Module {
    id: string
    name: string
    description: string
    createTime: number
    updateTime: number
}


export const EMPTY_PROFILE: Profile = {username: '', name: '', dateJoined: 0, isStaff: false}
export const EMPTY_PROJECT: Project = {id: '', name: '', description: '', archived: false, createTime: 0, updateTime: 0}