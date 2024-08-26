import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CountdownTimer = ({ onExpire }) => {
  // Initial countdown time set to 1 hour (3600 seconds)
  const [secondsLeft, setSecondsLeft] = useState(3600);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setExpired(true);
            onExpire();
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [secondsLeft, onExpire]);

  const formatTime = () => {
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = formatTime();

  return (
    <View style={styles.container}>
      <Text style={styles.sessionEndText}>Your Session will end in:</Text>
      <View style={styles.timerRow}>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>{hours}</Text>
          <Text style={styles.labelText}>Hours</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>{minutes}</Text>
          <Text style={styles.labelText}>Mins</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>{seconds}</Text>
          <Text style={styles.labelText}>Secs</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  sessionEndText: {
    fontSize: 16,
    marginBottom: 10,
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E05D5D',
  },
  timeBox: {
   
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  labelText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  colon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 5,
  },
  expired: {
    color: 'red',
  },

});

export default CountdownTimer;
