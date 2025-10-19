type PlayerStateName = "Playing" | "Paused" | "Stopped";

interface PlayerState {
  readonly name: PlayerStateName;
  play(player: MediaPlayer): void;
  pause(player: MediaPlayer): void;
  stop(player: MediaPlayer): void;
}

class PlayingState implements PlayerState {
  readonly name = "Playing" as const;
  play(): void {
    console.log("Already playing.");
  }
  pause(player: MediaPlayer): void {
    console.log("Pausing playback.");
    player.setState(new PausedState());
  }
  stop(player: MediaPlayer): void {
    console.log("Stopping playback.");
    player.reset();
    player.setState(new StoppedState());
  }
}

class PausedState implements PlayerState {
  readonly name = "Paused" as const;
  play(player: MediaPlayer): void {
    console.log("Resuming playback.");
    player.setState(new PlayingState());
  }
  pause(): void {
    console.log("Already paused.");
  }
  stop(player: MediaPlayer): void {
    console.log("Stopping from pause.");
    player.reset();
    player.setState(new StoppedState());
  }
}

class StoppedState implements PlayerState {
  readonly name = "Stopped" as const;
  play(player: MediaPlayer): void {
    console.log("Starting playback from beginning.");
    player.reset();
    player.setState(new PlayingState());
  }
  pause(): void {
    console.log("Cannot pause — player is stopped.");
  }
  stop(): void {
    console.log("Already stopped.");
  }
}

class MediaPlayer {
  private state: PlayerState = new StoppedState();
  private position = 0;

  getState(): PlayerStateName {
    return this.state.name;
  }

  setState(state: PlayerState): void {
    this.state = state;
  }

  reset(): void {
    this.position = 0;
  }

  play(): void {
    this.state.play(this);
  }
  pause(): void {
    this.state.pause(this);
  }
  stop(): void {
    this.state.stop(this);
  }
}

const player = new MediaPlayer();
console.log("State:", player.getState());
player.play();
player.pause();
player.play();
player.stop();
player.pause();
