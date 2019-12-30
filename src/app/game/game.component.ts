import { Component, OnInit, Input } from '@angular/core';
import { Case } from '../model/case';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private level: number;

  private cases: Case[][];
  private casesArray: Case[] = [];
  private valeurPossible: Set<number> = new Set<number>();


  private readonly MIN_VALUE: number = 0;
  private readonly MAX_VALUE: number = 9;
  private readonly DEFAULT_VALUE: number = 0;
  private caseSelectionne: Case;
  private nbErreurs: number = 0;


  constructor(private route: ActivatedRoute) {

    let id: number = this.route.snapshot.params['level'];
    this.level = id;

    this.cases = [];

    for (let x = 0; x < 9; x++) {
      this.cases[x] = [];
      for (let y = 0; y < 9; y++) {
        const a = new Case(x, y);
        this.cases[x][y] = a;
        this.casesArray.push(a);
      }
    }

    this.casesArray.forEach((c) => {
      c.ligne = this.determinerLigne(c);
      c.colonne = this.determinerColone(c);
      c.care = this.determinerCarre(c);
    });

    this.assignerValeursAuxCellule(this.casesArray.slice());

    this.cases.forEach((row) => {
      for (let i = 0; i < this.level; i++) {
        const cell = row[this.getRandomNumber(0, 9)];
        cell.hide();
        cell.aAfficher = false;
        this.valeurPossible.add(cell.valeur);
      }
    });

  }

  determinerLigne(c: Case): Set<Case> {
    const neighbors = new Set<Case>();
    this.cases[c.positionX].filter((s) => s !== c).forEach((v) => neighbors.add(v));
    return neighbors;
  }

  determinerColone(c: Case): Set<Case> {
    const neighbors = new Set<Case>();
    this.cases.forEach((row) => neighbors.add(row[c.positionY]));
    neighbors.delete(c);
    return neighbors;
  }

  determinerCarre(c: Case): Set<Case> {
    let resulat = new Set<Case>();
    const taille = 3;
    const debutLigne = Math.floor(c.positionX / taille) * taille;
    const debutColonne = Math.floor(c.positionY / taille) * taille;

    for (let i = debutLigne; i < debutLigne + taille; i++) {
      for (let y = debutColonne; y < debutColonne + taille; y++) {
        resulat.add(this.cases[i][y]);
      }
    }

    resulat.delete(c);
    return resulat;
  }

  assignerValeursAuxCellule(cellules: Case[]) {
    const cell = cellules.shift();
    const possibleValues = this.shuffleArray(this.getPossibleValuesForCell(cell));
 
    for (const value of possibleValues) {
      cell.valeur = value;

      if (cellules.length === 0) {
        return true;
      }

      if (this.assignerValeursAuxCellule(cellules)) {
        return true;
      }

      //cell.valeur = 0;

    }
    cellules.unshift(cell);
    return false;
  }


  private getPossibleValuesForCell(cell: Case): number[] {
    const possibleValues: number[] = [];
    for (let i = 1; i <= 9; i++) {
      possibleValues.push(i);
    }

    const neighborValues: number[] = [];
    cell.ligne.forEach((c) => neighborValues.push(c.valeur));
    cell.colonne.forEach((c) => neighborValues.push(c.valeur));
    cell.care.forEach((c) => neighborValues.push(c.valeur));

    neighborValues.forEach((value) => {
      const index = possibleValues.indexOf(value);
      if (index !== -1) {
        possibleValues.splice(index, 1);
      }
    });

    return possibleValues;
  }

  private shuffleArray(array: number[]): number[] {
    const _array = array.slice();

    for (let i = _array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [_array[i], _array[j]] = [_array[j], _array[i]];
    }

    return _array;
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * max + min);
  }

  ngOnInit() {
  }

  caseSelectionner(caseSelectionner: Case) {
    if (this.caseSelectionne) {
      this.caseSelectionne.estSelectionnee = false;
    }
    if (!caseSelectionner.aAfficher) {
      this.reinitialiserHighLight();
      
      for (let i = 0; i < this.cases.length; i++) {
          this.cases[caseSelectionner.positionX][i].highlighted = true;
          this.cases[i][caseSelectionner.positionY].highlighted = true;
      }
      
      caseSelectionner.estSelectionnee = !caseSelectionner.estSelectionnee;
      this.caseSelectionne = caseSelectionner;
    } 

  }

  reinitialiserHighLight(){

    for (let i = 0; i < this.cases.length; i++) {
      for (let y = 0; y < this.cases[i].length; y++) {
            this.cases[i][y].highlighted =false;
      }
    } 
  }

  valeurChoisi(n: number) {
    if (this.caseSelectionne) {
      if (this.caseSelectionne.valeur == n) {
        this.caseSelectionne.aAfficher = true;
        this.verifierSiNombreDoitEtreAfficher(n);
      } else {
        this.nbErreurs++;
      }
    }
  }


  verifierSiNombreDoitEtreAfficher(n: number) {
    let nbDispo = 0;
    this.casesArray.forEach((c) => {
      if (c.valeur == n && c.aAfficher) {
        nbDispo++;
      }
    });
    if (nbDispo == this.MAX_VALUE) {
      this.valeurPossible.delete(n);
    }
  }

}
