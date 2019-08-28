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
    /**Markdown Supported*/content: string
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

export interface CNote {
    title: string
    /**Markdown Supported*/content: string
}
export interface Note extends CNote {
    id: string
    createTime: number
    updateTime: number
    project: string
    module: string
}

export interface TaskTodo {
    type: "todo"  
    /**Markdown Supported*/content: string
    complete: boolean
    remark?: string
    deadline?: number
}
export interface TaskThink {
    type: "think"
    /**Markdown Supported*/content: string
    remark?: string
    deadline?: number
}
export interface TaskNote {
    type: "note"
    /**Markdown Supported*/content: string
}
export interface CTask {
    title: string
    description: string
    archived?: boolean
    /**Markdown Supported*/list: (TaskTodo | TaskThink | TaskNote | string)[]
    deadline?: number
}
export interface Task {
    id: string
    archived: boolean
    createTime: number
    updateTime: number
    project: string
    module: string
    statistics: {
        todoNum: number, todoComplete: number,
        thinkNum: number, thinkComplete: number,
        noteNum: number
    }
}

export const EMPTY_PROFILE: Profile = {username: '', name: '', dateJoined: 0, isStaff: false, avatarId: null}
export const EMPTY_PROJECT: Project = {id: '', name: '', description: '', content: '', archived: false, createTime: 0, updateTime: 0, coverId: null}
export const EMPTY_MODULE: Module = {id: '', name: '', description: '', createTime: 0, updateTime: 0}