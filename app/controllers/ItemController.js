var URL = "http://localhost/angularjs";
app.controller('ItemController', function(dataFactory,$scope,$http, Flash){
 
  $scope.data = [];
  $scope.libraryTemp = {};
  $scope.totalItemsTemp = {};
  $scope.files = [];

  $scope.totalItems = 0;
  $scope.pageChanged = function(newPage) {
    getResultsPage(newPage);
  };

  getResultsPage(1);
  function getResultsPage(pageNumber) {
      if(! $.isEmptyObject($scope.libraryTemp)){
          dataFactory.httpRequest(URL + '/api/getData.php?search='+$scope.searchText+'&page='+pageNumber).then(function(data) {
            $scope.data = data.data;
            $scope.totalItems = data.total;
          });
      }else{
        dataFactory.httpRequest(URL + '/api/getData.php?page='+pageNumber).then(function(data) {
          $scope.data = data.data;
          $scope.totalItems = data.total;
        });
      }
  }

  $scope.searchDB = function(){
      if($scope.searchText.length >= 3){
          if($.isEmptyObject($scope.libraryTemp)){
              $scope.libraryTemp = $scope.data;
              $scope.totalItemsTemp = $scope.totalItems;
              $scope.data = {};
          }
          getResultsPage(1);
      }else{
          if(! $.isEmptyObject($scope.libraryTemp)){
              $scope.data = $scope.libraryTemp ;
              $scope.totalItems = $scope.totalItemsTemp;
              $scope.libraryTemp = {};
          }
      }
  }

  $scope.saveAdd = function(){
    dataFactory.httpRequest(URL + '/api/add.php','POST',{},$scope.form).then(function(data) {
      $scope.data.push(data);
      $(".modal").modal("hide");
      var message = '<strong> Well done!</strong>  Record added successfully';
      var id = Flash.create('success', message);
    });
  }

  $scope.edit = function(id){
    dataFactory.httpRequest(URL + '/api/edit.php?id='+id).then(function(data) {
    	console.log(data);
      $scope.form = data;

    });
  }

  $scope.saveEdit = function(){
    dataFactory.httpRequest(URL + '/api/update.php?id='+$scope.form.id,'POST',{},$scope.form).then(function(data) {
      	$(".modal").modal("hide");
        $scope.data = apiModifyTable($scope.data,data.id,data);
        var message = '<strong> Well done!</strong>  Record has been updated successfully';
        var id = Flash.create('success', message);
    });
  }

  $scope.remove = function(item,index){
    var result = confirm("Are you sure delete this item?");
   	if (result) {
      dataFactory.httpRequest(URL + '/api/delete.php?id='+item.id,'DELETE').then(function(data) {
          $scope.data.splice(index,1);

          var message = '<strong> Well done!</strong>  Record deleted successfully';
          var id = Flash.create('danger', message);
      });
    }
  }

  //**FILE UPLOADER SECTION**//
  $scope.saveImage = function(){
    //console.log($scope.form);
    //$scope.form.avatar = [];
    //$scope.form.avatar = $scope.files[0];
    $http({
      method  : 'POST',
      url     : URL + '/api/upload.php?id='+$scope.form.id,
      processData: false,
      transformRequest: function (data) {
          var formData = new FormData();
          formData.append("avatar", $scope.files[0]);  
          return formData;  
      },  
      data : $scope.form,
      headers: {
             'Content-Type': undefined
      }
      }).success(function(data){
          $(".modal").modal("hide");
          var message = data;
          var id = Flash.create('success', message);
          getResultsPage(1);
      });
  }


  $scope.uploadedFile = function(element) {
    $scope.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
      $scope.image_source = event.target.result
      $scope.$apply(function($scope) {
        $scope.files = element.files;
      });
    }
    reader.readAsDataURL(element.files[0]);
  }


  $scope.removeImage = function(item){
    console.log(item);
    var result = confirm("Are you sure delete this item?");
    if (result) {
      $http({
        method  : 'DELETE',
        url     : URL + '/api/deleteImage.php?id='+item.id +'&name=' + item.avatar,
        processData: false,
        data : item,
        headers: {
               'Content-Type': undefined
        }
        }).success(function(data){
            $(".modal").modal("hide");
            var message = data;
            var id = Flash.create('success', message);
            getResultsPage(1);
      });
    }
  }
   
});
