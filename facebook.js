let fs=require("fs");
let puppeteer=require("puppeteer");
let cFile=process.argv[2];
(async function(){
    let browser=await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        slowMo:10,
        args:["--incognito","--start-maximized","--disable-notifications"]
    });
    let pages=await browser.pages();
    let page=pages[0];
    let data=await fs.promises.readFile(cFile);
    let{url,pwd,user}=JSON.parse(data);
    await page.goto(url,{waitUntil:"networkidle2"});
    await page.type("#email",user,{delay:20});
    await page.type("#pass",pwd,{delay:20});
    await Promise.all([page.click("button[type=submit]"),page.waitForNavigation({waitUntil:"networkidle2"})]);
    let imgs=["./images/untitled2.1.png","./images/untitled3.1.png","./images/untitled4.1.png","./images/untitled5.1.png","./images/untitled6.1.png"];
    for(let i=0;i<imgs.length;i++){
        await page.setDefaultNavigationTimeout(0);
        await page.waitForSelector('input[type="file"]');
        const elementHandle=await page.$('input[type="file"]');
        await elementHandle.uploadFile(imgs[i]);
        await page.waitForSelector(".bwm1u5wc",{visible:true});
        await page.click(".bwm1u5wc");
    }
    console.log("notices updated successfully on Facebook.");
    })();
