song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
songOn = "";

function preload(){
    song1 = loadSound("believer.mp3");
    song2 = loadSound("Butter - BTS.mp3");
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log(`Left Wrist X = ${leftWristX} Left Wrist Y = ${leftWristY}`);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log(`Right Wrist X = ${rightWristX} Right Wrist Y = ${rightWristY}`);
    }
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function draw(){
    image(video, 0, 0, 500, 400);

    fill("#e81e1e");
    stroke("#e81e1e");
    song1.isPlaying();

    if(scoreLeftWrist > 0.2){

    circle(leftWristX - 77, leftWristY - 56, 20);
    song2.stop();

    if(song2 == false){
        song1.play();
        document.getElementById("song").innerHTML = `Playing : Believer`;
    }
    }
}