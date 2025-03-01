import React, { useState } from 'react';

const PropertyInputForm = ({ 
    propertyInput, 
    handleInputChange, 
    errors, 
    handleInputBlur, 
    handleInputFocus, 
    predictedPrice, 
    actualPrice, // Accept actual price as a prop
    handleShowChartClick, 
    handlePredictClick, 
    isLoading 
}) => {
    const [localInput, setLocalInput] = useState(propertyInput); // Local state for form inputs

    const formFields = [
        { label: "Area (sq ft)", name: "Area", type: "number" },
        { label: "Bedrooms", name: "Bedrooms", type: "number" },
        { label: "Bathrooms", name: "Bathrooms", type: "number" },
        { label: "Age of Property (years)", name: "Age of Property", type: "number" }
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLocalInput(prevInput => ({ ...prevInput, [name]: value })); // Update local state
        handleInputChange(event); // Call the parent handler
    };

    const handleReset = () => {
        setLocalInput({
            Area: "",
            Bedrooms: "",
            Bathrooms: "",
            Location: "Downtown",
            "Age of Property": ""
        });
    };

    return (
        <form>
            {formFields.map(({ label, name, type }) => (
                <div key={name}>
                    <label>{label}:</label>
                    <input
                        type={type}
                        name={name}
                        value={localInput[name] || ''} // Use local state
                        onChange={handleChange} // Use local change handler
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                    />
                    {errors[name] && <span className="error">{errors[name]?.toString()}</span>}
                </div>
            ))}
            
            <div>
                <label>Location:</label>
                <select
                    name="Location"
                    value={localInput.Location || ''} // Use local state
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                >
                    <option value="Downtown">Downtown</option>
                    <option value="Suburban">Suburban</option>
                    <option value="Rural">Rural</option>
                </select>
            </div>
            <div>
                <h3>Predicted Price: ${predictedPrice}</h3>
                <h3>Actual Price: ${actualPrice ? actualPrice : "$"}</h3> {/* Display actual price or just $ */}
            </div>

            {/*<button type="button" onClick={handleShowChartClick} disabled={predictedPrice === null}>
                Show Price Chart
            </button>*/}
<div className="button-container">
    <button type="button" onClick={handlePredictClick} disabled={isLoading}>

                {isLoading ? <div className="loader"></div> : 'Predict Price'}
    </button>
    <button type="button" onClick={handleReset}>Reset</button>
</div>

        </form>
    );
};

export default PropertyInputForm;
