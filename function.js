
const translate = require('node-google-translate-skidz');
const { readFileSync, promises: fsPromises } = require('fs');


function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

async function poorlyTranslate(text,source,target){
    let output = "";
    let random = "";

    // for(let i = 0; i < chaotic; i++){
    //     random = code_list[Math.floor(Math.random()*code_list.length)];

        output = await translate({
            // text: i < 1 ? text : output,
            text,
            source,
            // target: i == chaotic - 1 ? target:random
            target
          }, function(result) {
            return (result);
          });

        //   console.log(output.translation);
        // source = random;
    // }

    return await output;

}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

module.exports = { syncReadFile, poorlyTranslate, wait }