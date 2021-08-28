objects = [];
item = '';
function preload() {}
function setup() {
    canvas = createCanvas(500, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function find() {
    detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(video, 0, 0, 500, 350);
    if (status != "") {
        detector.detect(video, gotResults);
        console.log("object length "+ objects.length);
        for (i = 0; i < objects.length; i++) {
            percent = floor(objects[i].confidence * 100);
            fill("#FF0000");
            text(objects[i].label + "  " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
            item = document.getElementById('object_input').value; 
            console.log("Inside for loop: item: "+ item);
            if(item == objects[i].label){
                document.getElementById("status").innerHTML = "Status: " + item + " Found!";
            }
            else if (item != objects[i].label){
                document.getElementById('status').innerHTML = item + ' Not Found';
            }
        }
    }
}


function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function modelLoaded() {
    console.log("Coco SSD Loaded!");
    status = true;
}