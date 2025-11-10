const cp = require("child_process");

const url = "https://www.google.com";

if (process.platform === "win32") {
  cp.execSync(`start ${url}`);
} else if (process.platform === "darwin") {
  cp.execSync(`open ${url}`);
} else {
  cp.execSync(`xdg-open ${url}`);
}
