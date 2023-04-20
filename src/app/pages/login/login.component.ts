import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private SpotifyService: SpotifyService, private router: Router) { }

  ngOnInit(): void {
    this.verifyUrlTokenCallback();
  }

  verifyUrlTokenCallback() {
    const token = this.SpotifyService.getTokenUrlCallback();
    
    if(!!token) {
      this.SpotifyService.defineAcessToken(token);
      this.router.navigate(['./player']);
    } 
  }

  openLoginPage(){
    console.log(this.SpotifyService.getUrlLogin())
  }
}
