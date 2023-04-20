import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify  from 'spotify-web-api-js';
import { IUser } from '../interfaces/IUser';
import { SpotifyUserForUser } from '../Common/spotifyHelper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor() { 
    this.spotifyApi = new Spotify();
  }

  async initializeUser() {
    if(!!this.user)
      return true;

    const token = localStorage.getItem('token');

    if(!token)
      return false

      try {
        this.defineAcessToken(token);
        await this.getSpotityUser()
        return !!this.user;

      } catch(ex) {
        return false
      }
  }

  async getSpotityUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUserForUser(userInfo);
  }

  getUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType
  }

  getTokenUrlCallback() {
    console.log(window.location.hash)
    if(!window.location.hash) {
      return '';
    }

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  defineAcessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token)
  }

}
