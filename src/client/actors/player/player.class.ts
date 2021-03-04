import { PhaserSpaceGame } from "../../engine/phaser-engine.class";

export class Player 
{
    public player: Phaser.Sprite;
    public controls: KeyBoardControl;
    public playerState: Map<string, boolean | number>;
    public angularVelocity: number = 300;
    constructor(private gameInstance: Phaser.Game, public playerInstance: any)
    {
        this.createPlayer(this.gameInstance);
        this.playerInstance = playerInstance;
        this.playerState = new Map();
    }
    public createPlayer(): void {}
    public assignPickup(): void {}
    public view(): void {}
    private addControls(): void {}
    private attachPhysics(): void {}
}
public createPlayer(gameInstance): void {
    this.addControls();
    this.player = gameInstance.add.sprite(
        100, 100, 'shooter-sprite');
    this.player.anchor.setTo(0.5, 0.5);
    this.attachPhysics(gameInstance);
}
