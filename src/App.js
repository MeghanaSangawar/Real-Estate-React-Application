import React from 'react';
import { useAppHooks } from './hooks/useAppHooks';
import FeedbackForm from './components/FeedbackForm'; // Import FeedbackForm

import './App.css';
import { trainNetwork, predictPrice } from './neuralNetwork';
import PropertyInputForm from './components/PropertyInputForm';
import PredictedPriceChart from './components/PredictedPriceChart'; // Import the new chart component
import validateInput from './exceptions/Validation';

const App = () => {
    const {
        predictedPrice,
        actualPrice,
        propertyInput,
        isLoading,
        errors,
        handleInputChange,
        handleInputBlur,
        handleInputFocus,
        handlePredictClick
    } = useAppHooks();

    return (
        <div className="App">
            <div className="container">
                <div className="form-container">
                    <PropertyInputForm 
                        propertyInput={propertyInput} 
                        handleInputChange={handleInputChange} 
                        errors={errors} 
                        handleInputBlur={handleInputBlur} 
                        handleInputFocus={handleInputFocus} 
                        predictedPrice={predictedPrice} 
                        actualPrice={actualPrice} 
                        handlePredictClick={handlePredictClick} 
                        isLoading={isLoading} 
                    />
                </div>
                <div className="chart-container"> 
                    {predictedPrice !== null && actualPrice !== null && (
                        <PredictedPriceChart predictedPrice={predictedPrice} actualPrice={actualPrice} />
                    )}
                </div>
                <div className="feedback-container">
                    <FeedbackForm /> {/* Move FeedbackForm component here */}
                </div>
            </div>
        </div>
    );
};

export default App;
