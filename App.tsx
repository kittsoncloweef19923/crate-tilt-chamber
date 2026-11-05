/**
 * App — the screen state machine. No navigation library: each screen is a
 * conditional render, so leaving a screen unmounts it and a replayed chamber
 * always starts from a clean hook.
 *
 * Gameplay lives in src/game + src/hooks, never here.
 */
import React, { useCallback, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import theme from './src/constants/theme';
import { TOTAL_CHAMBERS } from './src/constants/config';
import LoaderScreen from './src/screens/LoaderScreen';
import MenuScreen from './src/screens/MenuScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';
import GuideScreen from './src/screens/GuideScreen';
import type { RoundResult } from './src/game/types';

type Screen = 'loader' | 'menu' | 'game' | 'gameover' | 'guide';

const EMPTY_RESULT: RoundResult = {
  cleared: false,
  chamberId: 1,
  moves: 0,
  par: 0,
  stars: 0,
};

const wrap = (id: number) => ((id - 1 + TOTAL_CHAMBERS) % TOTAL_CHAMBERS) + 1;

function App(): React.JSX.Element {
  const [screen, setScreen] = useState<Screen>('loader');
  const [level, setLevel] = useState(1);
  const [activeLevel, setActiveLevel] = useState(1);
  const [cleared, setCleared] = useState(0);
  const [streak, setStreak] = useState(0);
  const [result, setResult] = useState<RoundResult>(EMPTY_RESULT);

  const goMenu = useCallback(() => setScreen('menu'), []);
  const goGuide = useCallback(() => setScreen('guide'), []);

  const startLevel = useCallback((id: number) => {
    setActiveLevel(wrap(id));
    setScreen('game');
  }, []);

  const handlePlay = useCallback(() => {
    setActiveLevel(level);
    setScreen('game');
  }, [level]);

  const handleGameOver = useCallback((round: RoundResult) => {
    if (round.cleared) {
      setCleared(prev => Math.min(prev + 1, TOTAL_CHAMBERS));
      setStreak(prev => prev + 1);
      setLevel(prev => (prev === round.chamberId ? wrap(prev + 1) : prev));
    } else {
      setStreak(0);
    }
    setResult(round);
    setScreen('gameover');
  }, []);

  const handleReplay = useCallback(() => {
    setActiveLevel(result.chamberId);
    setScreen('game');
  }, [result.chamberId]);

  const handleNext = useCallback(() => {
    setActiveLevel(wrap(result.chamberId + 1));
    setScreen('game');
  }, [result.chamberId]);

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {screen === 'loader' ? <LoaderScreen onDone={goMenu} /> : null}

      {screen === 'menu' ? (
        <MenuScreen
          level={level}
          cleared={cleared}
          streak={streak}
          onPlay={handlePlay}
          onDaily={startLevel}
          onGuide={goGuide}
        />
      ) : null}

      {screen === 'guide' ? (
        <GuideScreen onBack={goMenu} onPlay={handlePlay} />
      ) : null}

      {screen === 'game' ? (
        <GameScreen
          level={activeLevel}
          onGameOver={handleGameOver}
          onExit={goMenu}
        />
      ) : null}

      {screen === 'gameover' ? (
        <GameOverScreen
          result={result}
          streak={streak}
          onPlayAgain={handleReplay}
          onNext={handleNext}
          onMenu={goMenu}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
});

export default App;
