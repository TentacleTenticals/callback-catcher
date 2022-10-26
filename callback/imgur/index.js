function callbackReceiver(){
  let imgurUrlFilter = /.+\?.+access_token=([^&]+).+refresh_token=([^&]+)&.+/gm;
  // alert('Runned, desu!');
  if(document.location.href.match(imgurUrlFilter)){
    document.location.href.replace(imgurUrlFilter, (def, access, refresh) => {
      let form = document.getElementById('form');
      access ? form.children[0].children[0].value = access : '';
      refresh ? form.children[1].children[0].value = refresh : '';
    })
  }
};
function sendData(){
  let time = luxon.DateTime;
  let form = document.getElementById('form');
  let a = [{access:form.children[0].children[0].value, refresh:form.children[1].children[0].value, time:time.local().setZone('Europe/Moscow').toISO(), album:form.children[2].children[0].value, host:'Imgur'}]
  // console.log(a);
  if(a) navigator.clipboard.writeText(JSON.stringify(a)).then(res => {
    console.log('Скопировано, десу.');
  })
};

function createAlbum(){
  let form = document.getElementById('form');
  let albumForm = document.getElementById('albumForm');
  if(!form.children[0].children[0].value && !form.children[1].children[0].value) return;

  let formData = new FormData()
  formData.append("title", albumForm.children[0].children[0].value)
  formData.append("description", albumForm.children[1].children[0].value)
  fetch("https://api.imgur.com/3/album", {
    method: "post",
    headers: {
        Authorization: `Bearer ${form.children[0].children[0].value}`
    },
    body: formData
  }).then(data => data.json()).then(res => {
    if(res.status === 200){
      form.children[2].children[0].value = res.data.id;
      albumForm.parentNode.disabled = true;
    }else
    console.log(`Ошибка при создании альбома.`)
  })
}


class Imgur{
  constructor({path}){
    this.albumForm=document.createElement('form');
    this.albumForm.id='albumForm';
    path.appendChild(this.AlbumForm);

    this.albumFormItems=[
      {
        path: this.albumForm,
        type: 'text',
        id: 'albumName',
        text: 'Название альбома',
        required: true
      },
      {
        path: this.albumForm,
        type: 'text',
        id: 'albumDescription',
        text: 'Описание альбома',
        required: true
      },
      {
        path: this.albumForm,
        type: 'submit',
        id: 'submitAlbum',
        value: 'Создать альбом',
        required: true
      }
    ].forEach(e => {
      new Input({
        path: e.path,
        type: e.type,
        id: e.id,
        text: e.text,
        value: e.value,
        required: e.required
      })
    })
  }
}
class Input{
  constructor({path, text, id, type, value, complete, required}){
    this.div=document.createElement('div');
    path.appendChild(this.div);
    
    this.input=document.createElement('input');
    this.input.className=name;
    this.input.id=id;
    this.input.type=type;
    value ? this.input.value=value : '';
    complete ? this.input.autocomplete=complete : '';
    required ? this.input.setAttribute('required', '') : '';
    this.div.appendChild(this.input);

    this.label=document.createElement('label');
    this.label.textContent=text;
    this.div.appendChild(this.label);
  }
}
