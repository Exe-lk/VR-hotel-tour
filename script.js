// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the scene
    initVRScene();
    
    // Initialize UI elements
    initUI();
    
    // Log for debugging
    console.log('DOM Content Loaded, VR Scene initialized');
});

// Initialize the VR Scene
function initVRScene() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    loadingScreen.appendChild(spinner);
    loadingScreen.appendChild(document.createTextNode('Loading VR Experience...'));
    document.body.appendChild(loadingScreen);
    
    // Add event listeners for A-Frame
    const scene = document.querySelector('a-scene');
    
    // When all assets are loaded, remove loading screen
    scene.addEventListener('loaded', function() {
        console.log('A-Frame scene loaded');
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            
            // Ensure guides are visible and properly set up
            setupGuides();
        }, 1000); // Add a slight delay for smoother transition
    });
    
    // Handle navigation between rooms
    setupNavigation();
    
    // Handle info panels
    setupInfoPanels();
    
    // Handle booking actions
    setupBookingActions();
    
    // Setup the persistent home button
    setupHomeButton();
    
    // Setup guide explanation panels
    setupGuideExplanations();
}

// Setup guides to ensure they're visible and interactive
function setupGuides() {
    console.log('Setting up guides');
    
    // Make sure each guide is visible in their respective locations
    const lobbyGuide = document.querySelector('#lobby-guide');
    const roomGuide = document.querySelector('#room-guide');
    const receptionGuide = document.querySelector('#reception-guide');
    
    // Ensure proper visibility based on current room
    const currentRoom = getCurrentRoom();
    console.log('Current room:', currentRoom);
    
    // Update guide visibility
    updateGuideVisibility(currentRoom);
    
    // Ensure all guides are properly clickable
    document.querySelectorAll('.guide').forEach(guide => {
        console.log('Making guide clickable:', guide.id);
        guide.classList.add('clickable');
        
        // Add direct click handler to each guide
        guide.addEventListener('click', function(e) {
            console.log('Guide clicked:', this.id);
            const location = this.getAttribute('data-location');
            if (location) {
                showGuideExplanation(location);
            }
            e.stopPropagation();
        });
    });
}

// Setup navigation between different rooms
function setupNavigation() {
    const navigationHotspots = document.querySelectorAll('.clickable[data-target]');
    
    navigationHotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            // Get target room
            const targetRoom = this.getAttribute('data-target');
            const targetImage = this.getAttribute('data-target-img');
            
            console.log('Navigating to:', targetRoom);
            
            // Change the skybox
            const skybox = document.querySelector('#skybox');
            skybox.setAttribute('src', targetImage);
            
            // Hide all hotspot groups
            document.querySelectorAll('[id$="-hotspots"]').forEach(element => {
                element.setAttribute('visible', 'false');
            });
            
            // Show only the target room's hotspots
            document.querySelector(`#${targetRoom}-hotspots`).setAttribute('visible', 'true');
            
            // Update the home button visibility
            updateHomeButtonVisibility(targetRoom);
            
            // Update guide visibility
            updateGuideVisibility(targetRoom);
        });
    });
}

// Handle the persistent home button visibility
function setupHomeButton() {
    // Get the home button entity
    const homeButton = document.querySelector('#home-button');
    
    // Initially hide the home button in the lobby (not needed there)
    updateHomeButtonVisibility('lobby');
}

// Update home button visibility based on current room
function updateHomeButtonVisibility(currentRoom) {
    const homeButton = document.querySelector('#home-button');
    
    // Only show the home button when NOT in the lobby
    if (currentRoom === 'lobby') {
        homeButton.setAttribute('visible', 'false');
    } else {
        homeButton.setAttribute('visible', 'true');
    }
}

// Update guide visibility based on current room
function updateGuideVisibility(currentRoom) {
    console.log('Updating guide visibility for room:', currentRoom);
    
    // Hide all guides
    document.querySelectorAll('.guide').forEach(guide => {
        guide.setAttribute('visible', 'false');
    });
    
    // Show only the current room's guide
    const currentGuide = document.querySelector(`#${currentRoom}-guide`);
    if (currentGuide) {
        console.log('Making guide visible:', currentGuide.id);
        currentGuide.setAttribute('visible', 'true');
        
        // Ensure the guide has the clickable class
        currentGuide.classList.add('clickable');
        
        // Make sure child elements are visible
        currentGuide.querySelectorAll('*').forEach(child => {
            if (child.hasAttribute('visible')) {
                child.setAttribute('visible', 'true');
            }
        });
    } else {
        console.warn('Guide not found for room:', currentRoom);
    }
}

