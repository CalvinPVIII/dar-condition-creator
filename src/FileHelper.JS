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
      const groupedItems = { WEAP: [], ARMO: [], SPEL: [] };
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
              try {
                // grab all weapons, armors, and spells
                const itemGroups = result.plugin["GRUP"].filter((group) =>
                  ["WEAP", "ARMO", "SPEL"].includes(group["$"].label)
                );

                // add each item to itemArray to return later
                itemGroups.forEach((group) => {
                  if (group.SPEL) {
                    groupedItems["SPEL"] = group.SPEL;
                    const restructuredItems = groupedItems["SPEL"].map(
                      (item) => {
                        const id = `0x${item["$"].id.slice(2)}`;
                        return { itemId: id, itemName: item.FULL[0] };
                      }
                    );
                    groupedItems["SPEL"] = restructuredItems;
                  } else if (group.WEAP) {
                    groupedItems["WEAP"] = group.WEAP;
                    const restructuredItems = groupedItems["WEAP"].map(
                      (item) => {
                        const id = `0x${item["$"].id.slice(2)}`;
                        return { itemId: id, itemName: item.FULL[0] };
                      }
                    );
                    groupedItems["WEAP"] = restructuredItems;
                  } else if (group.ARMO) {
                    groupedItems["ARMO"] = group.ARMO;
                    const restructuredItems = groupedItems["ARMO"].map(
                      (item) => {
                        const id = `0x${item["$"].id.slice(2)}`;
                        return { itemId: id, itemName: item.FULL[0] };
                      }
                    );
                    groupedItems["ARMO"] = restructuredItems;
                  }
                });

                resolve(groupedItems);
              } catch (err) {
                console.log(err);
                resolve("error");
              }
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
