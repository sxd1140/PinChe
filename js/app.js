var map;
var startIcon = new BMap.Icon("http://api.map.baidu.com/img/dest_markers.png", new BMap.Size(42, 34));
var endIcon = new BMap.Icon("http://api.map.baidu.com/img/dest_markers.png", new BMap.Size(42, 34), {imageOffset: new BMap.Size(0, -34)});
var startPoint = new BMap.Point(120.296718, 31.586485);
var endPoint = new BMap.Point(120.314828, 31.571904);
var startMarker;
var endMarker;
var drivingRoute;
var arrRoutesPoint = [];
var arrRoutesPointMarkers = [];
const routePointDistance = 100;

$(function() {
    map = new BMap.Map("mapContainer");          // 创建地图实例
    var point = new BMap.Point(120.306492, 31.581379);  // 创建点坐标
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom();
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.OverviewMapControl());

    $(window).resize(onWindowResize);
    onWindowResize(null);

    //根据起始点搜索
    drivingRoute = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true, enableDragging: true}});
    drivingRoute.setSearchCompleteCallback(onDrivingRouteSearchCompletedHandler);
    drivingRoute.search(startPoint, endPoint);

    $("#btnSave").click(onBtnSaveClickHandler);
});

//路径搜索完成 事件
function onDrivingRouteSearchCompletedHandler(results) {
    clearRoutesPoint();
    var resultRoute = results.getPlan(0)._routes;
//    console.log(results.getPlan(0));
    //把所有的路径上的所有点 标注出来
    for (var i = 0; i < resultRoute.length; i++) {
        var route = resultRoute[i];
        for (var j = 0; j < route._points.length; j++) {
            arrRoutesPoint.push(route._points[j]);
        }
    }

    for (var k = 0; k < arrRoutesPoint.length; k++){
        if (map.getDistance(arrRoutesPoint[k],arrRoutesPoint[k+1]) < routePointDistance){
            continue;
        }
        var marker = addMark(arrRoutesPoint[k]);
            arrRoutesPointMarkers.push(marker);
    }
    arrRoutesPoint = [];


}

function onBtnSaveClickHandler(event) {


}
//清除之前画的路径上的点
function clearRoutesPoint() {
    for (var i = 0; i < arrRoutesPointMarkers.length; i++) {
        var marker = arrRoutesPointMarkers[i];
        map.removeOverlay(marker);
//        arrRoutesPointMarkers.splice(i,1);
    }
    arrRoutesPointMarkers = [];
}

function addMark(point, icon) {
    var markerOpts;
    if (icon) {
        markerOpts = {icon:icon};
    }

    var marker = new BMap.Marker(point, markerOpts);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中
    return marker;
}

function onWindowResize(event) {
    $("#mapContainer").height($(window).height() - $("#divInfo").height());
}