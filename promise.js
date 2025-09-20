const promise = new Promise((resove, reject) => {
    setTimeout(() => {
        resove("hi");
    }, 2000);
})

promise.then((data) => {
    return data + "Jayavel"

}).then((data) => {
    console.log(data);
    
}).catch((data) => {
    console.log("failed");

})