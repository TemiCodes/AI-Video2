video = ""
status = ""
objects = []

function setup() {
    canvas = createCanvas(350, 350)
    canvas.center()


}

function preload() {
    video = createVideo("video.mp4")
    video.hide()

}

function draw() {
    image(video, 0, 0, 350, 350)
    if (status != "") {
        objectdetector.detect(video, gotresults)
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("Status").innerHTML = "Status: detected"
            document.getElementById("Complete").innerHTML = "Number of objects: " + objects.length
            fill("#52FE39")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + percent + "%", objects[i].x, objects[i].y)
            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

        }
    }
}

function Start() {
    objectdetector = ml5.objectDetector("cocossd", modeloaded)
    document.getElementById("Status").innerHTML = "Status: Identifying Objects"
}

function modeloaded() {
    console.log("modelisLoaded")
    status = true
    video.loop()
    video.speed(1)
    video.volume(0.5)
}

function gotresults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        objects = results
    }
}
