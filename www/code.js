/**
 * Created by eddy on 14-12-16.
 */
var playlist = [];

var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=PLdUYaf6WhlSu8RHl-FkZiZk9Gk0yk_kg_&key=AIzaSyBJH63z2NH3rAlafo9hT9XtaaK4BArCpNs';
fetch(url)
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                console.log(data);
                var gyt = document.getElementById('gyt1');
                data.items.forEach(
                    function (item, i) {
                        var a = document.createElement('a');
                        //a.href = 'https://www.youtube.com/embed/' + item.contentDetails.videoId+ '?autoplay=1&loop=1';
                        //a.target='video_target';
                        //a.innerHTML='video' + item.contentDetails.videoId ;
                        //document.body.appendChild(document.createElement('br'));
                        //document.body.appendChild(a);
                        var btn = document.createElement('button');

                        btn.onclick = function () {
                            gyt.setAttribute('video-id', item.contentDetails.videoId);
                        }
                        btn.innerHTML = item.contentDetails.videoId;
                        var parent = document.querySelector('div[right]');
                        parent.appendChild(btn);
                        playlist.push(item.contentDetails.videoId);

                    }
                )
                gyt.videoId = playlist.shift();
                playlist.push(gyt.videoId);
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });


function init() {

    var gyt = document.getElementById('gyt1');

    gyt.addEventListener('google-youtube-state-change', function (e) {
        // Test that the element's state property always is set to the same property in the event.
        state = e.detail.data;
        console.log(JSON.stringify(e));
        if (state === 0) {
            gyt.videoId = playlist.shift();
            playlist.push(gyt.videoId);
        }
    });
}

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    var keyCode = e.keyCode;
    var key = e.key;
    if ('1234'.indexOf(key) >=0 ){
        vergroot(`gyt${key}`);
    }

    if(keyCode==27 || key === '0') {
        verklein();
    }
 }


function vergroot(id){
  var srcElm =document.getElementById(id);
  var gytElm = document.createElement('google-youtube');
    gytElm.id="gytLarge";
    gytElm.videoId=srcElm.videoId;
    var w= Math.round(window.innerWidth*0.70);
    var h= Math.round(w*0.6);
    gytElm.height=`${h}px`;
    gytElm.width=`${w}px`;
    gytElm.rel="0";
    gytElm.start="5";
    gytElm.autoplay="1";
    gytElm.style.position='absolute';
    gytElm.style.left='17vw';

    document.body.appendChild(gytElm);



}

function verklein(){
    var gytElm = document.getElementById('gytLarge');
    if (gytElm){
        document.body.removeChild(gytElm);
    }

}
