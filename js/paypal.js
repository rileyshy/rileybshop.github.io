// PayPal SDK script loaded in the HTML head

// Render the PayPal button
paypal.Buttons({
    createOrder: function(data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '100.00' // Replace with dynamic calculation of total amount
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {
            // This function shows a transaction success message to your buyer.
            alert('Transaction completed by ' + details.payer.name.given_name);
            // Redirect or show a success message to the buyer
            localStorage.removeItem('cart'); // Example: Clear cart items after successful checkout
            window.location.href = 'index.html'; // Redirect to homepage after successful checkout
        });
    },
    onError: function(err) {
        // This function handles an error occurrence during the transaction.
        console.error(err);
        alert('An error occurred during the transaction');
    }
}).render('#paypal-button-container');
