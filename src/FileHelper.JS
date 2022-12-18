const fs = require("fs");
const { exec } = require("child_process");
const xml2js = require("xml2js");

export default class FileHelper {
  static espToXml(filePath) {
    const newFileName = `OriginalFile${filePath.slice(-4)}`;
    fs.copyFile(filePath, `./conversion/${newFileName}`, (error) => {
      if (error) {
        console.log("Error:");
        console.log(error);
        return "Error" + error;
      } else {
        console.log("else");
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
    const itemObj = {};
    console.log(filePath);
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        console.log("error", error);
        return error;
      } else {
        xml2js.parseString(data, (err, result) => {
          if (err) {
            console.log(err);
            return err;
          } else {
            const items = result.plugin["GRUP"].filter(
              (group) => group["$"].label === itemType
            )[0][itemType];
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

// example usage
FileHelper.getItemsFromXML("conversion/ConvertedFile.XML", "WEAP");
