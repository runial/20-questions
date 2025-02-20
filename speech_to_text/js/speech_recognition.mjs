class SpeechToText {
    #results = [''];
    #recognition;
    #isActive = false;
    #onResult = ()=>{};
    #onStart = ()=>{};
    #onStop = ()=>{};

    static isSpeechRecognitionSupported() {
        return Boolean(
            window.webkitSpeechRecognition || window.speechRecognition
        );
    }

    static async isMicrophoneWorking() {
        let microphoneWorks;
        await navigator.mediaDevices
            .getUserMedia({audio: true})
            .then(() => {microphoneWorks = true;})
            .catch(() => {microphoneWorks = false;});
        return microphoneWorks;
    }

    constructor(options) {
        // Init speech recognition object
        if (window.webkitSpeechRecognition) {
            this.#recognition = new webkitSpeechRecognition();
        } else {
            this.#recognition = new speechRecognition();
        }
        this.#recognition.lang = 'en-US';
        this.#recognition.continuous = true;
        this.#recognition.interimResults = true;

        // Set custom listener functions if defined
        this.#onResult = options.onResult ?? this.#onResult;
        this.#onStart = options.onStart ?? this.#onStart;
        this.#onStop = options.onStop ?? this.#onStop;

        // Set onresult listener
        this.#recognition.onresult = async (event) => {
            // If recognition is off, return immediately
            if (!this.#isActive) return;

            const result = event.results[event.resultIndex];

            // Update result in results array
            this.#results[this.#results.length-1] = result[0].transcript.trim();
            if (result.isFinal) {
                // Try to add punctuation; if API doesn't work then proceed anyway
                try {
                    this.#results[this.#results.length-1] = await (await fetch(`https://text.pollinations.ai/Punctuate and capitalize this: "${this.#results[this.#results.length-1]}". Return only the punctuated  paragraph. Do not make any additional comments or add quotation marks. If you do not have anything to parse, return nothing.`)
                    ).text();
                } catch (e) {}
                this.#results.push('');
            }

            this.#onResult();
        }
    }

    start() {
        this.#recognition.start();
        this.#results = [''];
        this.#isActive = true;
        this.#onStart();
    }

    stop() {
        this.#recognition.stop();
        this.#isActive = false;
        this.#onStop();
    }

    isActive() {
        return this.#isActive;
    }

    getResults() {
        return this.#results.join(' ');
    }
}

export {SpeechToText};