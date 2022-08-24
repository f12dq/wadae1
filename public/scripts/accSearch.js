function accSearch(location, type = null) {

    const accomodationsHTML = document.querySelector('#accommodations');
    const messageLocation = document.querySelector('#messageBox');

    const accommodationRow = (accommodation) => `
        <tr>
            <td class="text-center">${accommodation.name}</td>
            <td class="text-center">${accommodation.location}</td>
            <td class="text-center">${accommodation.type}</td>
            <td class="text-center">${accommodation.longitude}, ${accommodation.latitude}</td>
            <td class="text-center">
                <a name="acc-${accommodation.ID}" id="${accommodation.ID}" class='btn btn-secondary btn-xs'>
                    Book
                </a>
            </td>
        </tr>
        `;

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
                                    if(accInfo){
                                        let accommodationsList = [];
                                        accInfo.forEach(acc => {
                                            // Walking through each accommodation object returned
                                            accommodationsList.push(accommodationRow(acc));
                                        });
                                        accomodationsHTML.innerHTML = accommodationsList.join("");

                                        const message = `Retrieved the Type: ${type} and Location: ${location}`;
                                        messageLocation.innerHTML = message;
                                        return;
                                    }
                                });
                            });
        } catch (e) {
            console.log(e);
            console.log('Not found');
        }
        return;
    }
    // Runs if type is not given (searching by just location)
    console.log("No type selected");
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
                                if(accInfo){
                                    let accommodationsList = [];
                                    accInfo.forEach(acc => {
                                        // Walking through each accommodation object returned
                                        accommodationsList.push(accommodationRow(acc));
                                    });
                                    accomodationsHTML.innerHTML = accommodationsList.join("");

                                    const message = `Retrieved from Location: ${location}`;
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
    }
    if(accType && accLocation){
        // Will run if both location and type provided
        // console.log(accLocation, accType);
        accSearch(accLocation, accType);
        return;
    }
    // Will run if type is not provided
    accSearch(accLocation);
    return;

});