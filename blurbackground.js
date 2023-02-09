var video = document.querySelector('.webcam');
var canvas = document.querySelector('.video');
// const faceDetector = new FaceDetector();
async function populateVideo(){
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width:1280, height:720},
  });
  video.srcObject = stream;
  video.onloadedmetadata = () => {
    video.play();
    loadAndPredict();
  };
}
async function loadAndPredict() {
  const net = await bodyPix.load();
  const blurbgLoop = setInterval(async () => {
    const segmentation = await net.segmentPerson(video);
    const backgroundBlurAmount = 3;
    const edgeBlurAmount = 3;
    const flipHorizontal = false;
    bodyPix.drawBokehEffect(
      canvas, video, segmentation, backgroundBlurAmount,
      edgeBlurAmount, flipHorizontal);
  }, 0);
}
populateVideo()
