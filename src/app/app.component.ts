import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  url = 'https://api.thecatapi.com/v1/images/search';
  urlDog = 'https://api.thedogapi.com/v1/images/search';

  srcCats = '';
  srcDogs = '';

  loadingCat = false;
  loadingDog = false;

  catVotes = 0;
  dogVotes = 0;

  winner = '';

  catWinMsg = 'Cat Wins!';
  dogWinMsg = 'Dog Wins!';

  maxVotes = 10;

  disable = false;

  // ------ Cat section

  getTheCats() {
    this.loadingCat = true;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get(this.url, { headers }).subscribe((resp) => {
      this.srcCats = resp[0].url;
      this.loadingCat = false;
    });
  }

  catVoted() {
    if (this.disable) {
      return;
    }

    this.catVotes++;
    this.getTheCats();
    this.getTheDogs();
    this.score();
  }

  // ------ Dog section

  getTheDogs() {
    this.loadingDog = true;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get(this.urlDog, { headers }).subscribe((resp) => {
      this.srcDogs = resp[0].url;
      this.loadingDog = false;
    });
  }

  dogVoted() {
    if (this.disable) {
      return;
    }

    this.dogVotes++;
    this.getTheCats();
    this.getTheDogs();
    this.score();
  }

  // ------ results

  reset() {
    this.catVotes = 0;
    this.dogVotes = 0;
    this.disable = false;

    this.getTheCats();
    this.getTheDogs();
  }

  score() {
    if (this.catVotes === this.maxVotes) {
      this.winner = this.catWinMsg;
      this.disable = true;
    }

    if (this.dogVotes === this.maxVotes) {
      this.winner = this.dogWinMsg;
      this.disable = true;
    }

    if (this.catVotes < this.maxVotes && this.dogVotes < this.maxVotes) {
      this.winner = '';
    }
  }

  ngOnInit(): void {
    this.getTheCats();
    this.getTheDogs();
  }
}
