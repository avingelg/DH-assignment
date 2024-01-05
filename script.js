// Initialize Leaflet map
var map = L.map('map').setView([0, 0], 2);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON data and add markers to the map with popups
fetch('output_file.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                var marker = L.marker(latlng);
                
                // Bind popup with desired information
                var properties = feature.properties; // Access properties of the feature
                var popupContent = ''; // Customize popup content here
                
                // Example: Display 'Name' property in the popup
                if (properties && properties.Book_ID) {
                    popupContent += '<b>Book_ID:</b> ' + properties.Book_ID + '<br>';
                }
                
                // Add more properties as needed in a similar way
                if (properties && properties.Title) {
                    popupContent += '<b>Title:</b> ' + properties.Title + '<br>';
                }

                if (properties && properties["Extended Title"]) {
                    popupContent += '<b>Extended Title:</b> ' + properties["Extended Title"] + '<br>';
                }

                if (properties && properties["Place of Publication"]) {
                    popupContent += '<b>Place of Publication:</b> ' + properties["Place of Publication"] + '<br>';
                }

                if (properties && properties["Name of Publisher"]) {
                    popupContent += '<b>Name of Publisher:</b> ' + properties["Name of Publisher"] + '<br>';
                }

                if (properties && properties["Publication Frequency"]) {
                    popupContent += '<b>Publication Frequency:</b> ' + properties["Publication Frequency"] + '<br>';
                }
                
                marker.bindPopup(popupContent); // Bind popup to the marker
                return marker;
            }
        }).addTo(map);
    });

