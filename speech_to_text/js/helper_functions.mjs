export const $ = (selector) =>
    document.querySelector(selector);
$.all = (selector) =>
    document.querySelectorAll(selector);
$.showElement = (element) =>
    element.removeAttribute('hidden');
$.hideElement = (element) =>
    element.setAttribute('hidden', '');
$.scrollBottom = (element) =>
    element.scrollTop = element.scrollHeight;
$.createElement = (elementName, attributes) => {
    const el = document.createElement(elementName);
    for (const attributeName in attributes)
        el.setAttribute(attributeName, attributes[attributeName]);
    return el;
}