// Setup guide explanation panels
function setupGuideExplanations() {
    // Setup close buttons for guide explanations
    const closeExplanationButtons = document.querySelectorAll('.clickable[data-action="close-explanation"]');
    
    closeExplanationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hide all explanation panels
            document.querySelectorAll('.explanation-panel').forEach(panel => {
                panel.setAttribute('visible', 'false');
            });
        });
    });
}

// Show guide explanation based on location
function showGuideExplanation(location) {
    console.log('Showing guide explanation for location:', location);
    
    // Hide all info and explanation panels
    document.querySelectorAll('.info-panel, .explanation-panel').forEach(panel => {
        panel.setAttribute('visible', 'false');
    });
    
    // Show the explanation panel for the current location
    const explanationPanel = document.querySelector(`#${location}-explanation`);
    if (explanationPanel) {
        explanationPanel.setAttribute('visible', 'true');
        
        // Animate the guide's talking animation
        const guide = document.querySelector(`#${location}-guide`);
        if (guide) {
            // Find the model inside the guide container
            const model = guide.querySelector('[animation-mixer]');
            if (model) {
                // Reset animation to ensure it plays
                model.setAttribute('animation-mixer', 'clip: *; loop: repeat; timeScale: 1');
                console.log('Animation triggered for guide');
            } else {
                console.warn('No animation mixer found on guide model');
            }
        }
    } else {
        console.warn('Explanation panel not found for location:', location);
    }
}

// Setup info panels
function setupInfoPanels() {
    // Info hotspots show information panels
    const infoHotspots = document.querySelectorAll('.clickable[data-info]');
    
    infoHotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            const panelId = this.getAttribute('data-info');
            // Hide all info panels and explanation panels
            document.querySelectorAll('.info-panel, .explanation-panel').forEach(panel => {
                panel.setAttribute('visible', 'false');
            });
            
            // Show target panel
            document.querySelector(`#${panelId}`).setAttribute('visible', 'true');
        });
    });
    
    // Close buttons for panels
    const closeButtons = document.querySelectorAll('.clickable[data-action="close-panel"]');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find parent panel and hide it
            const panel = this.closest('.info-panel');
            panel.setAttribute('visible', 'false');
        });
    });
}

// Setup booking actions
function setupBookingActions() {
    // Book now buttons
    const bookButtons = document.querySelectorAll('.clickable[data-action="book-room"]');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hide info panel
            this.closest('.info-panel').setAttribute('visible', 'false');
            
            // In VR, show confirmation directly
            const bookingConfirmation = document.querySelector('#booking-confirmation');
            const bookingText = document.querySelector('#booking-text');
            bookingText.setAttribute('value', 'Luxury Suite Booked!');
            bookingConfirmation.setAttribute('visible', 'true');
            
            // For desktop users, we could open a booking form instead
            if (window.innerWidth > 768) {
                openBookingForm('room');
            }
        });
    });
    
    // Close booking confirmation
    const closeBookingButton = document.querySelector('.clickable[data-action="close-booking"]');
    
    if (closeBookingButton) {
        closeBookingButton.addEventListener('click', function() {
            document.querySelector('#booking-confirmation').setAttribute('visible', 'false');
        });
    }
}

// Navigate to a specific room
function navigateToRoom(roomId) {
    console.log('Programmatically navigating to room:', roomId);
    
    // Get the skybox element
    const skybox = document.querySelector('#skybox');
    
    // Set the skybox image
    skybox.setAttribute('src', `#${roomId}`);
    
    // Hide all hotspot groups
    document.querySelectorAll('[id$="-hotspots"]').forEach(element => {
        element.setAttribute('visible', 'false');
    });
    
    // Show only the target room's hotspots
    document.querySelector(`#${roomId}-hotspots`).setAttribute('visible', 'true');
    
    // Update home button visibility
    updateHomeButtonVisibility(roomId);
    
    // Update guide visibility
    updateGuideVisibility(roomId);
}

