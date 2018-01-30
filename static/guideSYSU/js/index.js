$(document).ready(()=>{

  //地图上的圆点
  var pictureContainorControl = function() {
    var isShow = false;
    return function() {
      var imgName = '#'+$(this).attr('id')+' div.imgContainor';
      var img = '#'+$(this).attr('id')+' div.imgContainor img';
      if(isShow) {
        $(img).addClass('hide');
        $(imgName).addClass('hide');
        $('li.place').removeClass('hide');
        $('#Bar').removeClass('hide');
      } else {
        $(img).removeClass('hide');
        $(imgName).removeClass('hide');
        $('li.place').addClass('hide');
        $('#Bar').addClass('hide');
      }
      isShow = !isShow;
    };
  }();
  $('li.place').click(pictureContainorControl);

  //选择面板:两点导航还是多个点指引
  $('form#servalPoint').hide();
  $('form#guideType').change(()=>{
    var value = $('#guideType input:checked').val();
    if(value == 'twoPoint') {
      $('form#twoPoint').show();
      $('form#servalPoint').hide();
      $('div#guideInfo p').html('');
    } else if(value == 'servalPoint') {
      $('form#twoPoint').hide();
      $('form#servalPoint').show();
      $('div#guideInfo p').html('');
    }
  });

  //辅助函数:显示一条路径
  var displayPath = function(points, pathObj) {
    var length = pathObj.length;
    var path = pathObj.path;
    var pathStr = '';
    for(let i in path) {
      pathStr += '<p>' + points[path[i]].name + '</p>';
    }
    $('div#guideInfo p#pathInfo').html(pathStr);
    $('div#guideInfo p#lengthInfo').html('总长度:' + (length/1000).toFixed(1) + 'km<br/>');    
    $('div#guideInfo').removeClass('hide');

    //可视化引导函数注册
    $('p#pathInfo p').mouseenter(function() {
      var id = $(this).html();
      $('li.place#' + id).addClass('twinkle');
    });
    $('p#pathInfo p').mouseleave(function() {
      var id = $(this).html();
      $('li.place#' + id).removeClass('twinkle');
    });
  };

  //获得路径
  $('form#twoPoint button').click(function() {
    var points;
    if($('select[name=from]').val() == 'walk') {
      points = peoplePoints;
    } else {
      points = carPoints;
    }
    var from = getIndexOf(points, $('#twoPoint select[name=from]').val());
    var to = getIndexOf(points, $('#twoPoint select[name=to]').val());
    var pathObj = getShortPathBetweenTwoPoint(points, from, to);
    displayPath(points, pathObj);
  });
  $('form#servalPoint button').click(function() {
    var points;
    if($('select[name=from]').val() == 'walk') {
      points = peoplePoints;
    } else {
      points = carPoints;
    }
    var pointsToVisit = [];
    var check = $('[name=pointToGo]:checked');
    for(let i in check) {
      pointsToVisit.push(getIndexOf(points, check[i].value));
    }
    var from = getIndexOf(points, $('#servalPoint select[name=from]').val());
    var pathObj = getShortPathInServalPoint(points, pointsToVisit, from);
    displayPath(points, pathObj);
  });

  //面板的打开和收起
  var barCotrol = function() {
    var show = 'infoBar';
    return function() {
      if(show == 'infoBar') {
        $('#infoBar').addClass('hide');
        $('#guideBar').removeClass('hide');
        show = 'guideBar';
      } else {
        $('#infoBar').removeClass('hide');
        $('#guideBar').addClass('hide');
        show = 'infoBar';
      }
    };
  }();
  $('#infoBar h1').click(barCotrol);
  $('#guideBar h1').click(barCotrol);

  //关闭路径显示
  $('#guideInfo button').click(function() {
    $('div#guideInfo p').html('');
    $('div#guideInfo').addClass('hide');
  });
});