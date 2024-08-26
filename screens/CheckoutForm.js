import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from '../store';
import CountdownTimer from './component/CountdownTimer';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

const CheckoutForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const [errors, setErrors] = useState({});
  const [isExpired, setIsExpired] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formData.date ? new Date(formData.date) : new Date());
  const [selectedTime, setSelectedTime] = useState(formData.time ? new Date(formData.time) : new Date());

  const validate = () => {
    let valid = true;
    let tempErrors = {};

    if (!formData.firstName) {
      tempErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!formData.lastName) {
      tempErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Valid email is required';
      valid = false;
    }

    if (!formData.date) {
      tempErrors.date = 'Date is required';
      valid = false;
    }

    if (!formData.time) {
      tempErrors.time = 'Time is required';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      navigation.navigate('Summary');
    }
  };

  const handleInputChange = (field, value) => {
    dispatch(updateForm({ [field]: value }));
  };

  const handleExpire = () => {
    setIsExpired(true);
    Alert.alert('Session expired', 'Your session has expired.', [
      { text: 'OK' }
    ]);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      handleInputChange('date', selectedDate.toDateString()); // Set the date value in your form
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setSelectedTime(selectedTime);
      handleInputChange('time', selectedTime.toTimeString().split(' ')[0]); // Set the time value in your form
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.testContainer}>
        <Text style={styles.testText}>Test</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Checkout Form</Text>
          <CountdownTimer onExpire={handleExpire} />
          <View style={styles.separator} />
        </View>
       

        <View style={styles.testContainer}>
          <Text style={styles.testText}>PERSONAL INFO</Text>
        </View>

        <Text style={styles.lable}>First Name</Text>
        <TextInput
          value={formData.firstName}
          onChangeText={(value) => handleInputChange('firstName', value)}
          style={styles.input}
          editable={!isExpired}
          placeholder="First Name"
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

        <Text style={styles.lable}>Last Name</Text>
        <TextInput
          value={formData.lastName}
          onChangeText={(value) => handleInputChange('lastName', value)}
          style={styles.input}
          editable={!isExpired}
          placeholder="Last Name"
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

        <Text style={styles.lable}>Email</Text>
        <TextInput
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          style={styles.input}
          editable={!isExpired}
          placeholder="Email"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <View style={styles.testContainer}>
          <Text style={styles.testText}>BOOKING INFO</Text>
        </View>

        <Text style={styles.lable}>Date</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            value={selectedDate.toDateString()}
            editable={false}
          />
          <TouchableOpacity onPress={showDatePickerModal} style={styles.iconContainer}>
            <Icon name="calendar" size={20} color="#000" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

        <Text style={styles.lable}>Time</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            value={selectedTime.toTimeString().split(' ')[0]}
            editable={false}
          />
          <TouchableOpacity onPress={showTimePickerModal} style={styles.iconContainer}>
            <Icon name="clock-o" size={20} color="#000" />
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
        {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}


        <View style={{ width: '100%', height: 50, marginVertical: 10 }}>
          <Button title="Submit" onPress={handleSubmit} disabled={isExpired}
            color="#071523"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    borderWidth:1,
    borderColor:'#B9B5AB',
    backgroundColor:"white",
    marginHorizontal:10
  },
  testContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  testText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#B9B5AB',
    borderWidth: 1,
    marginBottom: 5,
    padding: 8,
    marginVertical: 5
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#B9B5AB',
    borderWidth: 1,
    padding: 8,
    marginBottom: 5,
    borderRadius: 5,
  },
  iconContainer: {
    marginLeft: 10,
  },
  lable: {
    marginTop: 10
  },
  headerContainer: {
    alignItems: 'center',
  
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  separator: {
    width: '120%',
    height: 1,
    backgroundColor: '#B9B5AB',
    marginVertical: 20,
  },
});

export default CheckoutForm;
