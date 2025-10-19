type LightStateName = "Off" | "On" | "Motion" | "Brightness";

interface LightState {
  readonly name: LightStateName;
  powerOn(light: SmartLight): void;
  powerOff(light: SmartLight): void;
  motion(light: SmartLight): void;
  adjust(light: SmartLight, isDay: boolean): void;
}

class OffState implements LightState {
  readonly name = "Off" as const;
  powerOn(light: SmartLight): void {
    light.brightness = 70;
    light.setState(new OnState());
  }
  powerOff(): void {
    console.log("Already off");
  }
  motion(light: SmartLight): void {
    light.brightness = 50;
    light.setState(new MotionState());
  }
  adjust(): void {
    console.log("Nothing to adjust while off");
  }
}

class OnState implements LightState {
  readonly name = "On" as const;
  powerOn(): void {
    console.log("Already on");
  }
  powerOff(light: SmartLight): void {
    light.brightness = 0;
    light.setState(new OffState());
  }
  motion(light: SmartLight): void {
    light.setState(new MotionState());
  }
  adjust(light: SmartLight, isDay: boolean): void {
    const s = new BrightnessState();
    light.setState(s);
    s.adjust(light, isDay);
  }
}

class MotionState implements LightState {
  readonly name = "Motion" as const;
  powerOn(light: SmartLight): void {
    light.setState(new OnState());
  }
  powerOff(light: SmartLight): void {
    light.brightness = 0;
    light.setState(new OffState());
  }
  motion(): void {
    console.log("Motion detected");
  }
  adjust(light: SmartLight, isDay: boolean): void {
    const s = new BrightnessState();
    light.setState(s);
    s.adjust(light, isDay);
  }
}

class BrightnessState implements LightState {
  readonly name = "Brightness" as const;
  powerOn(light: SmartLight): void {
    light.setState(new OnState());
  }
  powerOff(light: SmartLight): void {
    light.brightness = 0;
    light.setState(new OffState());
  }
  motion(): void {
    console.log("Adjusting brightness, ignore motion");
  }
  adjust(light: SmartLight, isDay: boolean): void {
    light.brightness = isDay ? 30 : 100;
    console.log(`Brightness: ${light.brightness}`);
    light.setState(new OnState());
  }
}

class SmartLight {
  private state: LightState = new OffState();
  brightness = 0;

  getState(): LightStateName {
    return this.state.name;
  }
  setState(s: LightState): void {
    this.state = s;
    console.log(`State → ${s.name}`);
  }

  powerOn(): void {
    this.state.powerOn(this);
  }
  powerOff(): void {
    this.state.powerOff(this);
  }
  detectMotion(): void {
    this.state.motion(this);
  }
  adjustBrightness(isDay: boolean): void {
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
