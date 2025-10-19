"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RedState {
    name = "Red";
    onEnter() {
        console.log("Red — Vehicles must stop.");
    }
    next(light) {
        light.setState(new GreenState());
    }
}
class GreenState {
    name = "Green";
    onEnter() {
        console.log("Green — Vehicles can move.");
    }
    next(light) {
        light.setState(new YellowState());
    }
}
class YellowState {
    name = "Yellow";
    onEnter() {
        console.log("Yellow — Vehicles should slow down.");
    }
    next(light) {
        light.setState(new RedState());
    }
}
class TrafficLight {
    state;
    constructor(initial = new RedState()) {
        this.state = initial;
        this.state.onEnter(this);
    }
    getState() {
        return this.state.name;
    }
    setState(next) {
        this.state = next;
        this.state.onEnter(this);
    }
    tick() {
        this.state.next(this);
    }
}
const light = new TrafficLight();
light.tick();
light.tick();
light.tick();
for (let i = 0; i < 3; i++)
    light.tick();
//# sourceMappingURL=index.js.map