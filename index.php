<html lang="en">

<head>

	<title>AngularJS 4 (ND)</title>

	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
	<!-- Angular JS -->
	
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
	<!--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>-->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular-route.min.js"></script>

	<!-- Angular Flash -->
	<script src="app/packages/angular-flash.min.js"></script>

	<!-- MY App -->
	<script src="app/packages/dirPagination.js"></script>
	<script src="app/routes.js"></script>
	<script src="app/services/myServices.js"></script>
	<script src="app/helper/myHelper.js"></script>
	<!-- App Controller -->
	<script src="app/controllers/ItemController.js"></script>

</head>

<body ng-app="main-App">

	<div class="container">
		<ng-view></ng-view>
	</div>
	<!-- Cropper -->
	<script src="node_modules/ui-cropper/compile/unminified/ui-cropper.js"></script>
	<script src="node_modules/ui-cropper/example/js/custom-javascript.js"></script>
</body>
</html>