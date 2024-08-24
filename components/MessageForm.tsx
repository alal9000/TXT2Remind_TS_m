import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import sendTwilioMessage from '../api/twilio';

const MessageForm = () => {
  // phone and message state
  const [phone, setPhone] = useState<string>('+61451558673');
  const [message, setMessage] = useState<string>('');

  // date picker state
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  // date picker functions
  const onChange = (e: any, selectedDate?: Date) => {
    setShow(false);

    setDate(new Date(selectedDate ?? new Date()));
    
  };

  const showMode = (modeToShow: 'date' | 'time') => {
    setShow(true);
    setMode(modeToShow);
  };

  // reset the form
  const reset = () => {
    setMessage('');
    setDate(new Date());
  };

  // form submission
  const handleSubmit = async () => {
    console.log('Phone Number:', phone);
    console.log('Message:', message);
    console.log('Datetime:', date);

    const sendAt = date.toISOString();

    try {
      await sendTwilioMessage(phone, message, sendAt);
      Alert.alert('Success', 'Message sent successfully.');
      reset();
    } catch (error) {
      Alert.alert('Error', 'Failed to send message.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Phone number"
        keyboardType="phone-pad"
        onChangeText={setPhone}
        value={phone}
      />
      <TextInput
        style={[styles.textInput, styles.body]}
        placeholder="Message Body"
        multiline
        onChangeText={setMessage}
        value={message}
      />
      <Text>Date: {date.toLocaleDateString()}</Text>
      <Text>Time: {date.toLocaleTimeString()}</Text>
      <Button title="Show Date Picker" onPress={() => showMode('date')} />
      <View style={styles.button}>
        <Button title="Show Time Picker" onPress={() => showMode('time')} />
      </View>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <View style={styles.button}>
        <Button title="Reset" onPress={reset} />
      </View>
      <View style={styles.button}>
        <Button title="Send" onPress={handleSubmit} color="green" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  textInput: {
    borderBottomWidth: 1,
    marginBottom: 10
  },
  button: {
    marginTop: 20
  },
  body: {
    height: 100
  }
});

export default MessageForm;