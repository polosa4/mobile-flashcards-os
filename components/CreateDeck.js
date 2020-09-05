import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Title, Appbar, TextInput } from 'react-native-paper';
import { gray, green } from '../utils/colors'
import { connect } from "react-redux";
import { addDeck } from '../actions/index'
import { saveDeckTitleAS } from '../utils/api';
import { StackActions } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


class CreateDeck extends Component {
  state = {
    text: '',
    errorV: false
  }
  handleChange = text => {
    if (text.trim().length > 0) {
      this.setState(() => ({ errorV: false }));
    }
    this.setState({ text });
  };
  handleSubmit = () => {
    const { addDeck, navigation } = this.props;
    const { text, errorV } = this.state;
    if (text.trim().length === 0) {
      this.setState(() => ({ errorV: true }));
      Alert.alert('Alert', 'Please enter the deck name');
      return;
    }
    addDeck(text);
    saveDeckTitleAS(text);

    navigation.navigate('deckList')
    this.setState(() => ({ text: '' }));
  };


  render() {
    //console.log(this.props)
    return (
      <React.Fragment>
        <Appbar.Header>
          <Appbar.Content title="Create Deck" />
          <Appbar.Action icon={MORE_ICON} onPress={() => { }} />
        </Appbar.Header>
        <View style={styles.container}>
          <Title style={styles.counterHelper}>What is the title of your new deck?</Title>
          <TextInput
            style={styles.inputContainerStyle}
            label="Deck Title"
            placeholder="Start typing..."
            value={this.state.text}
            onChangeText={this.handleChange}
            error={this.state.errorV}
            left={
              <TextInput.Icon
                name="format-title"
                color={gray}
                onPress={() => {
                  changeIconColor('flatLeftIcon');
                }}
              />
            }
            right={<TextInput.Affix text="/100" />}
          />
        </View>
        <View style={styles.wrapper}>
          <Button
            mode="contained"
            icon="plus"
            onPress={this.handleSubmit}
            style={styles.button}
            color={green}
          >
            Create Deck
          </Button>
        </View>
      </React.Fragment>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    padding: 60,

  },
  helper: {
    flexShrink: 1,
  },
  counterHelper: {
    marginLeft: 10,
  },
  inputContainerStyle: {
    margin: 8,
  },
  fontSize: {
    fontSize: 32,
  },
  textArea: {
    height: 80,
  },
});

export default connect(
  null,
  { addDeck }
)(CreateDeck);
