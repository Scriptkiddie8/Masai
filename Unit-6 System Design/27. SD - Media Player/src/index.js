"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayingState {
    name = "Playing";
    play() {
        console.log("Already playing.");
    }
    pause(player) {
        console.log("Pausing playback.");
        player.setState(new PausedState());
    }
    stop(player) {
        console.log("Stopping playback.");
        player.reset();
        player.setState(new StoppedState());
    }
}
class PausedState {
    name = "Paused";
    play(player) {
        console.log("Resuming playback.");
        player.setState(new PlayingState());
    }
    pause() {
        console.log("Already paused.");
    }
    stop(player) {
        console.log("Stopping from pause.");
        player.reset();
        player.setState(new StoppedState());
    }
}
class StoppedState {
    name = "Stopped";
    play(player) {
        console.log("Starting playback from beginning.");
        player.reset();
        player.setState(new PlayingState());
    }
    pause() {
        console.log("Cannot pause — player is stopped.");
    }
    stop() {
        console.log("Already stopped.");
    }
}
class MediaPlayer {
    state = new StoppedState();
    position = 0;
    getState() {
        return this.state.name;
    }
    setState(state) {
        this.state = state;
    }
    reset() {
        this.position = 0;
    }
    play() {
        this.state.play(this);
    }
    pause() {
        this.state.pause(this);
    }
    stop() {
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
//# sourceMappingURL=index.js.map