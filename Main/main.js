document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const submitButton = document.querySelector('.primary-button');
    const bookingSuccessMessage = document.getElementById('booking-success-message');

    // Function to retrieve and set selected movie and seat count
    function setValuesFromLocalStorage() {
        const selectedMovie = localStorage.getItem('selectedMovie');
        const selectedSeatCount = localStorage.getItem('selectedSeatCount');

        // Set the selected movie and seat count
        if (selectedMovie) {
            const movieSelect = document.getElementById('event');
            movieSelect.value = selectedMovie;
        }

        if (selectedSeatCount) {
            const ticketsInput = document.getElementById('tickets');
            ticketsInput.value = selectedSeatCount;
        }
    }

    // Call the function when the page loads
    setValuesFromLocalStorage();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const eventSelection = document.querySelector('#event').value;
        const tickets = document.querySelector('#tickets').value;

        if (name === '' || email === '' || eventSelection === 'movie' || tickets === '') {
            alert('Please fill out all the required fields.');
        } else if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
        } else if (!validateTickets(tickets)) {
            alert('Please enter a valid number of tickets.');
        } else {
            modal.style.display = 'block';
            displayEnteredDetails(name, email, eventSelection, tickets);
            setTimeout(function () {
                modal.style.display = 'none';
                form.reset(); // Reset the form
            }, 3000); // Display message for 3 seconds
        }
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none'; // Close the booking modal
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function validateTickets(tickets) {
        return !isNaN(tickets) && parseInt(tickets) > 0;
    }

    function displayEnteredDetails(name, email, eventSelection, tickets) {
        const enteredDetailsContainer = document.getElementById('entered-details-container');
        const enteredDetailsDiv = document.createElement('div');
        enteredDetailsDiv.classList.add('entered-details-item');

        enteredDetailsDiv.innerHTML = `
            <h3>Entered Details:</h3>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Event: ${eventSelection}</p>
            <p>Tickets: ${tickets}</p>
        `;

        enteredDetailsContainer.appendChild(enteredDetailsDiv);

        // Store the selected event and number of tickets in local storage
        localStorage.setItem('selectedEvent', eventSelection);
        localStorage.setItem('selectedTickets', tickets);
    }

    // Add an event listener for the "Show Demo Bill" button
    const showDemoBillButton = document.getElementById('show-demo-bill-button');
    showDemoBillButton.addEventListener('click', function () {
        generateDemoBill();
    });

    function generateDemoBill() {
        // Retrieve data from the form fields
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const eventSelection = document.querySelector('#event').value;
        const tickets = document.querySelector('#tickets').value;
    
        // Check if any of the required fields are empty
        if (name === '' || email === '' || eventSelection === 'movie' || tickets === '') {
            alert('Please fill out all the required fields before generating the bill.');
        } else {
            const demoBillContainer = document.getElementById('demo-bill-content');
    
            // Generate demo bill content based on the form data
            const demoBillHTML = `
                <h2>Demo Bill</h2>
                <p>Event: ${eventSelection}</p>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Tickets: ${tickets}</p>
                <p>Total Amount: $${parseInt(tickets) * 10}</p>
            `;
    
            // Set the demo bill content
            demoBillContainer.innerHTML = demoBillHTML;
    
            // Show the demo bill modal
            const demoBillModal = document.getElementById('demo-bill-modal');
            demoBillModal.style.display = 'block';
    
            // Add an event listener to the close button in the demo bill modal
            const demoBillCloseButton = document.querySelector('.demo-bill-close-button');
            demoBillCloseButton.addEventListener('click', function () {
                demoBillModal.style.display = 'none'; // Close the demo bill modal
            });
        }
    }
});
