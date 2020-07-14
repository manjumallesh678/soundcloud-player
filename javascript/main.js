document.querySelector(".js-submit").addEventListener("click",function(e){
    let input = document.querySelector(".js-search").value;
    soundCloudApi.getTrack(input);
});
document.querySelector(".js-search").addEventListener("keyup",function(e){
    if(e.which === 13){
        let input = document.querySelector(".js-search").value;
        soundCloudApi.getTrack(input);
    }
});
let pre = false;
let soundCloudApi = {};

soundCloudApi.init = function(){

    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
      
}

soundCloudApi.init();

soundCloudApi.getTrack = function(input){
        // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
    q: input
    }).then(function(tracks) {
    if(pre){
        document.querySelector(".js-search-results").innerHTML = "";
    }
    soundCloudApi.renderTrack(tracks);
    });
}
soundCloudApi.renderTrack = function(tracks){
   tracks.forEach(function(track){
        // card
        if(track.artwork_url !== null){
            let card = document.createElement("div");
            card.classList.add("card");

            let imageDiv = document.createElement("div");
            imageDiv.classList.add("image");

            let image_img = document.createElement("img");
            image_img.classList.add("image_img");
            image_img.src = track.artwork_url;
            image_img.alt = "image";
            imageDiv.appendChild(image_img);

            //content
            let content = document.createElement("div");
            content.classList.add("content");

            let header = document.createElement("div");
            header.classList.add("content");
            header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';

            //buttond
            let button = document.createElement("div");
            button.classList.add("ui","bottom","attached","button","js-button");

            let icon = document.createElement("i");
            icon.classList.add("add","icon");

            let buttonText = document.createElement("span");
            buttonText.innerHTML = "Add to playList";

            button.addEventListener("click",function(){
                soundCloudApi.getEmbed(track.permalink_url);
            });

            content.appendChild(header);

            button.appendChild(icon);
            button.appendChild(buttonText);

            card.appendChild(imageDiv);
            card.appendChild(content);
            card.appendChild(button);

            let searchResults = document.querySelector(".js-search-results");
            searchResults.appendChild(card); 
            pre = true;
        }
    });
        
}
soundCloudApi.getEmbed = function(play){
    SC.oEmbed(play, {
    auto_play : true
    }).then(function(embed){
        let sideBar = document.querySelector(".js-playlist");
        let box = document.createElement("div");
        box.innerHTML = embed.html;
        sideBar.insertBefore(box,sideBar.firstChild);
        localStorage.setItem("key",sideBar.innerHTML);
    });
}

let sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");

document.querySelector(".clearbutton").addEventListener("click",function(){
    localStorage.clear();
    sideBar.innerHTML = "";
});



