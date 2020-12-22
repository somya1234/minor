let puppeteer = require("puppeteer");

let names = ["mygroup", "sonam"]; 
let notices = require('./notices.json');
console.log("hi")

async function sendMessage() {
    let browser = await puppeteer.launch({
        headless: false,
        userDataDir: '~/.config',
        args:["--start-maximized"],
        
        defaultViewport:null
        // slowMo:20
    });
    let pages = await browser.pages();
    let page = pages[0];
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://web.whatsapp.com/", { waitUntil: "networkidle2" });
    /***************search the name**************************** */
    for(let i=0;i<names.length;i++){
        
        await page.waitForSelector("._1awRl",{timeout:0});
        await page.type("._1awRl", names[i]);

     /********************search alternative************************ */
    await page.keyboard.press("Enter");
    /***************type message ***************************** */
    await page.waitForSelector("._2HE1Z._1hRBM",{visible:true});
    let messgae = `Hhello ${names[i]}, how are you? 
                    Here, are the latest circulars of GGISPU website, which might sound usefult to you.
                    `
    await page.type("._2HE1Z._1hRBM",messgae);
    await page.keyboard.press("Enter");

    for(let j=0; j<notices.length; j++){
        //write the captions. 
        let caption = notices[j]["title"]; 
        await page.type("._2HE1Z._1hRBM",caption, {delay:10});  
        await page.keyboard.press("Enter");

        //send the image.
        let image=notices[j]["img"]; 
        await page.click("span[data-icon='clip']");
        let uploadImg=await page.$('input[type="file"]');
        await uploadImg.uploadFile(image);
        // await page.keyboard.press("Enter"); 

        //send caption 
        // await page.waitForSelector("._3tSYy");
        // await page.type("._3tSYy", caption, {delay:50}); 
        //send button
        await page.waitForSelector("._3ipVb");
       await page.click("._3ipVb");
    
    }

     }
     
    console.log("connected successfully")
    
}

sendMessage();

// npm install puppeteer-core
// npm install