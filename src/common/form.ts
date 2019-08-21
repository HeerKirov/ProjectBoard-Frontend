interface WindowResizeEvent { (width: number, height: number): void }

export class FormHandler {
    private static windowResizeSet: WindowResizeEvent[] | null = null
    static onWindowResize(f: WindowResizeEvent) {
        if(this.windowResizeSet == null) {
            this.windowResizeSet = []
            window.onresize = () => {
                let w = document.documentElement.clientWidth
                let h = document.documentElement.clientHeight
                for(let f of FormHandler.windowResizeSet!) {
                    f(w, h)
                }
            }
        }
        this.windowResizeSet!.push(f)
    }
    static cancelWindowResize(f: WindowResizeEvent) {
        for(let i = 0; i < FormHandler.windowResizeSet!.length; ++i) {
            if(FormHandler.windowResizeSet![i] === f) {
                FormHandler.windowResizeSet!.splice(i, 1)
                break
            }
        }
    }
}