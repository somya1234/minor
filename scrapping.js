let request = require("request-promise-native");
let req = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
let fromPath = require("pdf2pic").fromPath;
let path = require("path");

req("http://www.ipu.ac.in/exam_notices.php", function(err, res, html){
    if(err == null && res.statusCode == 200){
        parseHtml(html);
        console.log("File written");
    } else if(res.statusCode == 404){
        console.log("Page not found");
    } else {
        console.log(err);
    }
});

async function parseHtml(html){
    let $ = cheerio.load(html);
    let tableArr = $(".table-box table tbody tr");
    for(let i=1; i<8; i++){
        let tableData = $(tableArr[i]).find("td a").attr("href");
        let pdfFileName = `down${i}.pdf`;
        tableData = `http://www.ipu.ac.in${tableData}`;
        //  tableData = "http://www.ipu.ac.in/Pubinfo2020/ntm081020 (5).pdf";
        console.log(tableData);
        await downloadPDF(tableData,pdfFileName );
        await  takeScreenshot( path.join("downloads/",pdfFileName), i);
        console.log("one squence completed ..............."+i);
    }
}


async function downloadPDF(pdfURL, pdfFileName) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log("Writing downloaded PDF file to " + path.join("downloads/",pdfFileName) );
    fs.writeFileSync( path.join("downloads/",pdfFileName), pdfBuffer);
}

async function takeScreenshot(pdfName, idx){
    const options = {
        density: 100,
        saveFilename: `untitled${idx}`,
        savePath: "./images",
        format: "png",
        width: 600,
        height: 600
      };
      const storeAsImage = fromPath(`${pdfName}`, options);
      const pageToConvertAsImage = 1;
       
      storeAsImage(pageToConvertAsImage).then((resolve) => {
        console.log("Page is now converted as image"+ idx);
        return resolve;
      });
}