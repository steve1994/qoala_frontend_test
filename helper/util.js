import {BACKGROUND_RED, BACKGROUND_GREEN, BACKGROUND_BLUE} from './constant';

export const determineBackgroundColorBasedOnAge = (age) => {
    let color;
    if (age < 21) {
        color = BACKGROUND_RED;
    } else {
        if (age >= 21 && age <= 56) {
            color = BACKGROUND_GREEN;
        } else {
            color = BACKGROUND_BLUE;
        }
    }
    return color;
}

export const groupUserByAge = (arr) => {
    return arr.reduce((acc, obj) => {
        let age = parseInt(obj.dob.age);
        let color = determineBackgroundColorBasedOnAge(age);
        if (!acc[color]) {
            acc[color] = [];
        }
        acc[color].push(obj);
        return acc;
    }, {})
}

export const mergeGroupUserByAgeReducer = (obj) => {
    let mergeArray = [];
    for (let key in obj) {
        mergeArray = mergeArray.concat(obj[key]);
    }
    return mergeArray;
}

export const sortUserByCity = (arr) => {
    let listCity = [];
    let mapStringToIndex = {};
    let counter = 1;
    for (let i=0;i<arr.length;i++) {
        listCity.push(arr[i].location.city);
        if (mapStringToIndex[arr[i].location.city]) {
            mapStringToIndex[arr[i].location.city + '-' + counter] = i;
            counter++;
        } else {
            mapStringToIndex[arr[i].location.city] = i;
        }
    }
    let sortedListCity = listCity.sort();
    let listSortedUser = [];
    for (let i=0;i<sortedListCity.length;i++) {
        listSortedUser.push(arr[mapStringToIndex[sortedListCity[i]]]);
    }
    return listSortedUser;
}
