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
                        document.body.appendChild(btn);
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