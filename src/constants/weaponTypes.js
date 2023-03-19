import fist from "../img/fist.png";
import sword from "../img/sword.png";
import dagger from "../img/dagger.png";
import warAxe from "../img/waraxe.png";
import mace from "../img/mace.png";
import battleaxe from "../img/battleaxe.png";
import greatsword from "../img/greatsword.png";
import bow from "../img/bow.png";
import staff from "../img/staff.png";
import crossbow from "../img/crossbow.png";
import warhammer from "../img/warhammer.png";
import shield from "../img/shield.png";
import alteration from "../img/alteration.png";
import illusion from "../img/illusion.png";
import destruction from "../img/destruction.png";
import conjuration from "../img/conjuration.png";
import restoration from "../img/restoration.png";
import scroll from "../img/scroll.png";
import torch from "../img/torch.png";

const weaponTypes = {
  TYPE: [
    // { itemName: "Others", itemId: -1, image: "" },
    { itemName: "Fists", itemId: 0, image: fist },
    { itemName: "Swords", itemId: 1, image: sword },
    { itemName: "Daggers", itemId: 2, image: dagger },
    { itemName: "War Axes", itemId: 3, image: warAxe },
    { itemName: "Maces", itemId: 4, image: mace },
    { itemName: "Greatswords", itemId: 5, image: greatsword },
    { itemName: "Battleaxes", itemId: 6, image: battleaxe },
    { itemName: "Bows", itemId: 7, image: bow },
    { itemName: "Staff", itemId: 8, image: staff },
    { itemName: "Crossbows", itemId: 9, image: crossbow },
    { itemName: "Warhammers", itemId: 10, image: warhammer },
    { itemName: "Shields", itemId: 11, image: shield },
    { itemName: "Alteration Spells", itemId: 12, image: alteration },
    { itemName: "Illusion Spells", itemId: 13, image: illusion },
    { itemName: "Destruction Spells", itemId: 14, image: destruction },
    { itemName: "Conjuration Spells", itemId: 15, image: conjuration },
    { itemName: "Restoration Spells", itemId: 16, image: restoration },
    { itemName: "Scrolls", itemId: 17, image: scroll },
    { itemName: "Torches", itemId: 18, image: torch },
  ],
};

export default weaponTypes;
