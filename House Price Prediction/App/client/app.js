function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i in uiBathrooms) {
    if (uiBathrooms[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i in uiBHK) {
    if (uiBHK[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  // var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(
    url,
    {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value,
    },
    function (data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML =
        "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
    }
  );
}

function onPageLoad() {
  console.log("Document loaded");
  var url = "/api/get_location_names"; // Ensure this is the correct endpoint

  $.get(url, function (data, status) {
    console.log("Received response for get_location_names request");

    // Check if data contains locations
    if (data && data.locations) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");

      // Clear any existing options (except the first "Choose a Location" option)
      uiLocations.innerHTML =
        '<option value="" disabled selected>Choose a Location</option>';

      // Populate dropdown with locations
      locations.forEach(function (location) {
        var opt = new Option(location);
        uiLocations.appendChild(opt);
      });
    }
  });
}

window.onload = onPageLoad;
