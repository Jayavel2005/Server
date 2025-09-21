const http = require("http");
const fs = require('fs');


// form creattion
const form = `  <html lang="en">

<body>
    <form action="/message" method="POST">
        <input type="text" name="message" id="message" placeholder="Enter the message">
        <button type="submit">submit</button>
    </form>

    <a href="/readMessages">Read Messages</a>
</body>

</html>`


// creating the server
const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        res.setHeader('Content-Type', "text/html");

        res.write(form);

        return res.end();

    }
    if (req.method === "POST" && req.url === "/message") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on("end", () => {
            const bufferedMessage = Buffer.concat(body).toString()
            const spliltedMessage = bufferedMessage.split("=");
            console.log(spliltedMessage);
            const finalText = spliltedMessage[1].replace(/\+/g, " ")
            if (finalText === "") {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            }
            fs.appendFile('message.txt', finalText + "\n", "utf8", (err) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log("File writed successfully!.");
                res.statusCode = 302;
                res.setHeader("Location", "/");
                console.log("redirected");
                return res.end();

            })


        })

    }
    console.log(url);
    if (url === "/readMessages") {
        res.setHeader("Content-type", "text/html");

        const messages = fs.readFile('message.txt', "utf-8", (err, data) => {
            if (err) {
                console.log("Some error in reading the file");
                return;
            }
            const messageArray = data.split("\n").filter(message => message !== "");
            if (messageArray.length === 0) {
                res.setHeader("Content-type", "text/html")
                res.write("<html>")
                res.write("<body>")
                res.write("<h1>Messge Board is Empty</h1>")
                res.write("<a href='/'>Add Messages</a>");
                res.write("</body>")
                res.write("</html>");
                return res.end();
            }
            res.setHeader("Content-type", "text/html")
            res.write("<html>")
            res.write("<body>")
            res.write("<h1>Messge Board</h1>")
            res.write("<ul>")
            messageArray.forEach(data => {
                res.write(`<li>${data}</li>`);
            })
            res.write("</ul>");
            res.write("<a href='/'>Back to Home</a>");
            res.write("</body>")
            res.write("</html>");



            return res.end();
        })


    }


})

// listening the server
server.listen(3000, () => {
    console.log("The server is running on the port of http://localhost:3000");

})