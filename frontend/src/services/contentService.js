import http from "./httpService";

const apiEndPoint = `/content`;

function contentUrl(id){
    return `${apiEndPoint}/${id}`;
}

export function getSearchContent(query) {
    return http.post(`${apiEndPoint}/search`,{query: query});
}

export function getContent(contentId) {
    return http.get(contentUrl(contentId))
}

export function indexContent(url) {
    console.log(url)
    return http.post(apiEndPoint, {url:url})
}