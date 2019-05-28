const tf = require('@tensorflow/tfjs-node');
const { Image, createCanvas } = require('canvas');
const handler = tf.io.fileSystem('./Model/model.json');

class Predict {
    constructor (path){
        this.path = path;
    }
    async predict(){
        const width = 48;
        const height = 48;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.src = this.path;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Converts to greyscale
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        const values = new Array(2304);
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg; 
        }
        ctx.putImageData(imageData, 0, 0);
        
        for (var i = 0; i < data.length / 4; i++){
            values[i] = data[i * 4];
        }

        // Converts image into tensor
        var ts = tf.tensor([values]);
        ts = ts.asType('float32');
        ts = ts.div(255.0);
        ts = ts.reshape([1, 48, 48]);
        ts = ts.expandDims(-1);

        // Loads models and makes prediction
        const model = await tf.loadLayersModel(handler);
        var prediction = model.predict([ts]);
        prediction = prediction.reshape([7]);
        const val = prediction.dataSync();
        const arr = Array.from(val);
        return arr;
    }
}
module.exports = Predict;

