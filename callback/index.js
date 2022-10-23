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
  let form = document.getElementById('form');
  let a = [{access:form.children[0].children[0].value, refresh:form.children[1].children[0].value, album:form.children[2].children[0].value, host:form.children[3].children[0].value}]
  // console.log(a);
  if(a) navigator.clipboard.writetext(a).then(res => {
    console.log('Скопировано, десу.');
  })
};


class Imgur{
  constructor({path}){
    this.main=document.createElement('form');
    this.main.id='hostPickForm';
    path.appendChild(this.form);

    this.imgur=[
      {
        path: this.main,
        type: 'password',
        id: 'access',
        text: 'Access token',
        required: true
      },
      {
        path: this.main,
        type: 'password',
        id: 'refresh',
        text: 'Refresh token',
        required: true
      },
      {
        path: this.main,
        type: 'password',
        id: 'album',
        text: 'Album id',
        required: true
      }
    ].forEach(e => {
      new Input({
        path: e.path,
        type: e.type,
        id: e.id,
        text: e.text,
        required: e.required
      })
    })
  }
}
class Input{
  constructor({path, text, id, type, complete, required}){
    this.div=document.createElement('div');
    path.appendChild(this.div);
    
    this.input=document.createElement('input');
    this.input.className=name;
    this.input.id=id;
    this.input.type=type;
    complete ? this.input.autocomplete=complete : '';
    required ? this.input.setAttribute('required', '') : '';
    this.div.appendChild(this.input);

    this.label=document.createElement('label');
    this.label.textContent=text;
    this.div.appendChild(this.label);
  }
}
