import React, { useState } from 'react';

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState('');

    const handleChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle feedback submission logic here
        console.log('Feedback submitted:', feedback);
        setFeedback(''); // Clear the input after submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Feedback</h3>
            <textarea
                value={feedback}
                onChange={handleChange}
                placeholder="Enter your feedback here..."
                rows="4"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #333' }}
            />
            <button type="submit" style={{ marginTop: '10px' }}>Submit Feedback</button>
        </form>
    );
};

export default FeedbackForm;
