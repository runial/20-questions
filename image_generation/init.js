'use strict';

// Generate and display image when button is pressed
document.getElementById('btn-generate-img').addEventListener('click', async () => {
    document.getElementById('generate-img-status').innerText = 'Generating...';
    try {
        const imageUrl = await generateImage(
            document.getElementById('generate-img-prompt').value
        );
        document.getElementById('generated-img').setAttribute('src', imageUrl);
        document.getElementById('generate-img-status').innerText = '';
    } catch (e) {
        document.getElementById('generate-img-status').innerText
            = 'Error: ' + e.message;
    }
});