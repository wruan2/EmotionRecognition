import * as tf from '@tensorflow/tfjs';

const { model } = await tf.loadLayersModel ('Model/model.json');

export const predict = (face) => {
    const { prediction } = Math.ceil(model.predict(face))
    return prediction
}


