const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=';
let apiKey;
if (window.location.host === 'runial.github.io') {
    apiKey = 'AIzaSyANejUiaAI7CdaKeBQ5ZJZn5oOCmQPkCc4';
    console.log('Using public-facing Gemini API key');
} else {
    apiKey = 'AIzaSyBtHOqmL9dDoWv1N64fgvr126xV_A1vpPE';
    console.log('Using private Gemini API key');
}

export async function callLlm(prompt) {
    const url = apiUrl + apiKey;

    const data = {
        contents: [{
            parts: [{
                text: prompt,
            }],
        }],
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        return result.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error(`Failed to use Gemini API: ${error}\nFalling back to Pollinations API`);
        return (await fetch('https://text.pollinations.ai/' + prompt)).text();
    }
}