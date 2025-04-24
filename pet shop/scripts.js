// Slide show images 
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Dark Mode
const toggleButton = document.getElementById("dark-mode-toggle");
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

//pet filters
document.getElementById('pet-filter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const speciesFilter = document.getElementById('species').value;
    const ageFilter = document.getElementById('age').value;

    document.querySelectorAll('.pet-item').forEach(item => {
        const species = item.querySelector('p:nth-child(3)').textContent.split(': ')[1].toLowerCase();
        const age = item.querySelector('p:nth-child(4)').textContent.split(': ')[1].toLowerCase();

        if ((speciesFilter === 'all' || species === speciesFilter) &&
            (ageFilter === 'all' || age === ageFilter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

//Mark as Favourite
    function markAsFavourite(petName) {
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (!favourites.includes(petName)) {
            favourites.push(petName);
            localStorage.setItem('favourites', JSON.stringify(favourites));
            alert(petName + " has been added to your favourites!");
        } else {
            alert(petName + " is already in your favourites!");
        }
}
//Buy Now
function buyNow(petName) {
    alert("You have chosen to buy " + petName + "!");
}

//Inquiry
function sendInquiry() {
    alert("Your inquiry has been sent!");
}

//Submit
function submitContact() {
    alert("Your message has been submitted!");
}

//Book Apointment
function getSelectedService() {
    const select = document.getElementById('service');
    return select.options[select.selectedIndex].value;
}
function bookAppointment() {
    const serviceName = getSelectedService();
    alert("You have booked an appointment for " + serviceName + "!");
}
function getService(h3) {
    alert("You have chosen to get " + h3 + " service");
}

//Buy Product
function buyProduct(p) {
    alert("You have chosen to buy " + p + "!");
}
//Add Cart
function addCart(p) {
    alert("You have chosen to add to cart " + p + "!");
}

// Pagination
let currentPage = 1;
const itemsPerPage = 1; // Adjust the number of items per page as needed
const petItems = document.querySelectorAll('.pet-item');
const totalPages = Math.ceil(petItems.length / itemsPerPage);

function showPage(page) {
    currentPage = page;

    // Hide all items
    petItems.forEach((item, index) => {
        item.style.display = 'none';
    });

    // Show items for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    for (let i = startIndex; i < endIndex && i < petItems.length; i++) {
        petItems[i].style.display = 'block';
    }

    // Disable prev button if on the first page
    document.getElementById('prev-page').disabled = currentPage === 1;

    // Disable next button if on the last page
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

// Event listeners for buttons
document.getElementById('prev-page').addEventListener('click', function() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
});

document.getElementById('next-page').addEventListener('click', function() {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
});

// Initial call to show the first page
showPage(1);

document.getElementById('menu-bar').addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('active');
});


