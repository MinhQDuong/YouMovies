export const API_KEY = ''; // Replace with your actual API key

export const decodeHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.documentElement.textContent;
};
export const value_converter = (viewCount) => {
    if (viewCount >= 1000000) {
      return `${Math.floor(viewCount / 1000000)}M`;
    } else if (viewCount >= 1000) {
      return `${Math.floor(viewCount / 1000)}K`;
    } else {
      return viewCount;
    }
};


