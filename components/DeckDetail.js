import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Button, Title, Appbar, TextInput, Paragraph, Surface } from 'react-native-paper';
import { gray, red, blue, green } from '../utils/colors'
import { connect } from "react-redux";
import { addDeck } from '../actions/index'
//import { NavigationActions } from 'react-navigation';
import StackNavigationProp from '@react-navigation/stack';
import { removeDeck } from '../actions/index';
import { removeDeckAS } from '../utils/api';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


class DeckDetail extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.deck !== undefined;
    }

    handleDelete = id => {
        const { removeDeck, navigation } = this.props;

        removeDeck(id);
        removeDeckAS(id);

        navigation.goBack();
    };


    render() {
        const { title } = this.props.route.params;
        const { deck } = this.props;
        return (
            <React.Fragment>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Deck Detail" />
                    <Appbar.Action icon={MORE_ICON} onPress={() => { }} />
                </Appbar.Header>
                <Surface style={styles.surface}>
                    <View style={styles.content, styles.container}>
                        <Title style={styles.counterHelper}>{title}</Title>
                        <Paragraph>
                            {deck ? deck.questions.length : 0}{(deck.questions.length === 1) ? " card" : " cards"}
                        </Paragraph>
                    </View>
                </Surface>
                <View style={styles.wrapper}>
                    <Button
                        mode="contained"
                        icon="plus"
                        onPress={() =>
                            this.props.navigation.navigate('AddCard', { title: title })
                        }
                        style={styles.button}
                        color={green}
                    >
                        Add Card
                    </Button>
                    <Button
                        mode="contained"
                        icon="clock-start"
                        onPress={() =>
                            this.props.navigation.navigate('Quiz', { title: title })}
                        style={styles.button}
                        color={blue}
                    >
                        Start Quiz
                    </Button>
                    <Button
                        mode="outlined"
                        icon="delete-circle-outline"
                        onPress={() => this.handleDelete(title)}
                        style={styles.button}
                        color={red}
                    >
                        Delete Deck
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
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    surface: {
        width: Dimensions.get("window").width - 40,
        backfaceVisibility: 'hidden',
        height: 300,
        padding: 20,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    wrapper: {
        padding: 60,

    },
    counterHelper: {
        marginLeft: 10,
    },
    button: {
        margin: 10
    }

});

const mapStateToProps = (state, { route }) => {
    const title = route.params.title;
    const deck = state[title];

    return {
        deck
    };
};

export default connect(
    mapStateToProps,
    { removeDeck }
)(DeckDetail);
