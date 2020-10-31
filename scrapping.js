let request = require("request-promise-native");
let req = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
let fromPath = require("pdf2pic").fromPath;

req("http://www.ipu.ac.in/exam_notices.php", function(err, res, html){
    if(err == null && res.statusCode == 200){
        // fs.writeFileSync("abc.html",html);
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
    for(let i=1; i<11; i++){
        let tableData = $(tableArr[i]).find("td a").attr("href");
        let outputFilename = `down${i}.pdf`;
        tableData = `http://www.ipu.ac.in${tableData}`;
        //  tableData = "http://www.ipu.ac.in/Pubinfo2020/ntm081020 (5).pdf";
        console.log(tableData);
        await downloadPDF(tableData,outputFilename );
        await  takeScreenshot(outputFilename, i);
         console.log("one squence completed ..............."+i);
    }
}


async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log("Writing downloaded PDF file to " + outputFilename );
    fs.writeFileSync(outputFilename, pdfBuffer);
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
        console.log("Page  is now converted as image"+ idx);
        return resolve;
      });
}