export interface Controls
{
    cursors: Phaser.CursorKeys;
    fireWeapon: Phaser.Key;
}
import {Player} from '../actors/player/player.class';
export class KeyboardControl
{
    public gameControls: Controls;
    constructor (private gameInstance: any, private playerInstance: Player)
    {
        this.gameControls = 
        {
            cursors: this.gameInstance.input.keyboard.createCursorKeys(),
            fireWeapon: this.gameInstance.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
        }
    }
    public update(): void
    {
        if (this.playerInstance.player.alive)
        {
            this.playerInstance.playerState.set('fire', false);
            const vel = this.playerInstance.angularVelocity;
            if (this.gameControls.cursors.up.isDown)
            {
                this.gameInstance.physics.arcade.accelerationFromRotation(this.playerInstance.player.rotation, 100, this.playerInstance.player.body.acceleration);
                this.playerInstance.player.animations.play('accelerating');
                this.playerInstance.playerState.set('moving', true);
            }
            else
            {
                this.playerInstance.playerState.set('moving', false);
            }
            if (this.gameControls.cursors.left.isDown)
            {
                this.playerInstance.player.body.angularVelocity = -vel;
            }
            else if (this.gameControls.cursors.right.isDown)
            {
                this.playerInstance.player.body.angularVelocity = vel
            }
            else
            {
                this.playerInstance.player.body.angularVelocity = 0;
            }
        }
    }
}