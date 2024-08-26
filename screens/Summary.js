import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const Summary = () => {
  const formData = useSelector((state) => state.form);

  return (
    <SafeAreaView style={styles.safeArea}>
            <View style={styles.testContainer}>
        <Text style={styles.testText}>Test</Text>
      </View>
      <View style={styles.summaryContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Checkout Form</Text>
          <View style={styles.separator} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Booking Id:</Text>
            <Text style={styles.detail}>XXXX22YYZ</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>First Name:</Text>
            <Text style={styles.detail}>{formData.firstName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Last Name:</Text>
            <Text style={styles.detail}>{formData.lastName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.detail}>{formData.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.detail}>{formData.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.detail}>{formData.time}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#B9B5AB',
    marginVertical: 10,
  },
  summaryContainer: {
    backgroundColor: '#f9f9f9',
    elevation: 1, // Adds a subtle shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 1 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 1, // Shadow radius for iOS
    padding: 20,
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
    flex: 1,
    textAlign: 'right', // Aligns the detail text to the right
  },
  testContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  testText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default Summary;
