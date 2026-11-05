/**
 * index.ts — the ONLY place the Codex asset contract is referenced.
 * Never add a name that is not in this list; the file would not exist.
 */
export const assets = {
  bgGame: require('../../assets/bg_game.png'),
  logo: require('../../assets/logo.png'),
  iconHome: require('../../assets/icon_home.png'),
  iconPause: require('../../assets/icon_pause.png'),
  sprite1: require('../../assets/sprite_1.png'),
  sprite2: require('../../assets/sprite_2.png'),
  sprite3: require('../../assets/sprite_3.png'),
  sprite4: require('../../assets/sprite_4.png'),
  sprite5: require('../../assets/sprite_5.png'),
  buttonRect: require('../../assets/button_rect.png'),
  buttonRound: require('../../assets/button_round.png'),
};

/** sprite_1..sprite_4 are the crate faces, indexed by crate colour id. */
export const CRATE_SPRITES = [
  assets.sprite1,
  assets.sprite2,
  assets.sprite3,
  assets.sprite4,
];

/** sprite_5 is the floor pad plate. */
export const PAD_SPRITE = assets.sprite5;

export default assets;
