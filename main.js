
const inputfield = document.getElementById("myInput");

inputfield.addEventListener("keyup", (event) => {
  if (event.key === 'Enter') {
    searchName();
  }
})

async function searchName() {
  let input = document.getElementById("myInput").value;

  const response = await fetch("https://customer-support.int.echarge.services/v1/users?limit=30&offset=0&search=" + input);
  const data = await response.json();
  console.log(data.data);

  if (data.data.length > 0) {

    var temp = ""
    data.data.forEach((itemData, i) => {
      temp += "<tr>";
      temp += "<td>" + itemData.name + "</td>";
      temp += "<td>" + itemData.email + "</td>";
      temp += "<td>"
      itemData.vehicles.forEach((vehicle, index) => {
        if (index > 0) { temp += ", " }
        temp += vehicle.brand + "  " + vehicle.model
      });
      temp += "</td>"
      temp += "<td>" + itemData.subscriptionStatus + "</td>";
      temp += "</tr>"
    });
    document.getElementById('data').innerHTML = temp;
    document.getElementById('table').style.opacity = 1;
    document.getElementById('info').innerHTML= "Hier sind deine Ergebnisse!"

  } else {
    document.getElementById('info').innerHTML = "Leider wurde Nichts gefunden"
  }

}
