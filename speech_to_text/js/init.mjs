import {$} from './helper_functions.mjs';
import {SpeechToText} from './speech_recognition.mjs';

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
    const transcriptHistory = $('#transcript-history');
    const microphoneButton = $('#btn-microphone');

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
            if (transcriptBox.innerText !== '') {
                const el = $.createElement(
                    'div', {class: 'transcript-history-box'}
                );
                el.innerText = transcriptBox.innerText;
                transcriptHistory.append(el);
                transcriptBox.innerText = '';
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