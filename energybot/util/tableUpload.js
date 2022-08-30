var fs = require("fs");
var csv = require("csvtojson");

// deprecated streaming version of uploading to the database
var uploadToTable = async (queryInterface = null, Climate) =>
  await new Promise(function (resolve, reject) {
    const stream = fs.createReadStream("2017.csv");
    let chunkCount = 0;
    let totalLines = 0;
    stream
      .on("data", function (chunk) {
        const text = chunk.toString();
        const lines = text.split("\n");

        let climates = lines.map((line) => {
          const [
            stationId,
            date,
            element,
            dataValue,
            mFlag,
            qFlag,
            sFlag,
            obsTime,
          ] = line.split(",");

          return {
            stationId: stationId || null,
            date: date || null,
            element: element || null,
            dataValue: parseInt(dataValue) || null,
            mFlag: mFlag || null,
            qFlag: qFlag || null,
            sFlag: sFlag || null,
            obsTime: obsTime || null,
          };
        });

        console.log(`chunk ${chunkCount}`);
        Climate.bulkCreate(climates);

        chunkCount++;
        totalLines += lines.length;
      })
      .on("end", function () {
        console.log("lines: " + totalLines);
        console.log("chunks: " + chunkCount);
        resolve(chunkCount);
      })
      .on("error", function (err) {
        reject(err);
      });
  });

module.exports = uploadToTable;
