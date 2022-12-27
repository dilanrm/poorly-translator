require('dotenv').config()

const { poorlyTranslate, syncReadFile } = require('./function');

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("*/app", express.static(path.join(__dirname , '/app')));


let lang_code_list = (syncReadFile('./src/lang_code_list.txt'));
let lang_code = [];

for (let i in lang_code_list) {
    lang_code_list[i] = lang_code_list[i].split(':');
    lang_code[i] = lang_code_list[i][1];
}

app.get("/", (req,res) => {
    res.redirect("/app");
})

app.post("/api/get-lang-code", (req, res) => {
    res.json(lang_code_list);
})

app.post("/api/get-translate", async (req, res, next) => {
    const { text, source, target, chaotic } = req.body;
    let random = source;
    let random1 = target;
    let output = text;
    let code = lang_code.filter(v => !v.includes([source,target]));

    for (let i = 0; i < chaotic; i++) {
        random1 = code[Math.floor(Math.random() * code.length)];
        output = await poorlyTranslate(String(output), random, random1);
        random = random1;
        // console.log(output.translation, random, random1);
    }

    output = await poorlyTranslate(String(output), random, target);

    res.json(await { result: output.translation, status:200 });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});