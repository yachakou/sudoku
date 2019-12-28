export class Case {
    public aAfficher = true;
    public ligne:Set<Case>;
    public colonne:Set<Case>;
    public care:Set<Case>;

    constructor(public positionX: number, public positionY: number, public valeur: number) {
    }
}
