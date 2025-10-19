"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OffState {
    name = "Off";
    powerOn(light) {
        light.brightness = 70;
        light.setState(new OnState());
    }
    powerOff() {
        console.log("Already off");
    }
    motion(light) {
        light.brightness = 50;
        light.setState(new MotionState());
    }
    adjust() {
        console.log("Nothing to adjust while off");
    }
}
class OnState {
    name = "On";
    powerOn() {
        console.log("Already on");
    }
    powerOff(light) {
        light.brightness = 0;
        light.setState(new OffState());
    }
    motion(light) {
        light.setState(new MotionState());
    }
    adjust(light, isDay) {
        const s = new BrightnessState();
        light.setState(s);
        s.adjust(light, isDay);
    }
}
class MotionState {
    name = "Motion";
    powerOn(light) {
        light.setState(new OnState());
    }
    powerOff(light) {
        light.brightness = 0;
        light.setState(new OffState());
    }
    motion() {
        console.log("Motion detected");
    }
    adjust(light, isDay) {
        const s = new BrightnessState();
        light.setState(s);
        s.adjust(light, isDay);
    }
}
class BrightnessState {
    name = "Brightness";
    powerOn(light) {
        light.setState(new OnState());
    }
    powerOff(light) {
        light.brightness = 0;
        light.setState(new OffState());
    }
    motion() {
        console.log("Adjusting brightness, ignore motion");
    }
    adjust(light, isDay) {
        light.brightness = isDay ? 30 : 100;
        console.log(`Brightness: ${light.brightness}`);
        light.setState(new OnState());
    }
}
class SmartLight {
    state = new OffState();
    brightness = 0;
    getState() {
        return this.state.name;
    }
    setState(s) {
        this.state = s;
        console.log(`State → ${s.name}`);
    }
    powerOn() {
        this.state.powerOn(this);
    }
    powerOff() {
        this.state.powerOff(this);
    }
    detectMotion() {
        this.state.motion(this);
    }
    adjustBrightness(isDay) {
        this.state.adjust(this, isDay);
    }
}
const light = new SmartLight();
console.log(`Init: ${light.getState()}, Brightness: ${light.brightness}`);
light.detectMotion();
light.adjustBrightness(true);
light.powerOff();
light.powerOn();
light.adjustBrightness(false);
//# sourceMappingURL=index.js.map