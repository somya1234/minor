let fs=require("fs");
let puppeteer=require("puppeteer");
let cFile=process.argv[2];
let num=process.argv[3];
(async function(){
    let browser=await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        slowMo:10,
        args:["--incognito","--start-maximized","--disable-notifications"]
    });
    let pages=await browser.pages();
    let page=pages[0];
    //await page.goto("https://www.google.com");
    let data=await fs.promises.readFile(cFile);
    let{url,pwd,user}=JSON.parse(data);
    await page.goto(url,{waitUntil:"networkidle2"});
    await page.type("#email",user,{delay:20});
    await page.type("#pass",pwd,{delay:20});
    await Promise.all([page.click("button[type=submit]"),page.waitForNavigation({waitUntil:"networkidle2"})]);
    // await page.waitForSelector("div[aria-label=Create]",{visible:true});
    // await Promise.all([page.click("div[aria-label=Create]"), page.waitForNavigation({waitUntil:"networkidle2"})]);
    // await page.waitForSelector(".qzhwtbm6 .knvmm38d",{visible:true});
    // await page.click(".qzhwtbm6 .knvmm38d");

    console.log(1);
   await page.waitForSelector(".art1omkt.ot9fgl3s.rnr61an3",{visible:true});
   console.log(2);
   let alldivtags=await page.$$(".art1omkt.ot9fgl3s.rnr61an3");
   console.log(alldivtags);
//    await Promise.all([
//     alldivtags.click(),
//     page.waitForNavigation({waitUntil:"networkidle2"})
// ]);
//await Promise.all([page.click(".n00je7tq.arfg74bv.qs9ysxi8.k77z8yql.i09qtzwb.n7fi1qx3.b5wmifdl.hzruof5a.pmk7jnqg.j9ispegn.kr520xx4.c5ndavph.art1omkt.ot9fgl3s.rnr61an3"), page.waitForNavigation({waitUntil:"networkidle2"})]);
    console.log("done");
    })();

    // .n00je7tq.arfg74bv.qs9ysxi8.k77z8yql.i09qtzwb.n7fi1qx3.b5wmifdl.hzruof5a.pmk7jnqg.j9ispegn.kr520xx4.c5ndavph.art1omkt.ot9fgl3s.rnr61an3