// Get current room from skybox source
function getCurrentRoom() {
    const skybox = document.querySelector('#skybox');
    const src = skybox.getAttribute('src');
    return src.replace('#', '');
}

// Initialize UI elements for desktop users
function initUI() {
    // Set up desktop UI buttons
    const bookingButton = document.querySelector('#booking-button');
    const infoButton = document.querySelector('#info-button');
    const lobbyButton = document.querySelector('#lobby-button');
    const guideButton = document.querySelector('#guide-button');
    
    if (bookingButton) {
        bookingButton.addEventListener('click', function() {
            openBookingForm('room'); // Only one room type now
        });
    }
    
    if (infoButton) {
        infoButton.addEventListener('click', function() {
            // Show hotel info panel
            document.querySelectorAll('.info-panel').forEach(panel => {
                panel.setAttribute('visible', 'false');
            });
            document.querySelector('#lobby-info').setAttribute('visible', 'true');
        });
    }
    
    if (lobbyButton) {
        lobbyButton.addEventListener('click', function() {
            // Navigate to lobby
            navigateToRoom('lobby');
        });
    }
    
    if (guideButton) {
        guideButton.addEventListener('click', function() {
            // Show the guide explanation for the current room
            const currentRoom = getCurrentRoom();
            showGuideExplanation(currentRoom);
        });
    }
    
    // Create booking form element if it doesn't exist
    if (!document.querySelector('#booking-form')) {
        createBookingForm();
    }
}

// Create booking form for desktop users
function createBookingForm() {
    const bookingForm = document.createElement('div');
    bookingForm.id = 'booking-form';
    
    bookingForm.innerHTML = `
        <h2>Book Your Stay</h2>
        <form id="hotel-booking">
            <label for="room-type">Room Type:</label>
            <select id="room-type" name="room-type">
                <option value="room">Luxury Suite - $250/night</option>
            </select>
            
            <label for="check-in">Check-in Date:</label>
            <input type="date" id="check-in" name="check-in" required>
            
            <label for="check-out">Check-out Date:</label>
            <input type="date" id="check-out" name="check-out" required>
            
            <label for="guests">Number of Guests:</label>
            <select id="guests" name="guests">
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
            </select>
            
            <div style="margin-top: 15px;">
                <button type="submit">Book Now</button>
                <button type="button" class="cancel" onclick="closeBookingForm()">Cancel</button>
            </div>
        </form>
    `;
    
    document.body.appendChild(bookingForm);
    
    // Add form submission handler
    bookingForm.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        submitBooking();
    });
}

// Open booking form with selected room type
function openBookingForm(roomType) {
    const form = document.querySelector('#booking-form');
    form.style.display = 'block';
    
    // Set room type in the dropdown (only one option now)
    const roomTypeSelect = document.querySelector('#room-type');
    roomTypeSelect.value = roomType;
    
    // Set default dates (today and tomorrow)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.querySelector('#check-in').value = formatDate(today);
    document.querySelector('#check-out').value = formatDate(tomorrow);
}

// Close booking form
function closeBookingForm() {
    document.querySelector('#booking-form').style.display = 'none';
}

// Handle booking form submission
function submitBooking() {
    const roomType = document.querySelector('#room-type').value;
    const checkIn = document.querySelector('#check-in').value;
    const checkOut = document.querySelector('#check-out').value;
    const guests = document.querySelector('#guests').value;
    
    // Here you would normally send this data to a server
    console.log('Booking submitted:', {
        roomType,
        checkIn,
        checkOut,
        guests
    });
    
    // Close the form
    closeBookingForm();
    
    // Show VR confirmation
    const bookingConfirmation = document.querySelector('#booking-confirmation');
    const bookingText = document.querySelector('#booking-text');
    bookingText.setAttribute('value', 'Luxury Suite Booked!');
    bookingConfirmation.setAttribute('visible', 'true');
    
    // Alert for desktop users
    alert('Booking confirmed! Check your email for details.');
}

// Helper function to format date as YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Make functions available globally
window.closeBookingForm = closeBookingForm;
window.showGuideExplanation = showGuideExplanation; 