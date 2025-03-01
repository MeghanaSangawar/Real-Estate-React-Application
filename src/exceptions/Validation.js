const validateInput = (input) => {
    const errors = {};

    // Check for missing values
    if (!input.Area) {
        errors.Area = "Area is required.";
    } else if (isNaN(input.Area) || input.Area <= 0) {
        errors.Area = "Area must be a positive number.";
    }

    if (!input.Bedrooms) {
        errors.Bedrooms = "Bedrooms are required.";
    } else if (isNaN(input.Bedrooms) || input.Bedrooms <= 0) {
        errors.Bedrooms = "Bedrooms must be a positive number.";
    }

    if (!input.Bathrooms) {
        errors.Bathrooms = "Bathrooms are required.";
    } else if (isNaN(input.Bathrooms) || input.Bathrooms <= 0) {
        errors.Bathrooms = "Bathrooms must be a positive number.";
    }

    if (!input.Location) {
        errors.Location = "Location is required.";
    }

    if (!input["Age of Property"]) {
        errors["Age of Property"] = "Age of Property is required.";
    } else if (isNaN(input["Age of Property"]) || input["Age of Property"] < 0) {
        errors["Age of Property"] = "Age of Property must be a valid number.";
    }

    // Return errors if any exist
    return Object.keys(errors).length ? errors : null;
};

export default validateInput;
