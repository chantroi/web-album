const uploadButton = document.querySelector('#upload-btn');
const template = document.getElementById('upload-tpl').content.cloneNode(true);

function handleClick(event) {
    document.body.appendChild(template);
}

function closePopup(event) {
    document.getElementById('popup').remove();
}

uploadButton.addEventListener('click', handleClick);