const Ftp = require("ftp");
const fs = require("fs");
var URL = require("url");
var gzip = require("zlib");

// create a class caled FTP
class FTP {
  constructor() {
    this.ftp = new Ftp();
    this.USER = "anonymous";
    this.PASSWORD = "1sebastian1sosa1@gmail.com";
  }
  // connect to the ftp server
  async connect(host) {
    host = URL.parse(host);
    await new Promise((resolve, reject) => {
      this.ftp.connect({
        host: host.path,
        user: this.USER,
        password: this.PASSWORD,
      });
      this.ftp
        .on("error", function (err) {
          throw Error(err);
        })
        .on("ready", function () {
          console.log("ftp ready");
          resolve();
        });
    });
  }

  // download a file from the ftp server
  async download(ftpPath, localPath) {
    await new Promise((resolve, reject) => {
      this.ftp.get(ftpPath, function (err, stream) {
        if (err) {
          throw Error(err);
        }

        console.log(`fetching ${ftpPath}`);

        stream.pipe(fs.createWriteStream(localPath)).on("finish", function () {
          resolve();
          console.log(`downloaded to ${localPath}`);
        });
      });
    });
  }

  // unzip a local file
  async unzip(localPath, unzipPath) {
    await new Promise((resolve, reject) => {
      console.log(`unzipping ${localPath}`);

      const gunzip = gzip.createGunzip();
      const input = fs.createReadStream(localPath);
      const output = fs.createWriteStream(unzipPath);
      input
        .pipe(gunzip)
        .pipe(output)
        .on("finish", function () {
          console.log(`finished unzipping to ${unzipPath}`);
          resolve();
        })
        .on("error", function (err) {
          throw Error(err);
        });
    });
  }

  // terminate the ftp connection
  end() {
    this.ftp.end();
  }
}

module.exports = FTP;
