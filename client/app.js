window.onload = function() {
    camera()
        .then(startVideo)
        .then(video => go(video));
};

function go(video) {
    faceDetection(video)
        .then(run)
        .then(() => go(video));
}

function run(faces) {
    const canvas = document.querySelector('canvas#overlay');
    const dst = document.querySelector('canvas#mirror');
    const video = document.querySelector('video');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rw = video.videoWidth / video.width;
    const rh = video.videoHeight / video.height;

    faces.forEach(face => {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';

        const [x, y, w, h] = [
            face.boundingBox.x / rw - 50,
            face.boundingBox.y / rh - 30,
            face.boundingBox.width / rw + 100,
            face.boundingBox.height / rh + 100,
        ];

        ctx.fillRect(x, y, w, h);

        dst.getContext('2d').drawImage(video, 0, 0);

        const image = dst.getContext('2d').getImageData(x - 100, y - 60, w, h);

        document
            .querySelector('canvas#destination')
            .getContext('2d')
            .putImageData(image, 0, 0);

        // const imageData = document.querySelector('canvas#destination').toDataURL();
        console.log('sending data');
    });
}

/**
 * Utils.
 */

function camera() {
    return navigator.mediaDevices.getUserMedia({ video: true });
}

function faceDetection(image) {
    if (window.FaceDetector == undefined) {
        return new Promise.reject('FaceDetector API not available.');
    }

    return new FaceDetector().detect(image);
}

function startVideo(stream) {
    const video = document.querySelector('video');

    video.srcObject = stream;

    return new Promise(resolve => {
        video.onplay = () => resolve(video);
    });
}
