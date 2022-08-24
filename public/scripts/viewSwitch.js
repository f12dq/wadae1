// Switches from showing the map to the table with the switch on the home page.
function viewSwitch(btn) {
	const map = document.getElementById("mapView");
	const table = document.getElementById("textView");
	if(btn.checked) {
		map.style.display = "none";
		table.style.display = "table";

		return;
	}
	map.style.display = "block";
	table.style.display = "none";

	return;
}

document.getElementById('toggleMapView').addEventListener('change', ()=>{
	const btn = document.getElementById('toggleMapView');
	viewSwitch(btn);
})