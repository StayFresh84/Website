// Declare the searchInput and listingsData variables
let searchInput;
let listingsData;

// Function to fetch the JSON data
function fetchListingsData() {
  return fetch('listings_data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error loading listings data');
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

// Function to handle the search input
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  // Filter the listings based on the search term
  const filteredListings = listingsData.filter(listing => {
    const title = listing.title.toLowerCase();
    const address = listing.address.toLowerCase();

    return title.includes(searchTerm) || address.includes(searchTerm);
  });

  // Pass the filtered listings to a function that updates the UI
  populateSearchResults(filteredListings);
}

// Function to populate the search results
// Function to populate the search results
function populateSearchResults(listings) {
  const searchResultsContainer = document.getElementById('search-results');

  // Clear the current search results
  searchResultsContainer.innerHTML = '';

  // Iterate over the filtered listings and create HTML elements to display them
  listings.forEach(listing => {
    const listingElement = document.createElement('div');
    listingElement.classList.add('search-result');

    // Create HTML elements to display the listing information
    const titleElement = document.createElement('h3');
    titleElement.textContent = listing.title;

    const addressElement = document.createElement('p');
    addressElement.textContent = `${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`;

    const phoneElement = document.createElement('p');
    phoneElement.textContent = `Phone: ${listing.phone}`;

    const agentElement = document.createElement('div');
    agentElement.classList.add('agent-info');
    const agentNameElement = document.createElement('p');
    agentNameElement.textContent = `Agent: ${listing.agent.name}`;
    const agentEmailElement = document.createElement('p');
    agentEmailElement.textContent = `Email: ${listing.agent.email}`;

    // Append the HTML elements to the listing element
    agentElement.appendChild(agentNameElement);
    agentElement.appendChild(agentEmailElement);

    listingElement.appendChild(titleElement);
    listingElement.appendChild(addressElement);
    listingElement.appendChild(phoneElement);
    listingElement.appendChild(agentElement);

    // Append the listing element to the search results container
    searchResultsContainer.appendChild(listingElement);
  });
}


// Load the JSON data and initialize the app
fetchListingsData()
  .then(data => {
    listingsData = data;

    // Get the search input element and listen for the input event
    searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', handleSearch);
  })
  .catch(error => {
    console.error('Error loading listings data:', error);
  });
