const listTpl = document.getElementById('list-tpl').content;
const itemTpl = document.getElementById('item-tpl').content;
const video = document.getElementById('video-tpl').content;
const popupItem = document.getElementById('popup-tpl').content;

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
            data.result.forEarch(item => {
                const itemTag = itemTpl.cloneNode(true);
                const link = itemTag.querySelector('a');
                link.textContent = item;
                link.href = item;
                This.appendChild(itemTag)
            })
        })
}