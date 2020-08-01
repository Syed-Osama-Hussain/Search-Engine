import http from "./httpService";

const apiEndPoint = `/content`;

function contentUrl(id){
    return `${apiEndPoint}/${id}`;
}

export function getSearchContent() {
    return http.get(`${apiEndPoint}/search`);
}

export function getContent(contentId) {
    return http.get(contentUrl(contentId))
}

export function indexContent(url) {
    return http.post(apiEndPoint, url)
}