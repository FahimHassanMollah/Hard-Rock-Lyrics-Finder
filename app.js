const searchResultDiv = document.getElementById('search-result-parent-div');
const songTile = document.getElementById('song-title');
const lyrics = document.getElementById('lyrics');
document.getElementById('search-button').addEventListener('click', event => {
    const songName = document.getElementById('song-name').value;
    searchResultDiv.innerHTML = "";
    lyrics.innerHTML="";
    songTile.innerHTML=""
    fetchLyricsFinderApi(`https://api.lyrics.ovh/suggest/${songName}`);
    document.getElementById('song-name').value = "";
});
const fetchLyricsFinderApi = (apiUrl) => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            displaySongInformation(data);
        })
        .catch(reason => console.log(reason))
};

const displaySongInformation = (data) => {
    console.log(data);
    for (let i = 0; i < 10; i++) {
        console.log(data.data[i]);
        let singleResult = createDiv('single-result row align-items-center my-3 p-3')
        searchResultDiv.insertAdjacentElement("beforeend", singleResult);
        let songInformationDiv = createDiv('col-md-9')
        singleResult.insertAdjacentElement("afterbegin", songInformationDiv);
        songInformationDiv.insertAdjacentElement("beforeend", createP('author lead', 'author-lead', `Album by ${data.data[i].artist.name}`));
        songInformationDiv.insertAdjacentElement("afterbegin", createH3('lyrics-name', 'lyrics-name', `${data.data[i].title}`));
        songInformationDiv.insertAdjacentElement("beforeend", createArtistName('author lead', 'author-lead', 'Artist picture'));
        songInformationDiv.appendChild(createImageElemet('rounded-circle', 'artist-image', `${data.data[i].artist.picture_xl}`));
        let getLyricsDiv = createDiv('col-md-3 text-md-right text-center');
        let listenSong = createListenSongButton('btn btn-success', `lyrics-button`, 'Listen song');
        getLyricsDiv.appendChild(listenSong);
        let getLyricsButton = createGetLyricsButton('btn btn-success', '', 'Get Lyrics');
        getLyricsDiv.insertAdjacentElement('afterbegin', getLyricsButton);
        getLyricsButton.onclick = function () {
            songTile.innerText = `${data.data[i].title} ---${data.data[i].artist.name}`;
            try {
                fetch(`https://api.lyrics.ovh/v1/${data.data[i].artist.name}/${data.data[i].title}`)
                    .then(response => response.json())
                    .then(value => {
                        console.log(value);
                        const checker = value.lyrics;
                        if (checker === undefined) {
                            lyrics.innerHTML = "";
                            songTile.innerHTML="";
                            alert('Sorry lyrics is not available')
                        } else {
                            lyrics.innerHTML = value.lyrics;
                        }

                    })
            } catch (e) {
                console.log(e);
            }
        }
        songInformationDiv.insertAdjacentElement('afterend', getLyricsDiv);
        listenSong.onclick = function () {
            listenSong.href = data.data[i].preview;
        }
    }
};

function createDiv(className) {
    let divElement = document.createElement('div');
    divElement.className = className;
    return divElement;
}

function createH3(className, idName, value) {
    let h3Element = document.createElement('H3');
    h3Element.className = className;
    h3Element.id = idName;
    h3Element.innerText = value
    return h3Element;
}

function createP(className, idName, value) {
    let pElement = document.createElement('p');
    pElement.className = className;
    pElement.id = idName;
    pElement.innerText = value
    return pElement;
}

function createGetLyricsButton(className, idName, value) {
    let buttonElement = document.createElement('button');
    buttonElement.className = className;
    buttonElement.id = idName;
    buttonElement.style.marginBottom = '8px'
    buttonElement.innerText = value;
    return buttonElement;
}

function createImageElemet(className, idName, hrefValue) {
    let buttonElement = document.createElement('img');
    buttonElement.style.maxWidth = '100px';
    buttonElement.style.maxHeight = '100px';
    buttonElement.className = className;
    buttonElement.id = idName;
    buttonElement.innerText = 'sdfadsf';
    buttonElement.src = hrefValue
    return buttonElement;
}

function createArtistName(className, idName, value) {
    let pElement = document.createElement('p');
    pElement.className = className;
    pElement.style.display = 'inline-block';
    pElement.style.marginRight = '16px';
    pElement.id = idName;
    pElement.innerText = value
    return pElement;
}

function createListenSongButton(className, idName, value) {
    let anchorElement = document.createElement('a');
    anchorElement.className = className;
    anchorElement.id = idName;
    anchorElement.style.marginBottom = '8px'
    anchorElement.innerText = value;
    anchorElement.target = "_blank";
    anchorElement.style.cursor = 'pointer';
    return anchorElement;
}


