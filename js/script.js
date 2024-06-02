document.querySelectorAll('.product-item').forEach(function(item) {
    const productId = item.getAttribute('data-product-id');
    const containerId = `paypal-button-container-${productId}`;

    paypal.Buttons({
        createOrder: function(data, actions) {
            let price;
            switch (productId) {
                case 'product1':
                    price = 9.99;
                    break;
                case 'product2':
                    price = 14.99;
                    break;
                case 'product3':
                    price = 49.99;
                    break;
                default:
                    price = 0; // Default to free if productId is not recognized
                    break;
            }
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: price
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name + '! Thank you for your purchase!');
                window.location.href = 'success.html';
            });
        },
        onError: function(err) {
            console.error('Error:', err);
            alert('An error occurred during payment. Please try again.');
        }
    }).render(`#${containerId}`);
});

