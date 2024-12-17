const textToHTML = (data) => {
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?(\/[^\s]*)?/g;
    return data
        .split('\n') // newlines
        .map((line) =>
            line.replace(
                urlRegex,
                (url) => {
                    const hasProtocol = url.startsWith('http://') || url.startsWith('https://');
                    const formattedUrl = hasProtocol ? url : `http://${url}`;
                    return `<a href="${formattedUrl}" target="_blank" style="color: blue;" rel="noopener noreferrer">${url}</a>`;
                }
            )
        )
        .map((line) => `<p>${line}</p>`)
        .join('');
};

export default textToHTML;