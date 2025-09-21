// const promise = new Promise((resove, reject) => {
//     setTimeout(() => {
//         resove("hi");
//     }, 2000);
// })

// promise.then((data) => {
//     return data + "Jayavel"

// }).then((data) => {
//     console.log(data);

// }).catch((data) => {
//     console.log("failed");

// })



const { log } = require('console');
const fs = require('fs');
let greet;
const mes = fs.readFile('data.txt', "utf-8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    greet = data;
});

console.log(greet);




