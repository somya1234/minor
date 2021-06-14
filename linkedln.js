let fs=require("fs");
let puppeteer=require("puppeteer");
let notices = require('./notices.json');
let cFile="credLinkedln.json";
console.log(notices.length);
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
    await page.goto(url,{waitUntil: 'load', timeout: 0});
    await page.type("#username",user,{delay:20});
    await page.type("#password",pwd,{delay:20});
    await Promise.all([page.click("button[type=submit]"),page.waitForNavigation({waitUntil:"networkidle2"})]);
    
    for(let i=0;i<notices.length;i++){
        //click on start a Post
        await page.waitForXPath('//span[text()="Start a post"]',{visible:true});
        let startApost=await page.$x('//span[text()="Start a post"]');
        startApost[0].click();

        //click to upload notice image
        await page.waitForXPath('//li-icon[@type="image-icon"]',{visible:true});
        let photoIcon=await page.$x('//li-icon[@type="image-icon"]');
        photoIcon[0].click();

        //Upload notice image.
        await page.setDefaultNavigationTimeout(0);
        await page.waitForSelector('#image-sharing-detour-container__file-input');
        const elementHandle=await page.$('#image-sharing-detour-container__file-input');
        let image=notices[i]["img"];
        await elementHandle.uploadFile(image);

        //click Done button
        await page.waitForXPath('//span[text()="Done"]');
        let doneButton=await page.$x('//span[text()="Done"]');
        doneButton[0].click();

        //write caption
        let caption=notices[i]["title"];
        await page.waitForXPath('//div[@data-placeholder="What do you want to talk about?"]');
        let captionInputBox=await page.$x('//div[@data-placeholder="What do you want to talk about?"]');
        captionInputBox[0].type(caption);

        //click on Post button.
        await page.waitForSelector('.share-actions__primary-action.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view');
        await page.click('.share-actions__primary-action.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view');

    }
    console.log("notices updated successfully on Linkedin.");
    })();