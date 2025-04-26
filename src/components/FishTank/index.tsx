'use client';

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { FishTankScene } from './scene';
import { FishDetail, FishInfo } from './fish';

interface FishTankProps {
  fishSpeed?: number;
  onFishClick?: (details: FishDetail) => void;
  fishes: FishInfo[];
}

const FishTank: React.FC<FishTankProps> = ({ fishSpeed = 50, onFishClick, fishes }) => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let game: Phaser.Game;

    if (gameRef.current) {
      game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 300,
        height: 300,
        parent: gameRef.current,
        scene: [new FishTankScene(fishes, onFishClick)],
        transparent: false,
        physics: {
          default: 'arcade',
          arcade: { debug: false },
        },
      });

      game.scene.start('FishTankScene', { fishSpeed });
    }

    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, [fishSpeed, onFishClick, fishes]);

  return <div ref={gameRef} />;
};

export default FishTank;
