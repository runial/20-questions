/*
import {$} from './helper_functions.mjs';
console.log("Integration script loaded.");

document.addEventListener('DOMContentLoaded', () => {
  const transcriptHistory = $('#transcript-history');
  if (!transcriptHistory) {
    console.error("Transcript history element not found!");
    return;
  }

  // Observe additions to the transcript history container
  const observer = new MutationObserver(mutations => {
    mutations.forEach(async mutation => {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node.classList && node.classList.contains('transcript-history-box')) {
            const transcriptText = node.innerText.trim();
            if (transcriptText) {
              console.log("Generating image for transcript:", transcriptText);

              // Create a status element
              const statusElem = document.createElement('p');
              statusElem.innerText = "Generating image...";
              statusElem.style.fontStyle = "italic";
              node.appendChild(statusElem);

              try {
                // Call the global generateImage function (from image_generation.mjs)
                const imageUrl = await generateImage(transcriptText);

                // Remove the status element
                node.removeChild(statusElem);

                // Create an image element and append it to the transcript box
                const imgElem = document.createElement('img');
                imgElem.src = imageUrl;
                node.appendChild(imgElem);

                // --- Yes/No Feedback Buttons ---
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
                  node.classList.remove("incorrect");
                  node.classList.add("correct");
                });

                noButton.addEventListener('click', () => {
                  node.classList.remove("correct");
                  node.classList.add("incorrect");
                });

                // Append buttons
                buttonContainer.appendChild(yesButton);
                buttonContainer.appendChild(noButton);
                node.appendChild(buttonContainer);
              } catch (error) {
                console.error("Error generating image:", error);
                statusElem.innerText = "Error generating image";
              }
            }
          }
        }
      }
    });
  });

  observer.observe(transcriptHistory, { childList: true });
});
*/