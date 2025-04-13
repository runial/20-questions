import {$} from './helper_functions.mjs';
import {SpeechToText} from './speech_recognition.mjs';
import {generateImage} from "../../image_generation/image_generation.mjs";

if (!SpeechToText.isSpeechRecognitionSupported()) {
    alert(
        'Failed to start speech recognition. Try switching to a browser that '
        + 'supports it, like Google Chrome, Microsoft Edge, or Safari.'
    );
} else if (!(await SpeechToText.isMicrophoneWorking())) {
    alert(
        'Failed to access microphone. Make sure you enabled microphone '
        + 'permissions for this site and that you have a microphone connected.'
    );
} else {
    const transcriptBox = $('#transcript-box');
    let questions = 0;
    const MAX_QUESTIONS = 20;
    const transcriptHistory = $('#transcript-history');
    const microphoneButton = $('#btn-microphone');
    const isTwentyQMode = localStorage.getItem('twentyQuestionsMode') === 'true';
    console.log('20 Questions Mode:', isTwentyQMode);

    function addTranscriptToHistory(transcriptText) {
        if (isTwentyQMode) {
            questions++;
            if (questions > MAX_QUESTIONS) {
                alert("You have reached the limit of 20 questions. Please make your guess!");
                microphoneButton.disabled = true;
                return;
            }
        }

        const el = $.createElement('div', { class: 'transcript-history-box' });
        el.innerText = transcriptText;
        transcriptHistory.append(el);
        $.scrollBottom(transcriptHistory);

        if (isTwentyQMode) {
            const buttonContainer = document.createElement('div');
            buttonContainer.style.marginTop = "10px";

            const yesButton = document.createElement('button');
            yesButton.innerText = "Yes";
            yesButton.classList.add("yes-button");
            yesButton.style.marginRight = "10px";
            yesButton.style.padding = "5px 10px";

            const noButton = document.createElement('button');
            noButton.innerText = "No";
            noButton.classList.add("no-button");
            noButton.style.padding = "5px 10px";

            yesButton.addEventListener('click', () => {
                el.classList.remove("incorrect");
                el.classList.add("correct");
            });

            noButton.addEventListener('click', () => {
                el.classList.remove("correct");
                el.classList.add("incorrect");
            });

            buttonContainer.appendChild(yesButton);
            buttonContainer.appendChild(noButton);
            el.appendChild(buttonContainer);
        }

        const statusElem = document.createElement('p');
        statusElem.innerText = "Generating image...";
        statusElem.style.fontStyle = "italic";
        el.appendChild(statusElem);

        const imgElem = document.createElement('img');
        el.append(imgElem);

        generateImage(transcriptText)
            .then((imageUrl) => {
                el.removeChild(statusElem);
                imgElem.src = imageUrl;
                setTimeout(() => $.scrollBottom(transcriptHistory), 50);
            })
            .catch(error => {
                statusElem.innerText = "Error generating image";
                throw error;
            });

        $.scrollBottom(transcriptHistory);
    }

    const stt = new SpeechToText({
        onResult() {
            transcriptBox.innerText = stt.getResults();
            $.scrollBottom(transcriptBox);
        },
        onStart() {
            $.hideElement($('#msg-get-started'));
            $.showElement(transcriptBox);
            microphoneButton.classList.add('recording');
            transcriptBox.classList.add('recording');
        },
        onStop() {
            // Don't send anything — just stop recording and keep transcript
            microphoneButton.classList.remove('recording');
            transcriptBox.classList.remove('recording');
        }
    });

    microphoneButton.addEventListener('click', function () {
        if (stt.isActive()) stt.stop();
        else stt.start();
    });

    // Send image only when user clicks this
    $('#btn-send-prompt').addEventListener('click', () => {
        const transcriptText = transcriptBox.innerText.trim();
        if (transcriptText !== '') {
            addTranscriptToHistory(transcriptText);
            transcriptBox.innerText = '';
        }
    });
}
