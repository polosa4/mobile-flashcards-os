import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Avatar, Title, Appbar, Paragraph, Card } from 'react-native-paper';
import { connect } from "react-redux";
import { getInitialData } from '../actions/index';
//import PropTypes from 'prop-types';
//import { NavigationActions } from 'react-navigation';
//import type { StackNavigationProp } from '@react-navigation/stack';
//import { withNavigation } from 'react-navigation';
//import { useNavigation } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
//const navigation = useNavigation();

class DeckList extends Component {

    // static propTypes = {
    //     navigation: PropTypes.object.isRequired,
    //     //deck: PropTypes.object.isRequired
    // };
    componentDidMount() {
        this.props.getInitialData();
    }
    //const navigation = useNavigation();
    render() {
        const { decksData, navigation } = this.props

        //const navigation = useNavigation();
        console.log(this.props)
        return (
            <React.Fragment>
                <Appbar.Header>
                    <Appbar.Content title="Deck" subtitle={'Deck List'} />
                    <Appbar.Action icon="magnify" onPress={() => { }} />
                    <Appbar.Action icon={MORE_ICON} onPress={() => { }} />
                </Appbar.Header>
                <ScrollView>
                    {decksData.map((deck) => {
                        return (
                            <Card key={deck.title}
                                style={styles.card}
                                onPress={() =>
                                    navigation.navigate('DeckDetail', { title: deck.title, qCount: deck.qCount })
                                }
                            >
                                <Card.Content style={styles.content}>
                                    <Title >{deck.title}</Title>
                                    <Paragraph>
                                        {deck.qCount}{(deck.qCount === 1) ? " card" : " cards"}
                                    </Paragraph>
                                </Card.Content>
                            </Card>
                        );
                    })}
                </ScrollView>

            </React.Fragment>
        )
    }
};

function mapStateToProps(decks) {
    const decksData = Object.values(decks).map(deck => ({
        title: deck.title,
        qCount: deck.questions.length,
    }))
    return {
        decksData

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        margin: 8,
    },
});

export default connect(
    mapStateToProps, { getInitialData }
)(DeckList);