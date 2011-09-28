var map;
var startIcon = new BMap.Icon("http://api.map.baidu.com/img/dest_markers.png", new BMap.Size(42, 34));
var endIcon = new BMap.Icon("http://api.map.baidu.com/img/dest_markers.png", new BMap.Size(42, 34), {imageOffset: new BMap.Size(0, -34)});
var startPoint = new BMap.Point(120.296718, 31.586485);
var endPoint = new BMap.Point(120.314828, 31.571904);
var startMarker;
var endMarker;
var drivingRoute;
var arrRoutesPoint = [];

$(function() {
    map = new BMap.Map("mapContainer");          // ������ͼʵ��
    var point = new BMap.Point(120.306492, 31.581379);  // ����������
    map.centerAndZoom(point, 15);                 // ��ʼ����ͼ���������ĵ�����͵�ͼ����
    map.enableScrollWheelZoom();
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.OverviewMapControl());

    $(window).resize(onWindowResize);
    onWindowResize(null);

    //������ʼ������
    drivingRoute = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true, enableDragging: true}});
    drivingRoute.setSearchCompleteCallback(onDrivingRouteSearchCompletedHandler);
    drivingRoute.search(startPoint, endPoint);

    $("#btnSave").click(onBtnSaveClickHandler);
});

//·��������� �¼�
function onDrivingRouteSearchCompletedHandler(results) {
    clearRoutesPoint();
    var resultRoute = results.getPlan(0)._routes;
    console.log(results.getPlan(0));
    for (var i = 0; i < resultRoute.length; i++) {
        var route = resultRoute[i];
        for (var j = 0; j < route._points.length; j++) {
            var marker = addMark(route._points[j]);
            arrRoutesPoint.push(marker);
        }
    }
}

function onBtnSaveClickHandler(event) {


}
//���֮ǰ����·���ϵĵ�
function clearRoutesPoint() {
    for (var i = 0; i < arrRoutesPoint.length; i++) {
        var marker = arrRoutesPoint[i];
        map.removeOverlay(marker);
    }
}

function addMark(point, icon) {
    var markerOpts;
    if (icon) {
        markerOpts = {icon:icon};
    }

    var marker = new BMap.Marker(point, markerOpts);  // ������ע
    map.addOverlay(marker);              // ����ע��ӵ���ͼ��
    return marker;
}

function onWindowResize(event) {
    $("#mapContainer").height($(window).height() - $("#divInfo").height());
}