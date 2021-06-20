class SoundManager {
    constructor() {
        this.sounds = [];
        this.volume = 0.5;
    }

    add(name, src, vol) {
        const sound = new Sound(name, src, vol);
        this.sounds.push(sound);
    }

    play(audioName, playVolume, repeat) {
        const self = this;
        if (playVolume === 0) {
            return;
        }

        if (playVolume === undefined) {
            playVolume = 1;
        }

        const length = self.sounds.length;
        for (let i = 0; i < length; i++) {
            const sound = self.sounds[i];
            if (sound.name === audioName) {
                const audio = new Audio(sound.src);

                if (repeat) {
                    audio.addEventListener("ended", () => {
                        self.currentTime = 0;
                        this.play();
                    }, false);
                }
                let actualVolume = self.volume * sound.vol * playVolume;
                if (actualVolume > 1) {
                    actualVolume = 1;
                } else if (actualVolume < 0) {
                    actualVolume = 0;
                }

                audio.volume = actualVolume;
                audio.play();

                return audio;
            }
        }

        console.error("Audio not found: " + audioName);
    }

    setVolume(newVolume) {
        if (newVolume >= 0 && newVolume <= 1) {
            this.volume = newVolume;

            localStorage.setItem('volume', newVolume);
        }
    }

    getVolume() {
        return this.volume;
    }
}


class Sound {
    constructor(name, src, vol) {
        this.name = name;
        this.src = src;
        if (vol == null) {
            this.vol = 1;
        } else {
            this.vol = vol;
        }
    }
}

const soundManager = new SoundManager();

soundManager.add('blip', 'assets/placeholderBlip.wav');