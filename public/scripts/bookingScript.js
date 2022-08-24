
function bookingAcc(accommodationID, numberPeople, fullDate) {
	const accID = accommodationID;
	const numP = numberPeople;
	const date = fullDate;
	
	const messageLocation = document.querySelector('#messageBox');

	
	const username = fetch(`/users/logged`)
					 .then(response => {
						 if(!response.ok) {
							 response.json().then(message1 => {
                                messageLocation.innerHTML = message1.error;
                                return;
                             });
						 } else {
							 response.json().then(userInfo => {
								 // console.log(userInfo[0].username);
// 								 Check to see if userinfo was retrieved successfully
								 if(userInfo.length < 1){
									 const user = userInfo[0].username;
								 
									 const booking = fetch(`/acc/book/${accID}/${numP}/${date}/${user}`, {method:"post"})
													 .then(response => {
														 if(!response.ok){
															// IF Error finding accommodation
															response.json().then(message1 => {
																messageLocation.innerHTML = message1.error;
																return;
															});
														 } else{
															 response.json().then(message1 => {
																messageLocation.innerHTML = message1.message;
																return;
															});
														 }
													 })
								 }
								 messageLocation.innerHTML = userInfo.error;
								 return;
								 
							 });
						 }
					 })

}



window.addEventListener("click", (e)=> {
	if(e.target.tagName == "A"){
		const id = e.target.name.split("-").pop()
		const acc = document.getElementById(id);
		// console.log(user);
		console.log("ID: " + id);
		bookingAcc(id, 3, 220601);
	}
})