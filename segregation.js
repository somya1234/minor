let notices = require('./notices.json');
let fs = require("fs");
let path = require("path");


let types = ["Exam", "Holiday", "Financial", "Datesheets", "Academic Session", "Lecture", 
"Fee", "Career", "Admission", "Evaluation", "research", "Theory", "Registration", "Covid", 
"Reappear", "Health", "Competition", "activities", "Programme", "Application", "Faculty",
"Employement", "Promotions", "Training", "Training and Placement"];


console.log("Segregating the different notices on the basis of their types");
for(let i=0;i<notices.length;i++) {
    let caption=notices[i]["title"];
    console.log("The caption of the notice is " + caption);
    for(let j = 0; j<types.length; j++) {
        let isPresent = caption.includes(types[j]);
        if(isPresent) {
            console.log(`${types[j]} is present in the caption ${caption}`);
            console.log("Writing the notice into the folder " + types[j]);
            fs.writeFileSync( path.join("types/", types[j]), notices[i]["img"]);
        }

    }
}

console.log("The segregation of all the notices have been completed...");