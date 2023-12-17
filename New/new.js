const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.sold)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const availableCount = document.getElementById('available-count');
const selectedCount = document.getElementById('selected-count');
const soldCount = document.getElementById('sold-count');
const screen = document.getElementById('screen'); // Get the .screen element
const submitButton = document.querySelector('.submit-button'); // Add submit button reference

populateUI();
let ticketPrice = +movieSelect.value; // Use .value to get the selected option's value

function setMovieData(movieIndex, moviePrice, movieImage) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
    localStorage.setItem('selectedMovieImage', movieImage); // Store the selected movie image URL
    // Update the screen background image
    screen.style.backgroundImage = `url('${movieImage}')`;
}

function updateCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const availableSeats = document.querySelectorAll('.row .seat:not(.sold)');
    const soldSeats = document.querySelectorAll('.row .seat.sold');

    const selectedSeatCount = selectedSeats.length;
    const availableSeatCount = availableSeats.length;
    const soldSeatCount = soldSeats.length;

    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;

    availableCount.innerText = availableSeatCount;
    selectedCount.innerText = selectedSeatCount;
    soldCount.innerText = soldSeatCount;

    setMovieData(movieSelect.selectedIndex, movieSelect.value, movieSelect.options[movieSelect.selectedIndex].getAttribute('data-image'));
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    // Set the initial screen background image based on the selected movie
    screen.style.backgroundImage = `url('${localStorage.getItem('selectedMovieImage')}')`;
}

function submitForm() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatCount = selectedSeats.length;

    // Add the selected seat count to localStorage (if needed)
    localStorage.setItem('selectedSeatsCount', selectedSeatCount);

    // Redirect to Page 1
    window.location.href = '../index.html'; // Adjust the path to go back to Page 1
}

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value, e.target.options[e.target.selectedIndex].getAttribute('data-image'));
    updateCount();
});

container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('sold')) {
        e.target.classList.toggle('selected');

        updateCount();
    }
});

// Initial screen background image setup
screen.style.backgroundImage = `url('${localStorage.getItem('selectedMovieImage')}')`;
submitButton.addEventListener('click', submitForm);
