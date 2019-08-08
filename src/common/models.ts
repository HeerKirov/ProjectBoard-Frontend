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
    isStaff: false
}

export interface Project {
    id: string
    name: string
    description: string
    archived: boolean
    createTime: number
    updateTime: number
}