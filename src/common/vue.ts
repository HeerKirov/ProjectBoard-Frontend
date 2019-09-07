import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'

abstract class VueTemplate extends Vue {
    private created() {
        this.onCreated()
        this.onUpdate()
    }
    @Watch('$route') private onRouteChanged(to: Route, from: Route) {
        this.onUpdate()
    }

    protected abstract onCreated(): void
    protected abstract onUpdate(): void
}

export {Component, VueTemplate}