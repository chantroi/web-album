const uploadButton = document.querySelector('#upload-btn');
const template = document.getElementById('upload-tpl').content.cloneNode(true);

function handleClick(event) {
    document.body.appendChild(template);
}

function closePopup(event) {
    document.getElementById('popup').remove();
}

function formSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('upload-form');
    form.submit();
}

uploadButton.addEventListener('click', handleClick);