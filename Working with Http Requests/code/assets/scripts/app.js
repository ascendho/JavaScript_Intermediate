'use strict';

const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

function sendHttpRequest(method, url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300)
                resolve(xhr.response);
            else
                reject(new Error('Something went wrong!'));
            // const listOfPosts = JSON.parse(xhr.response);
        }

        xhr.onerror = function () {
            reject(new Error('Failed to send request!'));
        }

        xhr.send(JSON.stringify(data));

    });
}

async function fetchPosts() {
    try {
        const listOfPosts = await sendHttpRequest('GET',
            'https://jsonplaceholder.typicode.com/posts');
        for (const post of listOfPosts) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id;
            listElement.append(postEl);
        }

        console.log(listOfPosts);
    } catch (error) {
        alert(error.message);
    }


}

async function createPost(title, content, userId = Math.random()) {
    const post = {
        title: title,
        body: content,
        userId: userId
    };
    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);

}


fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector("#title").value;
    const enteredContent = event.currentTarget.querySelector("#content").value;
    createPost(enteredTitle, enteredContent);
})

let isClicked = false;
postList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        // console.log(event.target);
        // console.log(event.target.closest('li'));
        const postId = event.target.closest('li').id;
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`);
        // console.log(postId);
    }
})

// fetchPosts();
// createPost('DUMMY', 'A dummy post!');


