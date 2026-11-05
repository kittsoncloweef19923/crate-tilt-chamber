/**
 * PauseModal — native modal over the chamber. Resume / restart / leave.
 */
import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { LogOut, Play, RotateCcw } from 'lucide-react-native';
import theme from '../constants/theme';
import { BTN_W } from '../constants/config';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

interface Props {
  visible: boolean;
  chamberId: number;
  moves: number;
  par: number;
  onResume: () => void;
  onRestart: () => void;
  onQuit: () => void;
}

function PauseModal({
  visible,
  chamberId,
  moves,
  par,
  onResume,
  onRestart,
  onQuit,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onResume}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.kicker}>PAUSED</Text>
          <Text style={styles.title}>{'CHAMBER ' + chamberId}</Text>
          <Text style={styles.meta}>
            {'MOVES ' + moves + '  ·  PAR ' + par}
          </Text>

          <View style={styles.actions}>
            <PrimaryButton
              label="RESUME"
              Icon={Play}
              onPress={onResume}
              width={BTN_W - 48}
            />
            <SecondaryButton
              label="RESTART CHAMBER"
              Icon={RotateCcw}
              onPress={onRestart}
              width={BTN_W - 48}
            />
            <SecondaryButton
              label="WAREHOUSE"
              Icon={LogOut}
              onPress={onQuit}
              tone={theme.colors.text.secondary}
              width={BTN_W - 48}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(4, 13, 11, 0.90)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    alignItems: 'center',
    paddingVertical: 26,
    paddingHorizontal: 20,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.neon.cyan + '44',
    backgroundColor: theme.colors.bg.secondary,
    shadowColor: theme.colors.neon.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 16,
  },
  kicker: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '800',
    letterSpacing: 3,
    color: theme.colors.neon.cyan,
  },
  title: {
    marginTop: 8,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '900',
    letterSpacing: 1,
    color: theme.colors.text.primary,
  },
  meta: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
    letterSpacing: 1.4,
    color: theme.colors.text.secondary,
  },
  actions: {
    marginTop: 22,
    gap: 12,
  },
});

export default React.memo(PauseModal);
