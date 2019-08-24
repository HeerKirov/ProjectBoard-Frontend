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
    avatarId: string | null
}

export interface CProject {
    name: string
    description: string
    content: string
    archived?: boolean
}
export interface Project extends CProject {
    id: string
    archived: boolean
    createTime: number
    updateTime: number
    coverId: string | null
}

export interface CModule {
    name: string
    description: string
}
export interface Module extends CModule {
    id: string
    createTime: number
    updateTime: number
}


export const EMPTY_PROFILE: Profile = {username: '', name: '', dateJoined: 0, isStaff: false, avatarId: null}
export const EMPTY_PROJECT: Project = {id: '', name: '', description: '', archived: false, createTime: 0, updateTime: 0, coverId: null}