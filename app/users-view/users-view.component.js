angular.
  module('myApp').
  component('usersView', {
    templateUrl: 'users-view/users-view.template.html',
    controller: ['$location', '$route', '$routeParams', 'UsersService', 'MessagesService',
      function PhoneListController($location, $route, $routeParams, UsersService, MessagesService) {
        this.users = [];
        this.selectedUserId = null;
        this.selectedUser = null;
        this.formMode = 0; // 0 hide, 1 create, 2 edit
        this.formUsernameBlacklist = [];
        this.formData = {
          username: null,
          firstName: null,
          lastName: null,
          email: null,
          type: null,
          password1: null,
          password2: null
        };

        console.info(this);
            this.users = UsersService.getUsers();
            this.selectedUserId = Number($routeParams.id);
            if (this.selectedUserId !== null) {
              this.selectedUser = UsersService.getUser(this.selectedUserId);
              if (this.selectedUser) {
                this.formMode = 2;
                for (k in this.formData) {
                  this.formData[k] = this.selectedUser[k];
                }
                this.formUsernameBlacklist = this.users.filter(u => u.id !== this.selectedUserId).map(u => u.username);
              } else {
                if (Number($routeParams.create)) {
                  this.formMode = 1;
                  this.formUsernameBlacklist = this.users.map(u => u.username);
                } else {
                  this.formMode = 0;
                }
              }
            } else {
              this.formMode = 0;
            }

        this.closeForm = () => {
          this.formMode = 0;
          $location.path(`users/`).search({ create: 0 });
        }
        this.selectUser = (user) => {
          $location.path(`users/${user.id}/`).search({ create: 0 });
        }
        this.onCreateUserClick = () => {
          $location.path(`users/`).search({ create: 1 });
        }
        this.deleteUser = () => {
          UsersService.deleteUser(this.selectedUserId);
          this.users = UsersService.getUsers();
          MessagesService.showMessage(0, `User ${this.selectedUserId} deleted`);
          this.closeForm();
        }
        this.formSubmit = () => {
          const valid = Object.values(this.formData).every(v => !!v);
          console.log(this.formMode, this.formData)
          if (valid) {
            switch (this.formMode) {
              case 1: 
                UsersService.createUser(this.formData);
                MessagesService.showMessage(0, `User created`);
                break;
              case 2:
                UsersService.updateUser(this.selectedUserId, this.formData);
                MessagesService.showMessage(0, `User ${this.selectedUserId} updated`);
                break;
            }
            this.users = UsersService.getUsers();
            this.closeForm();
          } else {
            MessagesService.showMessage(1, `Form is invalid`);
          }
        }
      }
    ]
  });
