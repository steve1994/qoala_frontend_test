const API_URL = 'https://randomuser.me/api?results=100';

export const fetchApiUsers = async() => {
    let response = await fetch(API_URL);
    let data = await response.json();
    return data;
}
