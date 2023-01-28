const fs = require("fs");
const { exec } = require("child_process");
const xml2js = require("xml2js");

class FileHelper {
  static espToXml(filePath) {
    return new Promise((resolve, reject) => {
      const newFileName = `OriginalFile${filePath.slice(-4)}`;
      // copy file to conversion folder
      fs.copyFile(filePath, `./conversion/${newFileName}`, (error) => {
        if (error) {
          console.log("Copy Error:");
          console.log(error);
          resolve("Error");
        } else {
          // execute bethkit command to convert

          exec(
            `cd conversion & bethkit convert ${newFileName} ConvertedFile.XML`,
            (err, stdout) => {
              if (err) {
                console.log("Conversion Error:" + err);
                resolve("Error");
              } else {
                console.log("Success");
                resolve("Success");
              }
            }
          );
        }
      });
    });
  }

  static getItemsFromXml(filePath, itemType) {
    return new Promise((resolve, reject) => {
      const itemArray = [];
      // open file
      fs.readFile(filePath, "utf8", (error, data) => {
        if (error) {
          console.log("error", error);
          resolve(error);
        } else {
          // parse with xml
          xml2js.parseString(data, (err, result) => {
            if (err) {
              console.log(err);
              resolve(err);
            } else {
              // grab only items specified by itemType parameter
              const items = result.plugin["GRUP"].filter(
                (group) => group["$"].label === itemType
              )[0][itemType];
              // add each item to itemArray to return later
              items.forEach((item) => {
                const id = `0x${item["$"].id.slice(2)}`;
                const obj = { itemId: id, itemName: item.FULL[0] };

                itemArray.push(obj);
              });

              resolve(itemArray);
            }
          });
        }
      });
    });
    // this gets returned at the end, key value pair of formId: weaponName
  }
}

module.exports = FileHelper;
// example usage
// FileHelper.espToXml("./src/Test Esp Lightsabers.esp");
// FileHelper.getItemsFromXML("conversion/ConvertedFile.XML", "WEAP");
