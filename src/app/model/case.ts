export class Case {
    public aAfficher = true;
    public ligne: Set<Case>;
    public colonne: Set<Case>;
    public care: Set<Case>;
    public estSelectionnee = false;
    public valeur: number;
    public highlighted: boolean = false;


    constructor(public positionX: number, public positionY: number) {
    }


    public hide() {
        this.aAfficher = false;
    }
}
