angular.
  module('myApp').
  service('UsersService', ['$http',
    function($http) {
      this._users = new Array(5).fill(0).map((user, index) => {
        return {
          "id": index,
          "username": "username_" + index,
          "firstName": "firstName_" + index,
          "lastName": "lastName_" + index,
          "email": "email@mail.com",
          "type": "Administrator",
          "password1": "qweqweqwe1",
          "password2": "qweqweqwe1"
        }
      });

      console.info('UsersService', this);
      this.getUsers = () => this._users;
      this.getUser = (id) => this._users.find(u => u.id === id);
      this.createUser = (data) => {
        const id = Number((Math.random() * 1000).toFixed());
        data.id = id;
        this._users.push(data);
      }
      this.updateUser = (id, data) => {
        const index = this._users.findIndex(u => u.id === id);
        data.id = id;
        this._users[index] = data;
      }
      this.deleteUser = (id) => {
        const index = this._users.findIndex(u => u.id === id);
        this._users.splice(index, 1);
        console.log('del', id, index, this._users, this);
      }
    }
  ]);
