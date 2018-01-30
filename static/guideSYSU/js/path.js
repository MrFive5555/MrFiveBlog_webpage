
var Edge = function (from, to, length) {
  this.from = from;
  this.to = to;
  this.length = length;
};

var Point = function(name, neigh) {
  this.name = name;
  this.neigh = neigh;
};

var carPoints = [
  new Point('学生宿舍区', [
    new Edge(0, 4, 775),
  ]),
  new Point('工学院', [
    new Edge(1, 2, 289),
    new Edge(1, 3, 306),
    new Edge(1, 4, 391),
  ]),
  new Point('南北实验楼', [
    new Edge(2, 1, 289),
    new Edge(2, 3, 132),
    new Edge(2, 5, 103),
  ]),
  new Point('传设院', [
    new Edge(3, 1, 306),
    new Edge(3, 2, 132),
    new Edge(3, 4, 176),
    new Edge(3, 5, 149),
    new Edge(3, 6, 434),
  ]),
  new Point('假草运动场', [
    new Edge(4, 0, 775),
    new Edge(4, 1, 391),
    new Edge(4, 3, 176),
    new Edge(4, 6, 407),
  ]),
  new Point('后山', [
    new Edge(5, 3, 149),
    new Edge(5, 2, 103),
  ]),
  new Point('图书馆', [
    new Edge(6, 4, 407),
    new Edge(6, 3, 434),
    new Edge(6, 7, 377),
    new Edge(6, 10, 343),
    new Edge(6, 8, 122),
  ]),
  new Point('行政楼', [
    new Edge(7, 6, 377),
    new Edge(7, 9, 79),
    new Edge(7, 10, 109),
    new Edge(7, 11, 294),
    new Edge(7, 14, 454),
  ]),
  new Point('真草运动场', [
    new Edge(8, 6, 122),
    new Edge(8, 10, 231),
  ]),
  new Point('中山像', [
    new Edge(9, 7, 79),
    new Edge(9, 10, 92),
    new Edge(9, 11, 232),
  ]),
  new Point('公教楼', [
    new Edge(10, 6, 343),
    new Edge(10, 7, 109),
    new Edge(10, 8, 231),
    new Edge(10, 9, 92),
    new Edge(10, 11, 312),
    new Edge(10, 14, 207),
  ]),
  new Point('牌坊', [
    new Edge(11, 7, 294),
    new Edge(11, 9, 232),
    new Edge(11, 10, 312),
  ]),
  new Point('北门附近', [
    new Edge(12, 13, 216),
  ]),
  new Point('光电实验室', [
    new Edge(13, 12, 216),
    new Edge(13, 14, 144),
  ]),
  new Point('超算中心', [
    new Edge(14, 7, 454),
    new Edge(14, 10, 207),
    new Edge(14, 13, 144),
  ])
];
var peoplePoints = [
  new Point('学生宿舍区', [
    new Edge(0, 1, 751),
    new Edge(0, 4, 775),
    new Edge(0, 6, 874),
    new Edge(0, 8, 892),
  ]),
  new Point('工学院', [
    new Edge(1, 0, 751),
    new Edge(1, 2, 289),
    new Edge(1, 3, 306),
    new Edge(1, 4, 391),
  ]),
  new Point('南北实验楼', [
    new Edge(2, 1, 289),
    new Edge(2, 3, 132),
    new Edge(2, 5, 103),
  ]),
  new Point('传设院', [
    new Edge(3, 1, 306),
    new Edge(3, 2, 132),
    new Edge(3, 4, 176),
    new Edge(3, 5, 149),
    new Edge(3, 6, 434),
    new Edge(3, 7, 467),
  ]),
  new Point('假草运动场', [
    new Edge(4, 0, 775),
    new Edge(4, 1, 391),
    new Edge(4, 3, 176),
    new Edge(4, 6, 407),
  ]),
  new Point('后山', [
    new Edge(5, 2, 103),
    new Edge(5, 3, 149),
    new Edge(5, 7, 319),
    new Edge(5, 6, 509),
  ]),
  new Point('图书馆', [
    new Edge(6, 0, 874),
    new Edge(6, 3, 434),
    new Edge(6, 4, 407),
    new Edge(6, 5, 509),
    new Edge(6, 7, 377),
    new Edge(6, 8, 122),
    new Edge(6, 10, 343),
  ]),
  new Point('行政楼', [
    new Edge(7, 3, 467),
    new Edge(7, 5, 319),
    new Edge(7, 6, 377),
    new Edge(7, 8, 485),
    new Edge(7, 9, 79),
    new Edge(7, 10, 109),
    new Edge(7, 11, 294),
    new Edge(7, 14, 454),
  ]),
  new Point('真草运动场', [
    new Edge(8, 0, 892),
    new Edge(8, 6, 122),
    new Edge(8, 7, 485),
    new Edge(8, 9, 488),
    new Edge(8, 10, 231),
  ]),
  new Point('中山像', [
    new Edge(9, 7, 79),
    new Edge(9, 8, 488),
    new Edge(9, 10, 92),
    new Edge(9, 11, 232),
  ]),
  new Point('公教楼', [
    new Edge(10, 6, 343),
    new Edge(10, 7, 109),
    new Edge(10, 8, 231),
    new Edge(10, 9, 92),
    new Edge(10, 11, 312),
    new Edge(10, 14, 207),
  ]),
  new Point('牌坊', [
    new Edge(11, 7, 294),
    new Edge(11, 9, 232),
    new Edge(11, 10, 312),
    new Edge(11, 14, 269),
    new Edge(11, 12, 217),
  ]),
  new Point('北门附近', [
    new Edge(12, 11, 217),
    new Edge(12, 13, 216),
    new Edge(12, 14, 160),
  ]),
  new Point('光电实验室', [
    new Edge(13, 12, 216),
    new Edge(13, 14, 144),
  ]),
  new Point('超算中心', [
    new Edge(14, 7, 454),
    new Edge(14, 10, 207),
    new Edge(14, 11, 269),
    new Edge(14, 12, 160),
    new Edge(14, 13, 144),
  ])
];

