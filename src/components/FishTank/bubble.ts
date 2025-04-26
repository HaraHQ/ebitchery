export class Bubble extends Phaser.GameObjects.Text {
  private pulseTimer: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'O', {
      fontSize: '30px',
      color: '#FFFFFF',
      backgroundColor: 'rgba(0,0,0,0)',
    });
    this.setOrigin(0.5);
    scene.add.existing(this);

    this.pulseTimer = scene.time.addEvent({
      delay: 1500,
      loop: true,
      callback: () => {
        if (!this.scene || !this.active) return;

        this.setText('');
        scene.time.delayedCall(300, () => {
          if (!this.scene || !this.active) return;
          this.setText('O');
        });
      },
      callbackScope: this,
    });

    scene.tweens.add({
      targets: this,
      y: -50,
      alpha: 0,
      duration: 4000,
      ease: 'Linear',
      onComplete: () => {
        this.pulseTimer.remove();
        this.destroy();
      },
    });
  }
}
