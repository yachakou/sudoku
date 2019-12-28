export class Case {
    public aAfficher = true;
    public ligne: Set<Case>;
    public colonne: Set<Case>;
    public care: Set<Case>;
    public peutEtreRemplie = false;



    constructor(public positionX: number, public positionY: number, public valeur: number) {
    }

    public hide() {
        this.aAfficher = false;
    }
}
