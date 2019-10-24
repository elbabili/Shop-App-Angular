import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users = [
        {username:'admin',password:'1234',roles:['ADMIN','USER']},
        {username:'aymene',password:'1234',roles:['USER']},
        {username:'maryam',password:'1234',roles:['USER']}
   ];

   public isAuthenticated:boolean = false;     //est authentifié ou pas
   public userAuthenticated = undefined;            //utilisateur authentifié
   public token:string;

  constructor() { }

  public login(username:string,password:string){
        this.isAuthenticated = false;
        this.userAuthenticated = undefined;
        this.users.forEach(usr=>{
            if(usr.username == username && usr.password == password){
                this.isAuthenticated = true;
                this.userAuthenticated = usr;
                this.token = btoa(JSON.stringify({username:usr.username , roles:usr.roles}));
            }
        })
  }

  public isAdmin(){
        if(this.userAuthenticated){
            if(this.userAuthenticated.roles.indexOf('ADMIN') > -1)   return true;
        }
        return false;
  }

  public saveAuthenticatedUser(){
        if(this.userAuthenticated){
            localStorage.setItem('authUser',this.token);
            //les données étant visible par tous, un encodage du token est réalisé ici en base 64
        }
  }

  public loadAuthenticatedUserFromLocalStorage(){
        let tok = localStorage.getItem('authUser');
        if(tok){
            let user = JSON.parse(atob(tok));
            this.userAuthenticated = user;
            this.isAuthenticated = true;
            this.token = tok;
        }
        else {
            this.userAuthenticated = undefined;
            this.isAuthenticated = false;
        }
  }

  public removeTokenFromLocalStorage(){   // dans le cas d'un logout, il faut retirer le token courant de LS
        localStorage.removeItem('authUser');
        //console.log('authentication / removeTokenFromLocalStorage / remove Item');
        this.isAuthenticated = false;
        this.userAuthenticated = undefined;
        this.token = undefined;
  }
}
