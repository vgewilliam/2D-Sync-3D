earthquakeManager.prototype.sync2D3D=function(Cesium,viewer){
   var scene=viewer.scene;
   var ellipsoid=viewer.scene.globe.ellipsoid;
   var leftviewer = new Cesium.Viewer('twoD-cesiumContainer',{
      animation : false,
      timeline : false,
      baseLayerPicker : false,
      navigationHelpButton :false,
      sceneMode:Cesium.SceneMode.SCENE2D
  });
   leftviewer.imageryLayers.removeAll();
   var bingMap = new Cesium.BingMapsImageryProvider({
      url:'//dev.virtualearth.net',
      key:'RrtMfihZkhPO5yZ7oToT~FpWsSrdQKKlR785PhRAunA~AsteAHRBCGbAimkt8u-n8F_FXnohAU39WqwuVyC7ux5Ei9_ojXWbtX-ycCeU1YD2'
  });
   leftviewer.imageryLayers.addImageryProvider(bingMap);
   var tdtProvider=new Cesium.UrlTemplateImageryProvider({
      url:'http://satellite.casm.ac.cn:8020/geowinweb/ds.axd?serivceproviderid=map.cachedtms&serivceid=gettile&tilename=map&x={x}&y={y}&z={z}&srs=epsg:900913&wrap=true&tokenid=1503452360491',
  });
   var tdtlayer=new Cesium.ImageryLayer(tdtProvider);
   leftviewer.imageryLayers.add(tdtlayer); 
   var tdtProvider1=new Cesium.UrlTemplateImageryProvider({
      url:'http://satellite.casm.ac.cn:8020/geowinweb/ds.axd?serivceproviderid=map.cachedtms&serivceid=gettile&tilename=maplabel&x={x}&y={y}&z={z}&srs=epsg:900913&wrap=true&tokenid=1503452360491 ',
  })
   var tdtlayer1=new Cesium.ImageryLayer(tdtProvider1);
   leftviewer.imageryLayers.add(tdtlayer1);

   var rightviewer = new Cesium.Viewer('threeD-cesiumContainer',{
      animation : false,
      timeline : false,
      baseLayerPicker : false,
      navigationHelpButton :false,
     // sceneMode:Cesium.SceneMode.SCENE2D
 });
   rightviewer.imageryLayers.removeAll();
   var bingMap = new Cesium.BingMapsImageryProvider({
      url:'//dev.virtualearth.net',
      key:'RrtMfihZkhPO5yZ7oToT~FpWsSrdQKKlR785PhRAunA~AsteAHRBCGbAimkt8u-n8F_FXnohAU39WqwuVyC7ux5Ei9_ojXWbtX-ycCeU1YD2'
  });
   rightviewer.imageryLayers.addImageryProvider(bingMap); 
     //左边联动右边
     var temp1,temp2;
     var leftscene=leftviewer.scene;
     leftviewer.camera.percentageChanged=0.001;
     var leftHandler =leftviewer.camera.changed.addEventListener(function () {
      if(temp2==true){
        return temp2=false;
    }
    var pt3 = new Cesium.Cartesian2(window.innerWidth / 4, window.innerHeight / 4);
    var ellipsoid=leftviewer.scene.globe.ellipsoid;
    var cartesian2 = leftviewer.camera.pickEllipsoid(pt3, ellipsoid);
    if(cartesian2==undefined){
        return;
    }
    else{
        var cartographic2=ellipsoid.cartesianToCartographic(cartesian2);
        var lat2=Cesium.Math.toDegrees(cartographic2.latitude);
        var lng2=Cesium.Math.toDegrees(cartographic2.longitude);
        var alt=cartographic2.height;
        var b2=leftviewer.scene.camera.positionCartographic.height;
        rightviewer.camera.setView({
           destination: Cesium.Cartesian3.fromDegrees(lng2,lat2,b2),
       });
        temp1=true;
    }
    
}); 
      //右边联动左边
      var rightscene=rightviewer.scene;
      rightviewer.camera.percentageChanged=0.001;
      var rightHandler =rightviewer.camera.changed.addEventListener(function () {

        if(temp1==true){
          return temp1=false;
      }
      var pt1 = new Cesium.Cartesian2(window.innerWidth / 4, 3*window.innerHeight / 4);
      var ellipsoid1=rightviewer.scene.globe.ellipsoid;
      var cartesian1 = rightviewer.camera.pickEllipsoid(pt1, ellipsoid1);
      if(cartesian1==undefined){
          return;
      }
      else{
          var cartographic1=ellipsoid1.cartesianToCartographic(cartesian1);
          var lat1=Cesium.Math.toDegrees(cartographic1.latitude);
          var lng1=Cesium.Math.toDegrees(cartographic1.longitude);
          var b1=rightviewer.scene.camera.positionCartographic.height;
          leftviewer.camera.setView({
             destination: Cesium.Cartesian3.fromDegrees(lng1,lat1,b1)
         });
          temp2=true;
      }
  }); 

  }