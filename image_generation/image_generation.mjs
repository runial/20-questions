'use strict';

export async function generateImage(imagePrompt) {
    const response = await fetch(
        'https://image.pollinations.ai/prompt/' + imagePrompt
    );
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}