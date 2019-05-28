const Jimp = require('jimp');

class Modify {
    constructor (path){
        this.path = path;
    }
    modify (){
        Jimp.read(`${this.path}`, (err, file) => {
        if (err) throw err;
        file
            .resize(48, 48) 
            .grayscale()
            .write(`${this.path}`);
        });
        return;
    }
}
module.exports = Modify; 