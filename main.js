song_1 = ""
song_2 = ""

song1playing = false;

scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristSong = ""
rightWristSong = ""

leftWristX = 0
leftWristY = 0

rightWristX = 0
rightWristY = 0

function setup()
{
    canvas = createCanvas(600,500);
    canavs.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    song1playing = document.getElementById("status").innerHTML = "Song_1 will be played when left wrist is shown";

    fill("#FF0000");
    stroke("FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);

        if(song_2.isPlaying())
        {
           song_2.stop();
        }
    }

    if(song1playing == false)
    {
        song_1.isPlaying();
        
        songHeading = document.getElementById().innerHTML ="Song 1";
    }

    if(scoreRighttWrist > 0.2)
    {
        circle(rightWristX, righttWristY, 20);

        if(song_1.isPlaying())
        {
           song_1.stop();
        }
    }

    if(song1playing == false)
    {
        song_2.isPlaying();
        
        songHeading = document.getElementById().innerHTML ="Song 2";
    }
    
}

function preload()
{
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function play()
{
    song_1.play();
    song_1.setVolume(1);
    song_1.rate(1);

    song_2.play();
    song_2.setVolume(1);
    song_2.rate(1);
}


function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[17].score;
        scoreRighttWrist = results[0].pose.keypoints[10].score;
        console.log("Score Of Right Wrist = "+ scoreRighttWrist + "Score Of Left Wrist = "+ scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("leftWristX = " + leftWristX +"leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("rightWristX = " + rightWristX + "righttWristY = " + rightWristY);
    }
}