var nomalize = function(points) {
  for(let i in points) {
    points[i].neigh.sort(function(a, b) {
      return a.length - b.length;
    });
  }
};

nomalize(carPoints);
nomalize(peoplePoints);

var getIndexOf = function(points, id) {
  for(var i=0; i!=points.length; ++i) {
    if(points[i].name == id) {
      return i;
    }
  }
  return -1;
};

var infinity = 6e20;

var getShortPathBetweenTwoPoint = function(points, from, to) {
  var lengthTo = [];
  var lastPoint = [];
  var hasCheck = [];
  //initialize
  for(let i=0; i!=points.length; ++i) {
    lengthTo.push(infinity);
    lastPoint.push(-1);
    hasCheck.push(false);
  }
  lengthTo[from] = 0;
  lastPoint[from] = from;
  hasCheck[from] = true;
  for(let i in points[from].neigh) {
    let edge = points[from].neigh[i];
    lengthTo[edge.to] = edge.length;
    lastPoint[edge.to] = from;
  }

  //get lengthTo and lastPoint
  for(let times = points.length; times--; ) {
    let index = 0;
    for(let i = 0, min = infinity; i != points.length; ++i) {
      if(!hasCheck[i] && lengthTo[i] < min) {
        index = i;
        min = lengthTo[i];
      }
    }
    hasCheck[index] = true;
    for(let j in points[index].neigh) {
      let edge = points[index].neigh[j];
      if(lengthTo[index] + edge.length < lengthTo[edge.to]) {
        lengthTo[edge.to] = lengthTo[index] + edge.length;
        lastPoint[edge.to] = index;
      }
    }
  }
  var path = [];
  for(let i=to; i!=from; i=lastPoint[i]) {
    if(i==-1) {
      console.log(lastPoint);
      throw 'error';
    }
    path.push(i);
  }
  path.push(from);
  return {
    length : lengthTo[to],
    path : path.reverse()
  };
};

var getShortPathInServalPoint = function(points, pointToVisit, begin) {
  var hasCheck = [];
  var length = 0;
  var isNeed = function(path) {
    for(let i in path) {
      if(pointToVisit.indexOf(path[i]) != -1) {
        return true;
      }
    }
    return false;
  };

  for(let i in points) {
    hasCheck[i] = false;
  }
  var DFS = function(index) {
    var path = [];
    var length = 0;
    hasCheck[index] = true;
    var neigh = points[index].neigh;
    path.push(index);
    for(let i in neigh) {
      let edge = neigh[i];
      if(!hasCheck[edge.to]) {
        let pathObj = DFS(edge.to);
        let newPath = pathObj.path;
        if(isNeed(newPath)) {
          path = path.concat(newPath);
          path.push(index);
          length += (pathObj.length + edge.length);
        }
      }
    }
    return {
      path : path,
      length : length
    };
  };
  var retObj = DFS(begin);
  return {
    length : retObj.length,
    path : retObj.path
  };
};

/*var test_1 = function() {
  var points = [
    new Point('', [
      new Edge(0, 4, 3),
      new Edge(0, 1, 2)
    ]),
    new Point('', [
      new Edge(1, 0, 2),
      new Edge(1, 3, 10),
      new Edge(1, 2, 4),
      new Edge(1, 4, 6)
    ]),
    new Point('', [
      new Edge(2, 1, 4),
      new Edge(2, 3, 5),
      new Edge(2, 5, 2)
    ]),
    new Point('', [
      new Edge(3, 1, 10),
      new Edge(3, 2, 5)
    ]),
    new Point('', [
      new Edge(4, 0, 3),
      new Edge(4, 1, 6),
      new Edge(4, 5, 3)
    ]),
    new Point('', [
      new Edge(5, 4, 3),
      new Edge(5, 2, 2),
    ])
  ];

  console.log(getShortPathBetweenTwoPoint(points, 0, 3).path);
  console.log(getShortPathBetweenTwoPoint(points, 4, 3).path);
  console.log(getShortPathBetweenTwoPoint(points, 0, 2).path);
  console.log(getShortPathBetweenTwoPoint(points, 2, 0).path);
  console.log(getShortPathBetweenTwoPoint(points, 2, 2).path);  

  console.log(getShortPathInServalPoint(points, [0, 1, 2, 3, 4, 5], 0));
  console.log(getShortPathInServalPoint(points, [0, 1, 3, 5], 0));
  console.log(getShortPathInServalPoint(points, [0, 3, 5], 0));
  console.log(getShortPathInServalPoint(points, [0, 3], 0));
}*/

/*var test_2 = function() {
  for(let i=0; i!=15; ++i) {
    for(let j=0; j!=15; ++j) {
      console.log('from: ' + i + ' to: ' + j);
      console.log(getShortPathBetweenTwoPoint(peoplePoints, i, j));
    }
  }
}*/
