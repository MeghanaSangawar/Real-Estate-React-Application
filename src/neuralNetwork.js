// src/neuralNetwork.js
import { NeuralNetwork } from 'brain.js';
import realEstateData from './data/realestate.json';

// One-hot encode locations
function encodeLocation(location) {
    const locationMap = {
        'Downtown': [1, 0, 0],
        'Suburban': [0, 1, 0],
        'Rural': [0, 0, 1]
    };
    return locationMap[location] || [0, 0, 0]; // Default if unknown
}

// Normalize numerical data
function normalize(value, min, max) {
    return (value - min) / (max - min);
}

// Denormalize to get the original value range
function denormalize(value, min, max) {
    return value * (max - min) + min;
}

// Find min and max values for each field
const areas = realEstateData.map(item => parseInt(item.Area));
const bedrooms = realEstateData.map(item => parseInt(item.Bedrooms));
const bathrooms = realEstateData.map(item => parseInt(item.Bathrooms));
const ages = realEstateData.map(item => parseInt(item["Age of Property"]));
const prices = realEstateData.map(item => parseInt(item.Price));

const maxArea = Math.max(...areas);
const minArea = Math.min(...areas);
const maxBedrooms = Math.max(...bedrooms);
const minBedrooms = Math.min(...bedrooms);
const maxBathrooms = Math.max(...bathrooms);
const minBathrooms = Math.min(...bathrooms);
const maxAge = Math.max(...ages);
const minAge = Math.min(...ages);
const maxPrice = Math.max(...prices);
const minPrice = Math.min(...prices);

// Prepare training data
const trainingData = realEstateData.map(item => ({
    input: {
        area: normalize(parseInt(item.Area), minArea, maxArea),
        bedrooms: normalize(parseInt(item.Bedrooms), minBedrooms, maxBedrooms),
        bathrooms: normalize(parseInt(item.Bathrooms), minBathrooms, maxBathrooms),
        age: normalize(parseInt(item["Age of Property"]), minAge, maxAge),
        ...Object.fromEntries(encodeLocation(item.Location).map((value, index) => [`location${index + 1}`, value]))
    },
    output: {
        price: normalize(parseInt(item.Price), minPrice, maxPrice)
    }
}));

// Create and train the network
const net = new NeuralNetwork();

// Train the network and log progress
export function trainNetwork(callback) {
    try {
        net.train(trainingData.map(data => ({
            input: [
                data.input.area,
                data.input.bedrooms,
                data.input.bathrooms,
                data.input.age,
                ...Object.values(data.input).filter((_, i) => i >= 4) // location values
            ],
            output: [data.output.price]
        }), {
            iterations: 10000,
            log: true,
            learningRate: 0.01,
            callback: callback,
            callbackPeriod: 500
        }));
    } catch (error) {
        console.error("Error training the network:", error);
    }
}

// Predict the price based on property input
export function predictPrice(property) {
    try {
        const encodedLocation = encodeLocation(property.Location);
        const input = {
            area: normalize(parseInt(property.Area), minArea, maxArea),
            bedrooms: normalize(parseInt(property.Bedrooms), minBedrooms, maxBedrooms),
            bathrooms: normalize(parseInt(property.Bathrooms), minBathrooms, maxBathrooms),
            age: normalize(parseInt(property["Age of Property"]), minAge, maxAge),
            ...Object.fromEntries(encodedLocation.map((value, index) => [`location${index + 1}`, value]))
        };

        // Get the predicted price normalized
        const result = net.run([
            input.area,
            input.bedrooms,
            input.bathrooms,
            input.age,
            ...Object.values(input).filter((_, i) => i >= 4) // location values
        ]);
        
        console.log("Raw result from neural network:", result); // Log the raw output from the neural network

        const normalizedPrice = result[0]; // Assume it's the first element of the result array

        // Denormalize the price and return it
        const denormalizedPrice = denormalize(normalizedPrice, minPrice, maxPrice);

        // Log and ensure that it's a number
        console.log("Denormalized Price:", denormalizedPrice);

        if (typeof denormalizedPrice !== 'number') {
            console.error("Denormalized price is not a number:", denormalizedPrice);
            return "Prediction error";  // Return a message if it's not a number
        }

        return denormalizedPrice.toFixed(2);  // Return as a string with 2 decimal places
    } catch (error) {
        console.error("Error in prediction:", error);  // Log the error
        return "Prediction error";  // Return a message if any error occurs
    }
}

