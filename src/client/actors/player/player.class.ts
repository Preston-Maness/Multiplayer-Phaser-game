
import { PhaserSpaceGame } from "../../engine/phaser-engine.class";

export class Player 
{
    public player: Phaser.Sprite;
    public projectile: Projectile;
    public controls: KeyBoardControl;
    public playerState: Map<string, boolean | number>;
    public angularVelocity: number = 300;
    constructor(private gameInstance: any, public playerInstance: any)
    {
        this.createPlayer(this.gameInstance);
        this.playerState = new Map();
    }
 public createPlayer(gameInstance): void {
    this.addControls();
    this.player = gameInstance.add.sprite(
        100, 100, 'shooter-sprite');
    this.player.id = "1";
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('accelerating', [1, 0], 60, false);
    this.player.name = "your name";
    this.attachPhysics(gameInstance);
}
public assignPickup(game, player?): void
{
    this.projectile = new Projectile(game, player.player);
    this.playerState.set('ammo', this.projectile.bulletCount);
}
public view(): void
{
    this.controls.update();
}
private addControls(): void
{
    this.controls = new KeyboardControl(this.gameInstance, this);
}
private attachPhysics(gameInstance): void
{
    gameInstance.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.setTo(10, 10);
    this.player.body.gravity.y = 0;
    this.player.body.drag.set(80);
    this.player.body.maxVelocity.set(100);
    this.player.body.immovable = false;
}
}
import {Player} from '../actors/player/player.class';
declare const window: any;
export class Game
{
    private actors: Array;
    private actor: Player;
    protected manageAssets(game): void
    {
        this.actors = [];
        this.actor = new Player(game);
    }
    protected gameUpdate(game): void
    {
        if (this.actor && this.actor.controls)
        {
            this.actor.view();
        }
    }
    protected properties(game): void
    {
        game.stage.disableVisibilityChange = true;
        game.add.tileSprite(0, 0, game.width, game.height, 'space');
        game.add.sprite(0, 0, 'space');
        game.time.desiredFps = 60;
        game.renderer.clearBeforeRender = false;
        game.physics.startSystem(Phaser.Physics.ARCADE);
    }
}

