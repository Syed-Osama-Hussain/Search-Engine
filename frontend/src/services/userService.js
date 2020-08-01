import http from "./httpService";

const apiEndPoint = `/user`;

export function register(user){
    return http.post(apiEndPoint,{
        email: user.username,
        name: user.name,
        password: user.password       
    })
}

export function getUserHistory(userId){
    return http.get(`${apiEndPoint}/${userId}/history`)
}