const uploadButton = document.querySelector('#upload-btn');

function getFiles() {
    fetch('/s3/list')
        .then(response => {
            if (!response.ok) {
                throw new Error('Fetch Failed!');
            }
            return response.json();
        })
        .then(data => {
            data.result.forEach(item => {
                const itemTag = ```
                <div id="list-item">
                  <a id="item-link" href="${item}">${item}</a>
                </div>
                ```;
                This.appendChild(itemTag);
            });
        });
}

function onPlay(event) {
    event.preventDefault;
    const name = this.href;
    const imageExt = ['.jpeg', '.png', '.jpg'];
    let playLink;
    let item;
    fetch(`/s3/get?q=${name}`)
      .then(response => response.json())
      .then(data => {
          playLink = data.result;
      });
    
    if (name.endsWith('.mp4')) {
        item = `<video href="${playLink}" controls></video>`;
    }
    if (imageExt.some(ext => name.endsWith(ext))) {
        item = `<image src="${playLink}"></image>`;
    }
   if (name.endsWith('.mp3')) {
       item = `<audio src="${playLink}" controls></audio>`;
   }
   const popup = ```
        <div id="popup">
          ${item}
        </div>
    ```;
   document.body.appendChild(popup);
}

function handleClick(event) {
    const template = document.getElementById('upload-tpl').content.cloneNode(true);
    document.body.appendChild(template);
}

function submitForm(event) {
    this.parentNode.submit();
}

function closePopup(event) {
    this.parentNode.remove();
}

uploadButton.addEventListener('click', handleClick);