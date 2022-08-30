const Ftp = require("ftp");
const fs = require("fs");
var URL = require("url");

const HOST = "ftp.ncdc.noaa.gov";
const USER = "anonymous";
const PASSWORD = "1sebastian1sosa1@gmail.com";

// extablish connection to the ftp server
var ftp = (url, cb) => {
  var ftp = new Ftp();
  var urlObj = URL.parse(url);
  ftp.connect({
    host: urlObj.path,
    user: USER,
    password: PASSWORD,
  });

  ftp.on("error", function (err) {
    throw Error(err);
  });

  ftp.on("ready", function () {
    // write the file readme.txt to the file system
    console.log("ftp ready");
    cb(ftp);
  });
};

// retrieve the ls of the ftp files
ftp("ftp.ncdc.noaa.gov", (ftp) => {
  ftp.list("/pub/data/ghcn/daily/by_year", function (err, list) {
    if (err) throw err;
    const fullList = list.map((item) => item.name);
    // there are too many files to print as json. So, stringify.
    console.log(fullList.toString());
    ftp.end();
  });
});

ftp("ftp.ncdc.noaa.gov", (ftp) => {
  ftp.get("/pub/data/ghcn/daily/readme.txt", function (err, stream) {
    if (err) {
      throw Error(err);
    }

    console.log("fetching readme.txt");

    stream
      .once("close", function () {
        ftp.end();
      })
      .pipe(fs.createWriteStream("readme.txt"))
      .on("finish", function () {
        return console.log("finished fetching readme.txt");
      });
    return;
  });
});

ftp("ftp.ncdc.noaa.gov", (ftp) => {
  ftp.get(
    "/pub/data/ghcn/daily/by_year/readme-by_year.txt",
    function (err, stream) {
      if (err) {
        throw Error(err);
      }

      console.log("fetching readme-by_year.txt");

      stream
        .once("close", function () {
          ftp.end();
        })
        .pipe(fs.createWriteStream("readme-by_year.txt"))
        .on("finish", function () {
          return console.log("finished fetching readme-by_year.txt");
        });
      return;
    }
  );
});

ftp("ftp.ncdc.noaa.gov", (ftp) => {
  ftp.get("/pub/data/ghcn/daily/by_year/2017.csv.gz", function (err, stream) {
    if (err) {
      throw Error(err);
    }

    console.log("fetching 2017.csv.gz");

    stream
      .once("close", function () {
        ftp.end();
      })
      .pipe(fs.createWriteStream("2017.csv.gz"))
      .on("finish", function () {
        // unzip the file and save it to the file system

        console.log("finished fetching 2017.csv.gz");
        console.log("unzipping 2017.csv.gz");

        var gzip = require("zlib");
        var gunzip = gzip.createGunzip();
        var input = fs.createReadStream("2017.csv.gz");
        var output = fs.createWriteStream("2017.csv");
        input
          .pipe(gunzip)
          .pipe(output)
          .on("finish", function () {
            console.log("finished unzipping 2017.csv");
          });
        return;
      });

    // upload by batch of 100 rows files to the server

    return;
  });
});

console.log("done");
