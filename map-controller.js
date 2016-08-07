var app = angular.module('mapApp', []);


app.controller('mapCtrl', function($scope, $compile){

	var layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

	$scope.map = L.map("map", {

		layers: [layer],
		center: [53.4, -7.9],
		zoom: 6,
		maxZoom: 17

	});



	$scope.markers = [
	{
		'lat': 53.2707,
		'long': -9.0568,
		'name': 'Galway, Ireland',
		'img': 'http://rsvpmagazine.ie/wp-content/uploads/2015/08/galway-city_free_car2.jpg'
	}];


	angular.forEach($scope.markers, function(value, key){

		var marker = L.marker([value.lat, value.long])
		.bindPopup("<p class='areaTitle'>" + value.name + "</p> <br/><img src='" + value.img + "' class='img-responsive thumbnail'>")
		.addTo($scope.map);

	});


	//Models for input box and to create new markers
	$scope.newMarkerLat;
	$scope.newMarkerLong;
	$scope.name;

	$scope.createNewCreateMarker = function(){

		var btn = "<p class='areaTitle'><input ng-model='name'/> </p> <button ng-click='createNewMarker()'>Add</button>";
		var temp = $compile(btn)($scope);
		var tempMarker = L.marker([$scope.newMarkerLat, $scope.newMarkerLong])
		.bindPopup(temp)
		.addTo($scope.map);	
	};

	//Add a new Marker Via the form
	$scope.createNewMarker = function(){
		console.log('working');
		$scope.map.removeLayer(tempMarker);
		var permMarker = L.marker([$scope.newMarkerLat, $scope.newMarkerLong])
		.bindPopup("<p class='areaTitle'>" + $scope.name + "</p>")
		.addTo($scope.map);	
	};



	//Add a new Marker Via a Click
	$scope.map.on('click', function(e){
		$scope.newMarkerLat = e.latlng.lat;
		$scope.newMarkerLong  = e.latlng.lng;
		$scope.createNewCreateMarker();
	});



});