function changed(type){
  console.log(type)
  if(type === 'Imgur'){
    new Imgur({
      path: document.getElementById('mainForm')
    })
  }
}

class Imgur{
  constructor({path}){
    this.main=document.createElement('form');
    this.main.action='';
    this.main.method='dialog';
    this.main.id='hostPickForm';
    this.main.onsubmit=() => {
      if(this.main.children[0].children[0].value) window.location.assign(`https://api.imgur.com/oauth2/authorize?client_id=${this.main.children[0].children[0].value}&response_type=token&state=APPLICATION_STATE`)
    }
    path.appendChild(this.main);

    new Input({
      path: this.main,
      type: 'password',
      id: 'userID',
      text: 'Введите ID пользователя',
      complete: 'off',
      required: true
    })

    new Input({
      path: this.main,
      type: 'submit',
      id: 'idSubmit'
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
