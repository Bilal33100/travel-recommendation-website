// Travel recommendations data
const travelData = {
    destinations: [
        {
            id: 1,
            name: "Maldives",
            type: "beach",
            description: "The Maldives is a tropical paradise in the Indian Ocean known for its crystal-clear turquoise waters, vibrant coral reefs, and luxurious overwater bungalows. Perfect for honeymooners and those seeking ultimate relaxation.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            rating: 4.9,
            bestTime: "November to April"
        },
        {
            id: 2,
            name: "Bali",
            type: "beach",
            description: "Bali offers a perfect blend of beautiful beaches, ancient temples, lush rice terraces, and vibrant culture. From surfing in Kuta to spiritual retreats in Ubud, Bali has something for every traveler.",
            image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            rating: 4.8,
            bestTime: "April to October"
        },
        {
            id: 3,
            name: "Angkor Wat",
            type: "temple",
            description: "Angkor Wat is the largest religious monument in the world, originally constructed as a Hindu temple dedicated to Vishnu. It's a UNESCO World Heritage site and the symbol of Cambodia.",
            image: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            rating: 4.9,
            bestTime: "November to February"
        },
        {
            id: 4,
            name: "Golden Temple",
            type: "temple",
            description: "The Golden Temple in Amritsar is the holiest shrine in Sikhism. Its stunning gold-plated structure is reflected in the sacred pool, creating a mesmerizing sight especially during sunrise and sunset.",
            image: "https://images.unsplash.com/photo-1585506936724-fa0c19d430b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            rating: 4.7,
            bestTime: "October to March"
        },
        {
            id: 5,
            name: "Japan",
            type: "country",
            description: "Japan seamlessly blends ancient traditions with cutting-edge technology. From the cherry blossoms of Kyoto to the neon lights of Tokyo, Japan offers unique experiences at every turn.",
            image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            rating: 4.9,
            bestTime: "March to May, September to November"
        },
        {
            id: 6,
            name: "Italy",
            type: "country",
            description: "Italy is a feast for the senses with its world-class art, architecture, cuisine, and landscapes. Explore ancient Rome, romantic Venice, artistic Florence, and the stunning Amalfi Coast.",
            image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            rating: 4.8,
            bestTime: "April to June, September to October"
        },
        {
            id: 7,
            name: "Thailand",
            type: "country",
            description: "Known as the Land of Smiles, Thailand offers bustling cities, tranquil beaches, ancient temples, and delicious street food. A perfect destination for both adventure and relaxation.",
            image: "https://images.unsplash.com/photo-1552465011-b4e30bf7349d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            rating: 4.7,
            bestTime: "November to April"
        },
        {
            id: 8,
            name: "Greece",
            type: "beach",
            description: "Greece boasts stunning islands with white-washed buildings, crystal-clear waters, and ancient historical sites. Santorini and Mykonos are among the most famous destinations.",
            image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            rating: 4.8,
            bestTime: "May to October"
        }
    ]
};

// DOM Elements
let searchInput, searchBtn, clearBtn, resultsContainer, searchResults;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    searchInput = document.getElementById('searchInput');
    searchBtn = document.getElementById('searchBtn');
    clearBtn = document.getElementById('clearBtn');
    resultsContainer = document.getElementById('resultsContainer');
    searchResults = document.querySelector('.search-results');
    
    // Event Listeners
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Explore button
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            window.scrollTo({
                top: document.querySelector('.recommendations').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }
    
    // Set active nav link based on current page
    setActiveNavLink();
});

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Perform search function
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }
    
    // Filter destinations based on search term
    const results = travelData.destinations.filter(destination => {
        return destination.name.toLowerCase().includes(searchTerm) ||
               destination.type.toLowerCase().includes(searchTerm) ||
               destination.description.toLowerCase().includes(searchTerm);
    });
    
    displaySearchResults(results);
}

// Display search results
function displaySearchResults(results) {
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No destinations found. Try a different search term.</p>';
    } else {
        results.forEach(destination => {
            const resultCard = document.createElement('div');
            resultCard.className = 'destination-card';
            resultCard.innerHTML = `
                <img src="${destination.image}" alt="${destination.name}">
                <div class="card-content">
                    <h4>${destination.name}</h4>
                    <p>${destination.description.substring(0, 150)}...</p>
                    <p><strong>Type:</strong> ${destination.type.charAt(0).toUpperCase() + destination.type.slice(1)}</p>
                    <p><strong>Rating:</strong> ${destination.rating}/5</p>
                    <p><strong>Best Time to Visit:</strong> ${destination.bestTime}</p>
                    <button class="book-btn" onclick="showDetails('${destination.name.toLowerCase().replace(' ', '-')}')">View Details</button>
                </div>
            `;
            resultsContainer.appendChild(resultCard);
        });
    }
    
    // Show search results section
    if (searchResults) {
        searchResults.style.display = 'block';
        searchResults.scrollIntoView({ behavior: 'smooth' });
    }
}

// Clear search results
function clearSearch() {
    if (searchInput) {
        searchInput.value = '';
    }
    
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
    }
    
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// Show destination details
function showDetails(destinationId) {
    // In a real application, this would navigate to a details page
    // For this demo, we'll show an alert with more information
    const destination = travelData.destinations.find(dest => 
        dest.name.toLowerCase().replace(' ', '-') === destinationId
    );
    
    if (destination) {
        alert(`More about ${destination.name}:\n\n${destination.description}\n\nBest time to visit: ${destination.bestTime}\nRating: ${destination.rating}/5`);
    } else {
        alert('Destination details coming soon!');
    }
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you at ${email} within 24 hours.`);
    
    // Reset form
    e.target.reset();
}

// Add some interactivity to destination cards
function enhanceCards() {
    const cards = document.querySelectorAll('.destination-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Call enhanceCards when DOM is loaded
document.addEventListener('DOMContentLoaded', enhanceCards);
