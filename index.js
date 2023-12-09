
let mediaRecorder;
let recordings = [];
var temp= false;

const startrecord = document.getElementById('start');
const stoprecord = document.getElementById('stop');
const audioplayer = document.getElementById('audioplayer');

function startrecording(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({audio:true})
        .then(stream =>{
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = e =>{
                    recordings.push(e.data);
            };

            mediaRecorder.onstop = () =>{
                const audio = new Blob(recordings, {type :'audio/wav'});
                const audiourl = window.URL.createObjectURL(audio);
                audioplayer.src = audiourl;
            }

            startrecord.addEventListener('click',()=>{
                mediaRecorder.start();
                startrecord.disabled = true;
                stoprecord.disabled = false;
                console.log("START");
                temp = true;
                if(temp){
                    setTimeout(()=>{
                        mediaRecorder.stop();
                        startrecord.disabled = false;
                stoprecord.disabled = true;
                    },60000);   
                   }
            })

            stoprecord.addEventListener('click',()=>{
                mediaRecorder.stop();
                startrecord.disabled = false;
                stoprecord.disabled = true;
            })

        })
    }
    
}

startrecording();