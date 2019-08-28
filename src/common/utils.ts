export const DAY_MS = 1000 * 60 * 60 * 24

function zero(n: number, zero: number): string {
    let ret = n.toString()
    let len = ret.length
    for(let i = 0; i < zero - len; ++i) ret = `0${ret}`
    return ret
}

export class DateFormatter {
    /**
     * 将日期转换为友好的格式输出。一般适用于了解大致时间的情况。
     * 与now时差1min内，输出"1分钟内";
     * 与now在同一天，输出"hh:mm";
     * 在now的前一天，输出"昨天";
     * 与now在同一年，输出"MM-dd";
     * 不在同一年，输出"yyyy年"。
     * @param date 日期。
     */
    static toFriendly(date: number): string {
        let nowD = new Date(), now = nowD.getTime()
        if(now - date < 60 * 1000) return '1分钟内'
        let dateD = new Date(date)
        if(Math.floor(now / DAY_MS) === Math.floor(date / DAY_MS)) return `${zero(dateD.getHours(), 2)}:${zero(dateD.getMinutes(), 2)}`
        if(Math.floor(now / DAY_MS) - Math.floor(date / DAY_MS) === 1) return '昨天'
        if(nowD.getFullYear() === dateD.getFullYear()) return `${zero(dateD.getMonth() + 1, 2)}-${zero(dateD.getDate(), 2)}`
        return `${dateD.getFullYear()}年`
    }

    static toDateTime(date: number): string {
        let d = new Date(date)
        return `${d.getFullYear()}-${zero(d.getMonth() + 1, 2)}-${zero(d.getDate(), 2)} ${zero(d.getHours(), 2)}:${zero(d.getMinutes(), 2)}`
    }
}