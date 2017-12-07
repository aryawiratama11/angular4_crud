var URL = "http://localhost/angularjs";
app.controller('ItemController', function(dataFactory,$scope,$http, Flash){
 
  $scope.data = [];
  $scope.libraryTemp = {};
  $scope.totalItemsTemp = {};
  $scope.files = [];

  //Cropper...
  //$scope.myImage ='https://raw.githubusercontent.com/CrackerakiUA/ui-cropper/master/screenshots/live.jpg';
  $scope.myImage ='';
  $scope.myCroppedImage='';

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

    var fileNew = dataURItoBlob($scope.myCroppedImage, $scope.currentFile.name);
    $scope.fileNew = fileNew;
    $scope.fileNew.name = $scope.currentFile.name;

    //$scope.files[0] = $scope.fileNew;
    $http({
      method  : 'POST',
      url     : URL + '/api/upload.php?id='+$scope.form.id+'&name='+$scope.currentFile.name,
      processData: false,
      transformRequest: function (data) {
          var formData = new FormData();
          formData.append("avatar", $scope.fileNew);  
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
  
  //Copper
  $scope.uploadedFile = function(element) {

    var ext = element.files[0].name.match(/\.(.+)$/)[1];
    if(angular.lowercase(ext) !=='jpg' && angular.lowercase(ext) !=='jpeg' && angular.lowercase(ext) !=='png'){
        alert("Invalid File Format");
        document.getElementById('sbmtAvatar').disabled = true;
        return false;
    }  
    document.getElementById('sbmtAvatar').disabled = false;
    $scope.currentFile = element.files[0];
    $scope.fileNew = {type:'image/jpeg'};
    var reader = new FileReader();
    $scope.cropped = {image: ''};
    reader.onload = function(event) {
      $scope.image_source = event.target.result;
      $scope.$apply(function($scope) {
        $scope.myImage = event.target.result;
        $scope.files[0] = dataURItoBlob($scope.myImage, $scope.currentFile.name);
        
      });
    }
    reader.readAsDataURL($scope.currentFile);
  }

  var dataURItoBlob = function(dataURI, fileName) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = decodeURI(dataURI.split(',')[1]);
    }
    //var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for(var i = 0; i < byteString.length; i++) {
      array.push(byteString.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg', name: fileName});
  };

});
