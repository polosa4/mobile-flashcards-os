import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Title, Appbar, TextInput } from 'react-native-paper';
import { gray, green } from '../utils/colors'
import { connect } from "react-redux";
import { addDeck } from '../actions/index'
import { addCardToDeck } from '../actions/index';
import { addCardToDeckAS } from '../utils/api';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        errorA: false,
        errorQ: false
    }
    handleQuestionChange = question => {
        if (question.trim().length > 0) {
            this.setState(() => ({ errorQ: false }));
        }
        this.setState({ question });
    };
    handleAnswerChange = answer => {
        if (answer.trim().length > 0) {
            this.setState(() => ({ errorA: false }));
        }
        this.setState({ answer });
    };
    handleSubmit = () => {
        const { addCardToDeck, navigation } = this.props;
        const { title } = this.props.route.params;
        const { answer, question } = this.state;
        if (answer.trim().length === 0 || question.trim() === 0) {
            this.setState(() => ({
                errorA: true,
                errorQ: true
            }));
            Alert.alert('Alert', 'Please fill out all the forms');
            return;
        }
        const card = {
            question: this.state.question,
            answer: this.state.answer
        };

        addCardToDeck(title, card);
        addCardToDeckAS(title, card);

        this.setState({ question: '', answer: '' });
        navigation.goBack();
    };


    render() {
        return (
            <React.Fragment>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Add Card" />
                    <Appbar.Action icon={MORE_ICON} onPress={() => { }} />
                </Appbar.Header>
                <View style={styles.container}>
                    <Title style={styles.counterHelper}>Add a question</Title>
                    <TextInput
                        style={styles.inputContainerStyle}
                        label="Type a question"
                        placeholder="Start typing..."
                        value={this.state.question}
                        onChangeText={this.handleQuestionChange}
                        error={this.state.errorQ}
                        left={
                            <TextInput.Icon
                                name="map-marker-question"
                                color={gray}
                                onPress={() => {
                                    changeIconColor('flatLeftIcon');
                                }}
                            />
                        }
                        right={<TextInput.Affix text="/100" />}
                    />
                    <TextInput
                        style={styles.inputContainerStyle}
                        label="Type an answer"
                        placeholder="Start typing..."
                        value={this.state.answer}
                        onChangeText={this.handleAnswerChange}
                        error={this.state.errorA}
                        left={
                            <TextInput.Icon
                                name="forum"
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
                        Submit
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

    counterHelper: {
        marginLeft: 10,
    },
    inputContainerStyle: {
        margin: 8,
    },

});

export default connect(
    null,
    { addCardToDeck }
)(AddCard);
