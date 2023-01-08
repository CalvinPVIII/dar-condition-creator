const fs = require("fs");
const { exec } = require("child_process");
const xml2js = require("xml2js");

class FileHelper {
  static espToXml(filePath) {
    const newFileName = `OriginalFile${filePath.slice(-4)}`;
    // copy file to conversion folder
    fs.copyFile(filePath, `./conversion/${newFileName}`, (error) => {
      if (error) {
        console.log("Error:");
        console.log(error);
        return "Error" + error;
      } else {
        // execute bethkit command to convert
        exec(
          `cd conversion & bethkit convert ${newFileName} ConvertedFile.XML`,
          (err, stdout) => {
            if (err) {
              console.log(err);
              return "Error: " + err;
            }
          }
        );
      }
    });
    return "Success";
  }

  static getItemsFromXML(filePath, itemType) {
    // this gets returned at the end, key value pair of formId: weaponName
    const itemObj = {};
    // open file
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        console.log("error", error);
        return error;
      } else {
        // parse with xml
        xml2js.parseString(data, (err, result) => {
          if (err) {
            console.log(err);
            return err;
          } else {
            // grab only items specified by itemType parameter
            const items = result.plugin["GRUP"].filter(
              (group) => group["$"].label === itemType
            )[0][itemType];
            // add each item to itemObj to return later
            items.forEach((item) => {
              const id = `0x${item["$"].id.slice(2)}`;
              itemObj[id] = item.FULL[0];
            });
            console.log(itemObj);
          }
        });
      }
    });
    return itemObj;
  }
}

module.export = FileHelper;
// example usage
// FileHelper.espToXml("./src/Test Esp Lightsabers.esp");
// FileHelper.getItemsFromXML("conversion/ConvertedFile.XML", "WEAP");
