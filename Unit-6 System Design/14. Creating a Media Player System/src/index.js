"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AudioFile {
    play() {
        console.log("Playing audio file...");
    }
}
class VideoFile {
    play() {
        console.log("Playing video file...");
    }
}
class PDFFile {
    play() {
        console.log("Displaying PDF document...");
    }
}
class MediaPlayer {
    media;
    constructor(media) {
        this.media = media;
    }
    setMedia(media) {
        this.media = media;
    }
    play() {
        this.media.play();
    }
}
const player = new MediaPlayer(new AudioFile());
player.play();
player.setMedia(new VideoFile());
player.play();
player.setMedia(new PDFFile());
player.play();
//# sourceMappingURL=index.js.map