type Signal = "Red" | "Green" | "Yellow";

interface LightState {
  readonly name: Signal;
  onEnter(light: TrafficLight): void;
  next(light: TrafficLight): void;
}

class RedState implements LightState {
  readonly name = "Red" as const;
  onEnter() {
    console.log("Red — Vehicles must stop.");
  }
  next(light: TrafficLight) {
    light.setState(new GreenState());
  }
}

class GreenState implements LightState {
  readonly name = "Green" as const;
  onEnter() {
    console.log("Green — Vehicles can move.");
  }
  next(light: TrafficLight) {
    light.setState(new YellowState());
  }
}

class YellowState implements LightState {
  readonly name = "Yellow" as const;
  onEnter() {
    console.log("Yellow — Vehicles should slow down.");
  }
  next(light: TrafficLight) {
    light.setState(new RedState());
  }
}

class TrafficLight {
  private state: LightState;

  constructor(initial: LightState = new RedState()) {
    this.state = initial;
    this.state.onEnter(this);
  }

  getState(): Signal {
    return this.state.name;
  }

  setState(next: LightState) {
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

for (let i = 0; i < 3; i++) light.tick();
