import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private SpotifyService: SpotifyService) { }

  openLoginPage(){
    console.log(this.SpotifyService.getUrlLogin())
  }
}
