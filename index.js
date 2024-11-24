const { exec } = require("child_process");

exec("python3 dht22.py", (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});
