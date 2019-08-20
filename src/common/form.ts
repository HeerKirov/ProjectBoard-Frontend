export class FormHandler {
    private static windowResizeSet: ((width: number, height: number) => void)[] | null = null
    static onWindowResize(f: (width: number, height: number) => void) {
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
    static cancelWindowResize(f: (width: number, height: number) => void) {
        for(let i = 0; i < FormHandler.windowResizeSet!.length; ++i) {
            if(FormHandler.windowResizeSet![i] === f) {
                FormHandler.windowResizeSet!.splice(i, 1)
                break
            }
        }
    }
}