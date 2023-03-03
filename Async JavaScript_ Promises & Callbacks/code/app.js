'use strict';
const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = (opts) => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(success => {
            resolve(success);
        }, error => {
            reject(error);

        }, opts);
    });

}

const setTimer = (duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!');
        }, duration);
    });
}


function trackUserHandler() {
    let positionData;
    getPosition().then(posData => {
        positionData = posData;
        return setTimer(2000);
    }).catch(err => {
        console.log(err);
        return 'On we go...';
    })
        .then(data => {
            console.log(data, positionData);
        })
    // navigator.geolocation.getCurrentPosition(posData => {
    //     setTimer(2000).then(data => {
    //         console.log(data, posData);
    //     })
    // }, error => {
    //     console.log(error);
    // });
    setTimer(1000).then(() => {
        console.log('Timer done!');
    });

    console.log('Getting position...');
    let result = 0;
    for (let i = 0; i < 10000000; i++) {
        result += i;
    }

    console.log(result);
}

button.addEventListener('click', trackUserHandler);

