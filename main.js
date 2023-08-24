song_1 = "";
song_2 = "";

song_1_status="";
song_2_status="";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is initialized!');

}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        console.log("scoreLeftWrist = " + scoreLeftWrist + " scoreRightWrist = " + scoreRightWrist);

        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0 , 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song_1_status = song_1.isPlaying();
    song_2_status = song_2.isPlaying();

    if(scoreLeftWrist > 0.2){

        circle(leftWristX, leftWristY, 20);
        song_1.stop();

    } if(song_2_status == false){

        song_2.play();
        document.getElementById("song_name").innerHTML = "Playing - Peter Pan Song";

    }

    if(scoreRightWrist > 0.2){

        circle(rightWristX, rightWristY, 20);
        song_2.stop();

    } if(song_1_status == false){
        song_1.play();
        document.getElementById("song_name").innerHTML = "Playing - Harry Potter Theme Song";
    }

}

function play(){
    song.play();
    
}