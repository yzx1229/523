let facemesh;
let predictions = [];
// Facemesh點的編號
const indices1 = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];
const indices2 = [76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184];

function setup() {
  // 將畫布置中
  let cnv = createCanvas(400, 400);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  // 啟用視訊
  let video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 載入Facemesh模型
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  console.log('Facemesh model loaded!');
}

function draw() {
  background(220);

  // 畫出Facemesh點連線
  drawFacemeshLines(indices1);
  drawFacemeshLines(indices2);
}

function drawFacemeshLines(indices) {
  if (predictions.length > 0) {
    let keypoints = predictions[0].scaledMesh;
    stroke(255, 0, 0);
    strokeWeight(15);
    noFill();
    for (let i = 0; i < indices.length - 1; i++) {
      let idxA = indices[i];
      let idxB = indices[i + 1];
      let [x1, y1] = keypoints[idxA];
      let [x2, y2] = keypoints[idxB];
      line(x1, y1, x2, y2);
    }
  }
}
