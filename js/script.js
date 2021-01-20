async function getSongs(){
  const res = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
  const songs = await res.json()


  function cardMaker(element){

    // this takes the main element from the html for appending elements
    let main = document.getElementById('main');

    // this holds the individual albums
    let song = document.createElement('div');
    song.className = 'card';

    // this is the title of the album
    let title = document.createElement('h4'); 
    title.innerText = element["im:name"].label;

    // this is the image of the album
    let img1 = document.createElement('img'); 
    img1.src = element["im:image"][1].label;

    // this is the number of songs in the album
    let numb = document.createElement('p'); 
    numb.innerText = `${element["im:itemCount"].label} songs`;

    // this is the price of the album
    let price = document.createElement('p'); 
    price.innerText = `Album costs ${element["im:price"].label}`;

    // this is the type of track or product in the album
    let type = document.createElement('em'); 
    type.innerText = `This is a ${element["im:contentType"].attributes.label} ${element["im:contentType"]["im:contentType"].attributes.label}`;

    // this is the rights of distribution of thr album
    let rights = document.createElement('em'); 
    rights.innerText = element["rights"].label;

    // the name of the album
    let name = document.createElement('p'); 
    name.innerText = element["title"].label;

    // the artiste name for the album
    let artiste = document.createElement('p'); 
    artiste.innerText = 'Artist: '+element["im:artist"].label;

    // this is the link that takes you to itunes for the album
    let link = document.createElement('a'); 
    link.href = element["link"].attributes.href;
    link.innerText = 'View in itunes';
    link.setAttribute('target','_blank')

    // this is the link that takes you to itunes for the genre of the album
    let genre = document.createElement('a'); 
    genre.href = element["category"].attributes.scheme;
    genre.innerText = `Genre: ${element["category"].attributes.label}`;
    genre.setAttribute('target','_blank');

    // this is the release datre of the album
    let date = document.createElement('p'); 
    date.innerText = `Release date: ${element["im:releaseDate"].attributes.label}`;

    // this button opens or closes the read more secion of the song
    let btn = document.createElement('button');
    btn.innerText = "Read more";
    // adding an event listener to the button for the functionality
    btn.addEventListener('click', () => {
      btn.previousElementSibling.classList.toggle('more');
      if(btn.previousElementSibling.classList.contains('more')) btn.innerText = "Read More";
      if(!btn.previousElementSibling.classList.contains('more')) btn.innerText = "Show Less";
    })

    // this is the read more section
    let details = document.createElement('div');
    details.className = 'details';
    details.classList.toggle('more');

    // this is the image holder container
    let imgHolder = document.createElement('div');
    imgHolder.className = 'imgHolder';

  
  
    // all the elements are being appended to the main and card containers
    imgHolder.appendChild(img1)
    song.appendChild(imgHolder)
    song.appendChild(name)
    // song.appendChild(title)
    // song.appendChild(artiste)
    // details.appendChild(numb)
    // details.appendChild(price)
    //details.appendChild(type)
    // details.appendChild(link)
    // details.appendChild(genre)
    // details.appendChild(date)
    // details.appendChild(rights)
    //song.appendChild(details)
    //song.appendChild(btn)

    return song;
  }

  //running the function (** cardMaker **)
  songs.feed.entry.forEach(element => {
    main.appendChild(cardMaker(element))
  });
}

getSongs()