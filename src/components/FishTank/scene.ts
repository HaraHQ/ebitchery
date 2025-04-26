import { Bubble } from './bubble';
import { Fish, FishDetail, FishInfo } from './fish';

export class FishTankScene extends Phaser.Scene {
  fishSpeed: number = 5000;
  fishes: FishInfo[];
  onFishClick?: (details: FishDetail) => void;

  constructor(fishes: FishInfo[], onFishClick?: (details: FishDetail) => void) {
    super('FishTankScene');
    this.fishes = fishes;
    this.onFishClick = onFishClick;
  }

  init(data: { fishSpeed?: number }) {
    this.fishSpeed = data.fishSpeed ?? 5000;
  }

  preload() {
    this.load.image('face_left', '/face_left.png');
    this.load.image('face_right', '/face_right.png');
    this.load.image('talking_face_left', '/talking_face_left.png');
    this.load.image('talking_face_right', '/talking_face_right.png');
  }

  create() {
    // Pool background
    this.cameras.main.setBackgroundColor('#34a8eb');

    // Oxygen
    this.time.addEvent({
      delay: 250,
      loop: true,
      callback: () => {
        const x = Phaser.Math.Between(0, 300);
        new Bubble(this, x, 300);
      },
    });

    this.fishes.forEach(f => {
      const fish = new Fish(
        this,
        Phaser.Math.Between(50, 250),
        Phaser.Math.Between(100, 280),
        f.text,
        f.fishSpeed,
        f.details,
        this.onFishClick
      );
      this.add.existing(fish);
    });
  }
}
