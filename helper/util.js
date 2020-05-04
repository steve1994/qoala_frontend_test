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

export const compareString = (a,b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
}

export const sortUserByCity = (arr) => {
    let isSorted;
    do {
        isSorted = true;
        for (let i=0;i<arr.length-1;i++) {
            if (compareString(arr[i].location.city,arr[i+1].location.city) > 0) {
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                isSorted = false;
            }
        }
    } while (!isSorted);
    return arr;
}
