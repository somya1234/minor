let fromPath = require("pdf2pic").fromPath;


const options = {
  density: 100,
  saveFilename: "untitled",
  savePath: "./images",
  format: "png",
  width: 600,
  height: 600
};
const storeAsImage = fromPath("down.pdf", options);
const pageToConvertAsImage = 1;
 
storeAsImage(pageToConvertAsImage).then((resolve) => {
  console.log("Page 1 is now converted as image");
 
  return resolve;
});