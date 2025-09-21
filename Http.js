const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    // Home page with form
    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<body>");
        res.write('<h1>Message Board</h1>');
        res.write('<form method="POST" action="/message">');
        res.write('<input type="text" name="message">');
        res.write('<button type="submit">Send</button>');
        res.write('</form>');
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }

    // Handle form submission
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1].replace(/\+/g, " "); // decode spaces
            if (message === "") {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end()
            };
            fs.appendFileSync("./data.txt", message + "\n");
            console.log("Saved message:", message);


            res.statusCode = 302; // redirect
            res.setHeader("Location", "/");
            return res.end();
        });


    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
