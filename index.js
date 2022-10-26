function changed(type){
  console.log(type)
  if(type.value === 'Imgur'){
    new Imgur({
      path: document.getElementById('mainForm')
    })
  }
  type.disabled = true;
}

function clearForm(){
  let hostPick = document.getElementById('hostPick');
  hostPick.reset();
  hostPick.children[0].disabled = false;
  let info = document.getElementById('info');
  info.replaceChildren();
  document.getElementById('mainForm').replaceChildren();
  info.textContent='Пожалуйста, выберите хоста.';
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
      text: 'Введите ID пользователя (Client ID)',
      complete: 'off',
      required: true
    })

    new Input({
      path: this.main,
      type: 'submit',
      id: 'idSubmit'
    })

    document.getElementById('info').replaceChildren()
    new List({
      path: document.getElementById('info'),
      text: `Отлично, теперь зайдите <a href='https://api.imgur.com/oauth2/addclient'>сюда</a>, и создайте новое приложение заполнив форму, испрользуя подсказки ниже:`,
      arr: [
        'Application name - имя вашего приложения. Назовите как сами того желаете, не суть.',
        'Authorization type - выберите <b>OAuth 2 authorization with a callback URL</b>',
        `Authorization callback URL - введите адрес ${document.location.href}callback/imgur выделив и скопировав его, или же нажав <button onclick='navigator.clipboard.writeText(document.location.href+"callback/imgur")'>сюда</button>, и тогда этот адрес скопируется в ваш буфер обмена`,
        'Email - введите какую-либо почту. В идеале, от вашего Imgur аккаунта, наверное.']
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


class List{
  constructor({path, text, arr}){
    this.main=document.createElement('ul');
    this.main.innerHTML=text;
    path.append(this.main);

    this.list=arr.forEach(e => {
      new Li(this.main, e)
    })
  }
}
class Li{
  constructor(path, text){
    this.li=document.createElement('li');
    this.li.innerHTML=text;
    path.appendChild(this.li);
  }
}
