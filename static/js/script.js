const listTpl = document.getElementById('list-tpl').content;
const itemTpl = document.getElementById('item-tpl').content;
const popupItem = document.getElementById('popup-tpl').content;
const uploadButton = document.querySelector('#upload-btn');

function getFiles() {
    const This = document.getElementById('file-list');
    fetch('/s3/list')
        .then(response => {
            if (!response.ok) {
                throw new Error('Fetch Failed!');
            }
            return response.json();
        })
        .then(data => {
            data.result.forEach(item => {
                const itemTag = itemTpl.cloneNode(true);
                const link = itemTag.querySelector('a');
                link.textContent = item;
                link.href = item;
                This.appendChild(itemTag);
            });
        });
}

function onPlay(event) {
    event.preventDefault;
    const name = this.href;
    const popup = popupItem.cloneNode(true).getElementById('popup-item');
    const imageExt = ['.jpeg', '.png', '.jpg'];
    let playLink;
    fetch(`/s3/get?q=${name}`)
      .then(response => response.json())
      .then(data => {
          playLink = data.result;
      });
    
    if (name.endsWith('.mp4')) {
        const video = `<video href="${playLink}" controls></video>`;
        popup.appendChild(video);
    }
    if (imageExt.some(ext => name.endsWith(ext))) {
        const image = `<image src="${playLink}"></image>`;
        popup.appendChild(image);
    }
   if (name.endsWith('.mp3')) {
       const audio = `<audio src="${playLink}" controls></audio>`;
       popup.appendChild(audio);
   }
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