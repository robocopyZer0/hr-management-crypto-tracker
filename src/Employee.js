import uniqid from 'uniqid';
let data = JSON.parse(localStorage.getItem('data')) || [];
class Employee {
  constructor() {
    this.items = document.querySelector('.items');
    this.render();
  }
  render() {
    this.items.innerHTML = '';

    data.forEach((item) => {
      const list = document.createElement('ul');
      list.classList.add('list');

      this.createDomElements(item.id);
      this.ime.insertAdjacentHTML('afterbegin', item.ime);
      this.prezime.insertAdjacentHTML('afterbegin', item.prezime);
      this.email.insertAdjacentHTML('afterbegin', item.email);
      this.adresa.insertAdjacentHTML('afterbegin', item.adresa);
      this.brojMobitela.insertAdjacentHTML('afterbegin', item.brojMobitela);

      list.appendChild(this.ime);
      list.appendChild(this.prezime);
      list.appendChild(this.email);
      list.appendChild(this.adresa);
      list.appendChild(this.brojMobitela);

      this.items.appendChild(list);
    });
  }
  createDomElements(id) {
    this.ime = document.createElement('li');
    this.prezime = document.createElement('li');
    this.email = document.createElement('li');
    this.adresa = document.createElement('li');
    this.brojMobitela = document.createElement('li');

    this.edit = document.createElement('button');
    this.delete = document.createElement('button');

    this.edit.classList.add('btn-edit');
    this.delete.classList.add('btn-delete');

    this.delete.setAttribute('data-id', id);
    this.edit.setAttribute('data-id', id);

    this.edit.innerHTML = 'Edit';
    this.delete.innerHTML = 'Delete';

    this.brojMobitela.appendChild(this.delete);
    this.brojMobitela.appendChild(this.edit);
  }

}
