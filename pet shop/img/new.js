

//make respensive.when click the bar icon,menu shows***********************.
let menu=document.querySelector('#menu-bar');
let navbar=document.querySelector('.navbar');
menu.addEventListener('click',()=>{
   menu.classList.toggle('fa-times');
   navbar.classList.toggle('active');
});
window.onscroll=()=>{
    menu.classList.remove('fa-times');
   navbar.classList.remove('active');
}

//************************** */
document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('favorited');
        const petId = this.getAttribute('data-pet-id');
        
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        if (favorites.includes(petId)) {
            favorites = favorites.filter(id => id !== petId);
            this.textContent = 'Mark as Favorite';
        } else {
            favorites.push(petId);
            this.textContent = 'Favorited';
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
});
//************************************ */
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;

    // Simple form validation
    if (name === "" || email === "" || phone === "" || subject === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Simulate form submission
    alert("Thank you, " + name + ". Your message has been sent!");
    document.getElementById('contact-form').reset(); // Reset form fields
});

// Function to handle Add to Cart **********************
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const productName = button.getAttribute('data-product-name');
        const productPrice = button.getAttribute('data-product-price');
        
        // Get existing cart from local storage or initialize empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex !== -1) {
            // If product exists, increment quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // Add new product to cart
            cart.push({
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                quantity: 1
            });
        }
        
        // Save updated cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        alert(`Product ${productName} added to cart!`);
    });
});

// Function to handle Buy Now***********************
document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const productName = button.getAttribute('data-product-name');
        const productPrice = button.getAttribute('data-product-price');
        
        // Simulate purchase (in reality, you would redirect to a checkout page or process payment)
        alert(`Product ${productName} purchased for $${productPrice}!`);
        
        // Optionally, you can also add the product to the cart before redirecting
        // Here we'll just show a message
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Redirect to a checkout page (you need to create this page)
        // window.location.href = 'checkout.html';
    });
});

// Function to handle Inquiry button click***********************
document.querySelectorAll('.inquiry-btn').forEach(button => {
    button.addEventListener('click', () => {
        const petId = button.getAttribute('data-pet-id');
        alert(`Inquiry sent for pet with ID: ${petId}`);
        // Add functionality to open an inquiry form or send data to server
    });
});

// Function to handle Favorite button click*******************
document.querySelectorAll('.favorite-btn3').forEach(button => {
    button.addEventListener('click', () => {
        const petId = button.getAttribute('data-pet-id');
        alert(`Pet with ID: ${petId} added to favorites!`);
        // Add functionality to mark the pet as a favorite (e.g., update UI, save to user profile)
    });
});
//************************** */
document.addEventListener('keydown', function(event) {
    const foodCarousel = document.getElementById('food-carousel');
    const accessoryCarousel = document.getElementById('accessory-carousel');

    if (event.key === 'ArrowRight') {
        foodCarousel.scrollBy({ left: 300, behavior: 'smooth' });
        accessoryCarousel.scrollBy({ left: 300, behavior: 'smooth' });
    } else if (event.key === 'ArrowLeft') {
        foodCarousel.scrollBy({ left: -300, behavior: 'smooth' });
        accessoryCarousel.scrollBy({ left: -300, behavior: 'smooth' });
    }
});
// Form Submission for Appointment Booking******************
const appointmentForm = document.getElementById('appointmentForm');
const appointmentMessage = document.getElementById('appointment-message');

appointmentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (service && date && time) {
        appointmentMessage.textContent = `Your appointment for ${service} on ${date} at ${time} has been booked.`;
        appointmentMessage.style.color = 'green';
    } else {
        appointmentMessage.textContent = 'Please fill out all fields.';
        appointmentMessage.style.color = 'red';
    }

    // Reset form after submission
    appointmentForm.reset();
});
// Sample data representing pets (this would normally come from a database)
const pets = [
    { id: 1, name: 'Max', species: 'Dog', age: 'Adult', img: 'slide3.jpg' },
    // Add more pets as needed
];

const petsPerPage = 6; // Number of pets to display per page
let currentPage = 1;

function displayPets(page) {
    const petGrid = document.querySelector('.pet-grid');
    petGrid.innerHTML = ''; // Clear the grid

    const startIndex = (page - 1) * petsPerPage;
    const endIndex = startIndex + petsPerPage;
    const petsToDisplay = pets.slice(startIndex, endIndex);

    petsToDisplay.forEach(pet => {
        const petItem = document.createElement('div');
        petItem.className = 'pet-item';
        petItem.innerHTML = `
            <img src="${pet.img}" alt="${pet.name}">
            <p>Name: ${pet.name}</p>
            <p>Species: ${pet.species}</p>
            <p>Age: ${pet.age}</p>
            <button class="favorite-btn" data-pet-id="${pet.id}">Mark as Favorite</button>
        `;
        petGrid.appendChild(petItem);
    });
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(pets.length / petsPerPage);
    document.getElementById('#prev-page').disabled = currentPage === 1;
    document.getElementById('#  next-page').disabled = currentPage === totalPages;
}

document.getElementById('#prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPets(currentPage);
        updatePaginationButtons();
    }
});

document.getElementById('#next-page').addEventListener('click', () => {
    const totalPages = Math.ceil(pets.length / petsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPets(currentPage);
        updatePaginationButtons();
    }
});

// Initial load
displayPets(currentPage);
updatePaginationButtons();
const inquireButtons = document.querySelectorAll('.inquirey-btn');

inquireButtons.forEach(button => {
    button.addEventListener('click', () => {
        const petName = button.closest('.details').querySelector('.name').textContent;
        alert(`You are inquiring about ${petName}.`);
    });
});
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
const favoritePetsList = document.querySelector('.favorite-pets-list');

favorites.forEach(id => {
    // You would typically fetch this data from a server or have it available in the client
    // For simplicity, we're creating dummy data
    const petItem = document.createElement('div');
    petItem.classList.add('pet-item');
    petItem.innerHTML = `
        <img src="pet${id}.jpg" alt="Pet ${id}">
        <p>Name: Pet ${id}</p>
        <p>Species: Dog</p>
        <p>Age: Adult</p>
      
    `;
    favoritePetsList.appendChild(petItem);
});