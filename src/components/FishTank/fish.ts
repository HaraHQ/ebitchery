export type FishInfo = {
  text: string[];
  fishSpeed: number;
  details: FishDetail;
};

export type FishDetail = {
  id: string;
  referral: string | null;
  name: string;
  age: number;
  tobrut: boolean;
  height: number;
  weight: number;
  race: string;
  size: string;
}

export class Fish extends Phaser.GameObjects.Container {
  sprite: Phaser.GameObjects.Image;
  bubble: Phaser.GameObjects.Container;
  bg: Phaser.GameObjects.Graphics;
  label: Phaser.GameObjects.Text;
  talking: boolean = false;
  direction: 'left' | 'right' = 'right';
  text: string[];
  fishSpeed: number;
  details: FishDetail;
  chat: string;
  private onFishClick?: (details: FishDetail) => void;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string[],
    fishSpeed: number,
    details: FishDetail,
    onFishClick?: (details: FishDetail) => void
  ) {
    super(scene, x, y);

    this.text = text.length > 0 ? text : ['gublug'];
    this.fishSpeed = fishSpeed || 5000;
    this.details = details;
    this.onFishClick = onFishClick;
    this.chat = '';

    // Fish Sprite
    this.sprite = scene.add.image(0, 0, 'face_right').setDisplaySize(35, 20);
    this.add(this.sprite);

    // Clickable
    this.setSize(35, 20);
    this.setInteractive({ useHandCursor: true });
    this.on('pointerdown', () => {
      if (this.onFishClick) {
        this.onFishClick(this.details);
      }
    });

    // Bubble setup
    this.bubble = scene.add.container(0, -40); // moved a bit higher
    this.bg = scene.add.graphics();
    this.label = scene.add.text(0, 0, '', {
      color: '#000',
      fontSize: '10px',
      align: 'center',
      wordWrap: { width: 150 }, // optional limit
    });
    this.label.setOrigin(0.5);

    this.bubble.add([this.bg, this.label]);
    this.bubble.setVisible(false);
    this.add(this.bubble);

    scene.add.existing(this);

    this.startMoving(scene);
    this.startTalking(scene);
    this.startBreathing(scene);
  }

  generateText() {
    const arr = this.text;
    const randomIndex = Phaser.Math.Between(0, arr.length - 1);
    const randomValue = arr[randomIndex];

    this.chat = randomValue;
    this.label.setText(this.chat);

    const paddingX = 6;
    const paddingY = 4;
    const width = this.label.width + paddingX * 2;
    const height = this.label.height + paddingY * 2;

    this.bg.clear();
    this.bg.fillStyle(0xffffff, 1);
    this.bg.fillRoundedRect(-width / 2, -height / 2, width, height, 10);

    // Center the triangle based on bubble
    this.bg.fillTriangle(
      0 - 5, height / 2, 
      0 + 5, height / 2, 
      0, height / 2 + 8
    );

    this.label.setPosition(0, 0);
  }

  startMoving(scene: Phaser.Scene) {
    scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const newX = Phaser.Math.Between(20, 280);
        this.direction = newX > this.x ? 'right' : 'left';
        this.sprite.setTexture(this.talking ? `talking_face_${this.direction}` : `face_${this.direction}`);
        scene.tweens.add({
          targets: this,
          x: newX,
          duration: (Math.abs(newX - this.x) / this.fishSpeed) * 1000,
          ease: 'Sine.easeInOut',
        });
      },
    });
  }

  startTalking(scene: Phaser.Scene) {
    scene.time.addEvent({
      delay: Phaser.Math.Between(3000, 5700),
      loop: true,
      callback: () => {
        this.generateText();
        this.talking = true;
        this.sprite.setTexture(`talking_face_${this.direction}`);
        this.bubble.setVisible(true);

        // POP ANIMATION
        this.bubble.setScale(0);
        scene.tweens.add({
          targets: this.bubble,
          scale: 1,
          duration: 150,
          ease: 'Back.easeOut',
        });

        scene.time.delayedCall(700, () => {
          this.talking = false;
          this.sprite.setTexture(`face_${this.direction}`);
          this.bubble.setVisible(false);
        });
      },
    });
  }

  startBreathing(scene: Phaser.Scene) {
    scene.time.addEvent({
      delay: Phaser.Math.Between(5500, 25000),
      loop: true,
      callback: () => {
        scene.tweens.add({
          targets: this,
          y: 0,
          duration: 700,
          ease: 'Sine.easeInOut',
          onComplete: () => {
            const newY = Phaser.Math.Between(100, 280);
            scene.tweens.add({
              targets: this,
              y: newY,
              duration: 1000,
              ease: 'Sine.easeInOut',
            });
          },
        });
      },
    });
  }
}
