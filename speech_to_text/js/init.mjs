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
    const questionCounter = $('#question-counter');
    questionCounter.innerText = `Question ${questions} of ${MAX_QUESTIONS}`;

    // Init speech recognition object
    const stt = new SpeechToText({
        onResult() {
            transcriptBox.innerText = stt.getResults();
            $.scrollBottom(transcriptBox);
        },
        onStart() {
            // Show/hide stuff, change CSS styling
            $.hideElement($('#msg-get-started'));
            $.showElement(transcriptBox);
            microphoneButton.classList.add('recording');
            transcriptBox.classList.add('recording');
        },
        onStop() {
            // After recognition ends, keep track of what is said in the
            // transcription history if the transcript isn't blank
            const transcriptText = transcriptBox.innerText;
            if (transcriptText !== '') {
                questions++;
                questionCounter.innerText = `Question ${questions} of ${MAX_QUESTIONS}`;
                if (questions>MAX_QUESTIONS)
                {
                    alert("You have reached the limit of 20 questions. Please make your guess!")
                    microphoneButton.disabled = true;
                    return;
                }
                const el = $.createElement(
                    'div', {class: 'transcript-history-box'}
                );
                el.innerText = transcriptText;
                transcriptHistory.append(el);
                transcriptBox.innerText = '';
                $.scrollBottom(transcriptHistory);

                // Log image generation
                console.log("Generating image for transcript:", transcriptText);

                // Add yes/no buttons
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

                // Event listeners
                yesButton.addEventListener('click', () => {
                    el.classList.remove("incorrect");
                    el.classList.add("correct");
                });

                noButton.addEventListener('click', () => {
                    el.classList.remove("correct");
                    el.classList.add("incorrect");
                });

                // Append buttons
                buttonContainer.appendChild(yesButton);
                buttonContainer.appendChild(noButton);
                el.appendChild(buttonContainer);

                // Create a status element
                const statusElem = document.createElement('p');
                statusElem.innerText = "Generating image...";
                statusElem.style.fontStyle = "italic";
                el.appendChild(statusElem);

                const imgElem = document.createElement('img');
                el.append(imgElem);

                // Actually generate image
                generateImage(transcriptText)
                    .then((imageUrl) => {
                        // Remove the status element
                        el.removeChild(statusElem);

                        // Create an image element and append it to the transcript box
                        imgElem.src = imageUrl;

                        // Scroll to bottom
                        setTimeout(()=>$.scrollBottom(transcriptHistory), 50);
                    })
                    .catch(error => {
                        statusElem.innerText = "Error generating image";
                        throw error;
                    });

                $.scrollBottom(transcriptHistory);
            }

            // Change CSS styling
            microphoneButton.classList.remove('recording');
            transcriptBox.classList.remove('recording');
        }
    });

    microphoneButton.addEventListener('click', function() {
        if (stt.isActive()) stt.stop();
        else stt.start();
    });
}