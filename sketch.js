//Thanks to Olivier for his line drawing code
let veh = [];
let doorArr = [];
let jsonFile;
let dataPoints = [];
let yPos;
let doorOpen, doorClose;

function preload() {
  let url = 'https://sheetdb.io/api/v1/7nps8seqdladz';
  jsonFile = loadJSON(url);
  doorOpen = loadImage('door/white_door_18.png');
  doorClose = loadImage('door/white_door_00.png');
}

function setup() {
  pixelDensity(2);
  createCanvas(1000, 800);
  imageMode(CENTER);
  for (let x in jsonFile) {
    let currentItem = {
      day: jsonFile[x].Day,
      time: jsonFile[x].Time,
      dest: jsonFile[x].Destination,
      reason: jsonFile[x].Reason
    };
    dataPoints.push(currentItem);
  }
  veh.push(new Vehicle(0, 100));
  setTimeout(dayTime(1), 0);
  yPos = 0;
}


function draw() {
  background(255);

  if (yPos < 7) {
    if (veh[yPos].loc.x > width) {
      veh[yPos].speed = 0;
      veh.push(new Vehicle(-1, (yPos + 2) * 100));
      dayTime(yPos + 2);
      yPos++;
    }
  } else {
    veh[yPos].loc.x = -1;
    veh[yPos].speed = 0;
  }

  for (var i = 0; i < veh.length; i++) {
    veh[i].run();
  }
   doorDisplay();
}


function makeDoor(caption1, caption2, x, y) {
  doorArr.push(new Door(caption1, caption2, x, y));
}


function dayTime(day) {
  let count = [];
  for (var i = 0; i < dataPoints.length; i++) {
    if (dataPoints[i].day == day) {
      count.push(i);
    }
  }
  for (var j = 0; j < dataPoints.length; j++) {
    if (dataPoints[j].day == day) {
      let tempVar = dataPoints[j].reason;
      let tempDest = dataPoints[j].dest;
      let tempTime = map(dataPoints[j].time, dataPoints[(count[0])].time, dataPoints[(count[count.length - 1])].time, 1000, 8000);

      setTimeout(function() {
        makeDoor(tempVar,tempDest, veh[yPos].loc.x, veh[yPos].loc.y);
      }, tempTime);
    }
  }
}

function doorDisplay() {
  for (var i = 0; i < doorArr.length; i++) {
    if (i > 0) {
      if (dist(doorArr[i].x, doorArr[i].y, doorArr[i - 1].x, doorArr[i - 1].y) < 15) {
        doorArr[i].x += 20;
      }
    }
    if (i > 1) {
      if (dist(doorArr[i].x, doorArr[i].y, doorArr[i - 2].x, doorArr[i - 2].y) < 15) {
        doorArr[i].x += 20;
      }
    }
    doorArr[i].display();
    if (dist(doorArr[i].x, doorArr[i].y, mouseX, mouseY) < 10) {
      doorArr[i].move();
    }
  }
}