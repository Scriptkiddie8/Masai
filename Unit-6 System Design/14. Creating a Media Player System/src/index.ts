interface MediaFile {
  play(): void;
}

class AudioFile implements MediaFile {
  play(): void {
    console.log("Playing audio file...");
  }
}

class VideoFile implements MediaFile {
  play(): void {
    console.log("Playing video file...");
  }
}

class PDFFile implements MediaFile {
  play(): void {
    console.log("Displaying PDF document...");
  }
}

class MediaPlayer {
  constructor(private media: MediaFile) {}
  setMedia(media: MediaFile): void {
    this.media = media;
  }
  play(): void {
    this.media.play();
  }
}

const player = new MediaPlayer(new AudioFile());
player.play();
player.setMedia(new VideoFile());
player.play();
player.setMedia(new PDFFile());
player.play();
