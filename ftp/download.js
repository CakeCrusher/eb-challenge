const FTP = require("./FTP");

const downloadFilesFromNOAA = async () => {
  // print current working directory
  const ftp = new FTP();

  await ftp.connect("ftp.ncdc.noaa.gov");

  await ftp.download("/pub/data/ghcn/daily/readme.txt", "./readme.txt");
  await ftp.download(
    "/pub/data/ghcn/daily/by_year/readme-by_year.txt",
    "./readme-by_year.txt"
  );
  await ftp.download(
    "/pub/data/ghcn/daily/by_year/2017.csv.gz",
    "./2017.csv.gz"
  );
  await ftp.unzip("./data/2017.csv.gz", "./energybot/2017.csv");

  ftp.end();
};
downloadFilesFromNOAA();
