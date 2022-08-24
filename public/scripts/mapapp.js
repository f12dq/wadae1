const map = L.map("mapView");
var layerGroup = L.layerGroup();

const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{ attribution: attrib } ).addTo(map);

// latitude(North(+)/South(-)), longitude(East(+)/West(-)).
map.setView([54.146, -2.0462], 8);

function setNewMarker(mapObject, lat, lon, popup) {
    console.log("Marker set");

    const marker = L.circle([lat, lon], { 
        radius:10000, 
        fillColor: 'red', 
        color: 'blue', 
        opacity: 0.5 });
	
    
    marker.bindPopup(`${popup}`);
	
	layerGroup.addLayer(marker);
	mapObject.addLayer(layerGroup);


}

function clearAllMarkers(mapObject){
	console.log("Clearing Old Markers");
	
	if(mapObject.hasLayer(layerGroup)){
		layerGroup.clearLayers();
	}
}


function accSearchMap(mapObject, location, type = null) {

    const accomodationsHTML = document.querySelector('#accommodations');
    const messageLocation = document.querySelector('#messageBox');

    if(type){
        // Runs if type is given (searching by location and type)
        try {
            const response = fetch(`/acc/search/${type}/${location}`)
                            .then(response => {
                                if(!response.ok){
                                    // IF Error finding accommodation
                                    response.json().then(message1 => {
                                        messageLocation.innerHTML = message1.error;
                                        return;
                                    });
                                }
                                response.json().then( accInfo => {
									// Clears markers before moving to a new point
									clearAllMarkers(mapObject);
									
									// Attempts to find location associated with the accommodations found
									const locResponse = fetch(`/loc/search/${accInfo[0].locationID}`)
									.then(locResponse => {
										if(!response.ok){
											// IF Error finding accommodation
											response.json().then(message1 => {
												messageLocation.innerHTML = message1.error;
												return;
											});
										}
										locResponse.json().then( location => {
											//Sets Maps view onto the found location and depending on location type it sets appropriate zoom level
											if(location[0].type == "Province"){
												console.log("P");
												mapObject.setView([location[0].latitude, location[0].longitude], 10);
											} else if(location[0].type == "Town/City"){
												console.log("TC");
												mapObject.setView([location[0].latitude, location[0].longitude], 13);
											} else if(location[0].type == "State"){
												console.log("S");
												mapObject.setView([location[0].latitude, location[0].longitude], 7);
											} else if(location[0].type == "Country"){
												console.log("C");
												mapObject.setView([location[0].latitude, location[0].longitude], 6);
											} else{
												mapObject.setView([location[0].latitude, location[0].longitude], 8);
											}
											
										})
									});
									
                                    accInfo.forEach(acc => {
                                        // Walking through each accommodation object returned
										setNewMarker(mapObject, acc.latitude, acc.longitude, `Name: ${acc.name}, Type: ${acc.type}`);
                                    });
									
                                    const message = `Accommodations with the Type: ${type} and Location: ${location}`;
                                    messageLocation.innerHTML = message;
                                    return;
                                });
                            });
        } catch (e) {
            console.log(e);
            console.log('Not found');
        }
        return;
    }
    // Runs if type is not given (searching by just location)
    console.log("Type is missing");
    try {
        const response = fetch(`/acc/search/${location}`)
                        .then(response => {
                            if(!response.ok){
                                // IF Error finding accommodation
                                response.json().then(message1 => {
                                    messageLocation.innerHTML = message1.error;
                                    return;
                                });
                            }
                            response.json().then( accInfo => {
								// Clears markers before moving to a new point
								clearAllMarkers(mapObject);
								
								// Attempts to find location associated with the accommodations found
								const locResponse = fetch(`/loc/search/${accInfo[0].locationID}`)
								.then(locResponse => {
									if(!response.ok){
										// IF Error finding accommodation
										response.json().then(message1 => {
											messageLocation.innerHTML = message1.error;
											return;
										});
									}
									locResponse.json().then( location => {
										//Sets Maps view onto the found location and depending on location type it sets appropriate zoom level
										if(location[0].type == "Province"){
											mapObject.setView([location[0].latitude, location[0].longitude], 10);
										} else if(location[0].type == "Town/City"){
											mapObject.setView([location[0].latitude, location[0].longitude], 13);
										} else if(location[0].type == "State"){
											mapObject.setView([location[0].latitude, location[0].longitude], 7);
										} else if(location[0].type == "Country"){
											mapObject.setView([location[0].latitude, location[0].longitude], 6);
										} else{
											mapObject.setView([location[0].latitude, location[0].longitude], 8);
										}
										
									})
								});								
								
                                if(accInfo){
                                    accInfo.forEach(acc => {
                                        // Walking through each accommodation object returned
										setNewMarker(mapObject, acc.latitude, acc.longitude, `Name: ${acc.name}, Type: ${acc.type}`);
                                    });

                                    const message = `Accommodations with Location: ${location}`;
                                    messageLocation.innerHTML = message;
                                    return;
                                }
                            });
                        });
    } catch (e) {
        console.log(e);
        console.log('Not found');
    }

}
 

document.getElementById('accSearchBtn').addEventListener('click', ()=> {
    // Read the product type from a text field
    const accLocation = document.getElementById('accLocation').value;
    const accType = document.getElementById('accType').value;
    
    if(!accLocation){
        // Error Location is required always
        console.log("Location is mandatory!")
        return;
    } else if(accType && accLocation){
        // Will run if both location and type provided
        // console.log(accLocation, accType);
        accSearchMap(map, accLocation, accType);
        return;
    }
    // Will run if type is not provided
    accSearchMap(map, accLocation);
    return;

});