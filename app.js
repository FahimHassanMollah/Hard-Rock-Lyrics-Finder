document.getElementById('search-button').addEventListener('click', event => {

    const songName=document.getElementById('song-name').value;

    fetchLyricsFinderApi(`https://api.lyrics.ovh/suggest/${songName}`);


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
    const songTile=document.getElementById('song-title');
    const lyrics=document.getElementById('lyrics');
    const searchResultDiv=document.getElementById('search-result-parent-div');
    console.log(data);
    for (let i = 0; i <10 ; i++) {
        console.log(data.data[i]);
        let singleResult=createDiv('single-result row align-items-center my-3 p-3')
        searchResultDiv.insertAdjacentElement("beforeend", singleResult);
        let songInformationDiv=createDiv('col-md-9')

        singleResult.insertAdjacentElement("afterbegin", songInformationDiv);
        songInformationDiv.insertAdjacentElement("beforeend",createP('author lead','author-lead',`Album by ${data.data[i].artist.name}`));
        songInformationDiv.insertAdjacentElement("afterbegin",createH3('lyrics-name','lyrics-name',`${data.data[i].title}`));

        // songInformationDiv.insertAdjacentElement("beforeend",createP('author lead','author-lead','artist picture'));
        songInformationDiv.insertAdjacentElement("beforeend",createArtistName('author lead','author-lead','Artist picture'));
        songInformationDiv.appendChild(createImageElemet('rounded-circle','artist-image',`${data.data[i].artist.picture_xl}`));
        let getLyricsDiv=createDiv('col-md-3 text-md-right text-center');
        getLyricsDiv.appendChild(createGetLyricsButton('btn btn-success',`lyrics-button`,'Download'))

        let getLyricsButton=createGetLyricsButton('btn btn-success','','Get Lyrics');
        getLyricsDiv.insertAdjacentElement('afterbegin',getLyricsButton);
        getLyricsButton.onclick=function(){

            songTile.innerText=`${data.data[i].title} ---${data.data[i].artist.name}`;
            try {
                fetch(`https://api.lyrics.ovh/v1/${data.data[i].artist.name}/${data.data[i].title}`)
                    .then(response =>response.json())
                    .then(value => {
                        console.log(value);
                        const checker=value.lyrics;
                        if (checker===undefined) {
                            alert('Sorry lyrics is not available')
                        }
                        else {
                            lyrics.innerHTML=value.lyrics;
                        }

                    })
            }catch (e) {
                console.log(e);
            }

                // .catch(reason => {
                //    window.prompt('hiiiiiiiii')
                // })

        }
        // getLyricsDiv.insertAdjacentElement('afterbegin',createGetLyricsButton('btn btn-success',`${data.data[i]}`,'Get Lyrics'))
        songInformationDiv.insertAdjacentElement('afterend',getLyricsDiv);
        // document.getElementById('get-lyrics-button').addEventListener('click', event => {
        //     console.log('hi')
        // });

    }
    // searchResultDiv.addEventListener('click', event => {
    //     console.log(event);
    // });


    // let singleResult=createDiv('single-result row align-items-center my-3 p-3')
    // searchResultDiv.insertAdjacentElement("beforeend", singleResult);
    // let songInformationDiv=createDiv('col-md-9')
    //
    // singleResult.insertAdjacentElement("afterbegin", songInformationDiv);
    // songInformationDiv.insertAdjacentElement("beforeend",createP('author lead','author-lead','Album by'));
    // songInformationDiv.insertAdjacentElement("afterbegin",createH3('lyrics-name','lyrics-name','Purple Noon'));
    //
    // // songInformationDiv.insertAdjacentElement("beforeend",createP('author lead','author-lead','artist picture'));
    // songInformationDiv.insertAdjacentElement("beforeend",createArtistName('author lead','author-lead','artist picture'));
    // songInformationDiv.appendChild(createImageElemet('rounded-circle','artist-image','https://www.w3schools.com/bootstrap4/paris.jpg'));
    // let getLyricsDiv=createDiv('col-md-3 text-md-right text-center');
    // getLyricsDiv.appendChild(createGetLyricsButton('btn btn-success','','Download'))
    // getLyricsDiv.insertAdjacentElement('afterbegin',createGetLyricsButton('btn btn-success','get-lyrics-button','Get Lyrics'))
    // songInformationDiv.insertAdjacentElement('afterend',getLyricsDiv);
    // songInformationDiv.insertAdjacentElement('afterend',getLyricsDiv);



};

function createDiv(className) {
        let divElemet = document.createElement('div');

        divElemet.className = className;
        return divElemet;
        // document.body.appendChild(div);
    //
    // let element = document.getElementById("myDIV");
    // element.classList.add("mystyle");
    // div.id = 'container';
    // div.innerHTML = 'Hi there!';
}
function createH3(className,idName,value) {
    let h3Elemet = document.createElement('H3');
    h3Elemet.className = className;
    h3Elemet.id=idName;
    h3Elemet.innerText=value
    return h3Elemet;
}
function createP(className,idName,value) {
    let pElemet = document.createElement('p');
    // let span=document.createElement('span');
    // span.innerText='Washed Out'
    // pElemet.appendChild(span);
    pElemet.className = className;
    pElemet.id=idName;
    pElemet.innerText=value
    return pElemet;
}
function createGetLyricsButton(className,idName,value) {
    let buttonElemet = document.createElement('button');
    buttonElemet.className = className;
    buttonElemet.id=idName;
    buttonElemet.style.marginBottom='8px'
    buttonElemet.innerText=value;
    // buttonElemet.onclick=function (event) {
    //     console.log('hi')
    //     console.log(idName.artist.name);
    // }
    return buttonElemet;
}
function createImageElemet(className,idName,hrefValue) {


    // let span = document.createElement('span');
    // span.innerText='artist picture'
    // buttonElemet.appendChild(span);
    let buttonElemet = document.createElement('img');
    buttonElemet.style.maxWidth='100px';
    buttonElemet.style.maxHeight='100px';
    buttonElemet.className = className;
    buttonElemet.id=idName;
    buttonElemet.innerText='sdfadsf';
    buttonElemet.src=hrefValue
    return buttonElemet;
}
function createArtistName(className,idName,value) {
    let pElemet = document.createElement('p');
    // let span=document.createElement('span');
    // span.innerText='Washed Out'
    // pElemet.appendChild(span);
    pElemet.className = className;
    pElemet.style.display='inline-block';
    pElemet.style.marginRight='16px';
    pElemet.id=idName;
    pElemet.innerText=value
    return pElemet;
}
function customAlert() {
    let js_name = ['lyrics not found', 'lyrics not found']

    for (let i = 0; i < js_name.length; i++) {
        alert(js_name[i]);
    }
}