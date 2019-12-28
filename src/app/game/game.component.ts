import { Component, OnInit } from '@angular/core';
import { Case } from '../case';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private cases: Case[][];
  private casesArray: Case[] = [];

  private readonly MIN_VALUE: number = 0;
  private readonly MAX_VALUE: number = 9;
  private readonly DEFAULT_VALUE: number = 0;


  constructor() {

    this.cases = [];

    // on creer 9 cases 

    for (let x = this.MIN_VALUE; x < this.MAX_VALUE; x++) {
      this.cases[x] = [];
      for (let y = this.MIN_VALUE; y < this.MAX_VALUE; y++) {
        let a = new Case(x, y, this.DEFAULT_VALUE);
        this.cases[x][y] = a;
        this.casesArray.push(a);
      }
    }

    this.casesArray.forEach((c) => {
      c.ligne = this.determinerLigne(c);
      c.colonne = this.determinerColone(c);
      c.care = this.determinerCarre(c);

    });


    


    console.log(this.cases);


  }

   determinerLigne(c:Case): Set<Case>{

    let ligne = c.positionX;

    let resulat = new  Set<Case>();

    this.casesArray.forEach(element => {
      if((element.positionX == ligne)){
          resulat.add(element);
      }
    });
    resulat.delete(c);
    return resulat;
  }

  determinerColone(c:Case): Set<Case>{

    let colonne = c.positionY;

    let resulat = new  Set<Case>();

    this.casesArray.forEach(element => {
      if((element.positionY == colonne)){
          resulat.add(element);
      }
    });
    resulat.delete(c);
    return resulat;
  }

  
  determinerCarre(c:Case): Set<Case>{
    let resulat = new  Set<Case>();

    let colonne = c.positionY;
    let ligne = c.positionX;
    const taille = 3;
    const debutLigne = Math.floor(c.positionX / taille) * taille;
    const debutColonne = Math.floor(c.positionY / taille) * taille;

    for(let i=debutLigne;  i<debutLigne + taille; i++){
      for(let y=debutColonne;  y<debutColonne + taille; y++){
        resulat.add(this.cases[i][y]);
      }
    }

    resulat.delete(c);
    return resulat;
  }

  ngOnInit() {
  }

}
