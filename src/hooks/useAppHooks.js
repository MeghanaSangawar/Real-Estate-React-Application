import { useState, useEffect } from 'react';
import { trainNetwork, predictPrice } from '../neuralNetwork';
import validateInput from '../exceptions/Validation';

export const useAppHooks = () => {
    const [predictedPrice, setPredictedPrice] = useState(0);
    const [actualPrice, setActualPrice] = useState(0);
    const [propertyInput, setPropertyInput] = useState({
        Area: "",
        Bedrooms: "",
        Bathrooms: "",
        Location: "Downtown",
        "Age of Property": ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        trainNetwork((stats) => {
            console.log(`Training: ${stats.iterations} iterations`);
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPropertyInput(prevInput => ({ ...prevInput, [name]: value }));
    };

    const handleInputBlur = (event) => {
        const { name, value } = event.target;
        const validationMessage = validateInput({ ...propertyInput, [name]: value });

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: validationMessage || null
        }));
    };

    const handleInputFocus = (event) => {
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[event.target.name];
            return newErrors;
        });
    };

    const handlePredictClick = (event) => {
        event.preventDefault();

        const validationErrors = {};
        Object.keys(propertyInput).forEach(field => {
            const message = validateInput({ ...propertyInput, [field]: propertyInput[field] });
            if (message) validationErrors[field] = message;
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setPredictedPrice(0);
            setActualPrice(0);
            return;
        }

        setErrors({});
        setIsLoading(true);

        try {
            const predictedPriceValue = predictPrice({
                Area: parseFloat(propertyInput.Area),
                Bedrooms: parseInt(propertyInput.Bedrooms, 10),
                Bathrooms: parseInt(propertyInput.Bathrooms, 10),
                Location: propertyInput.Location,
                "Age of Property": parseInt(propertyInput["Age of Property"], 10)
            });

            if (typeof predictedPriceValue === 'number') {
                setPredictedPrice(predictedPriceValue.toFixed(2));
            } else {
                setPredictedPrice(predictedPriceValue?.toString() || "Prediction error");
            }

            const actualPriceValue = findActualPrice(propertyInput);
            setActualPrice(actualPriceValue);

        } catch (error) {
            console.error('Prediction error:', error);
            setPredictedPrice("Prediction error");
        }

        setIsLoading(false);
        
        console.log("Predicted Price:", predictedPrice);
        console.log("Actual Price:", actualPrice);
    };

    const findActualPrice = (input) => {
        const data = require('../data/realestate.json');
        const property = data.find(property => 
            property.Area === input.Area &&
            property.Bedrooms === input.Bedrooms &&
            property.Bathrooms === input.Bathrooms &&
            property.Location === input.Location &&
            property["Age of Property"] === input["Age of Property"]
        ) || { Price: "Price not found" };

        return property ? property.Price : "Price not found";
    };

    return {
        predictedPrice,
        actualPrice,
        propertyInput,
        isLoading,
        errors,
        handleInputChange,
        handleInputBlur,
        handleInputFocus,
        handlePredictClick
    };
};
