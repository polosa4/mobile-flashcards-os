import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import { Button, Title, Appbar, Paragraph, Surface } from 'react-native-paper';
import { red, green, gray } from '../utils/colors'
import { connect } from "react-redux";
import { removeDeck } from '../actions/index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { setLocalNotification, clearLocalNotification } from '../utils/helper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const Header = (props) => {
    return (

        <Appbar.Header>
            <Appbar.BackAction onPress={() => props.props.navigation.goBack()} />
            <Appbar.Content title="Quiz" />
            <Appbar.Action icon={MORE_ICON} onPress={() => { }} />
        </Appbar.Header>

    )
}

class Quiz extends Component {
    constructor() {
        super()
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        });

        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        });
    }
    state = {
        correctA: 0,
        incorrectA: 0,
        questionI: 0,
        quizDone: false,
        switchV: true,
        flipButtonText: 'Show Answer'

    }
    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
    }

    markQuestion(isCorrect) {
        this.setState((state, props) => {
            const updatedIndex = ++state.questionI;
            return {
                correctA: isCorrect ? ++state.correctA : state.correctA,
                questionI: updatedIndex,
                quizDone: props.deck.questions.length === updatedIndex
            }
        });
        this.value = 180;
        this.flipCard();
    }

    flipCard() {
        if (this.value >= 90) {

            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start();
            this.setState({ flipButtonText: "Show Answer" });
        } else {

            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start();
            this.setState({ flipButtonText: "Show Question" })
        }
    }
    restartQuiz() {
        this.setState({
            correctA: 0,
            questionI: 0,
            quizDone: false
        });
        this.value = 180;
        this.flipCard();
    }



    render() {
        const { questions } = this.props.deck;

        if (this.state.quizDone) {
            //this.setupNotificaitonForTomorrow();
            return this.rQDone();
        }
        else if (questions && questions.length) {
            return this.rQExists(questions);
        }
        else {
            return this.rNoQuestion();
        }

    }

    rQExists(questions) {

        const { questionI } = this.state;
        const totalQ = questions.length;

        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }
        return (
            <React.Fragment>
                <Header props={this.props} />
                <View >
                    <Paragraph style={styles.inputContainerStyle}>
                        {questionI + 1}/{totalQ}
                    </Paragraph>
                    <View >
                        <Animated.View style={[frontAnimatedStyle, { opacity: this.frontOpacity, borderRadius: 30 }]}>
                            <Surface style={styles.surface}>
                                <Title style={styles.counterHelper, styles.container}>{questions[questionI].question}</Title>
                            </Surface>
                        </Animated.View>
                        <Animated.View style={[backAnimatedStyle, styles.backView, { opacity: this.backOpacity, borderRadius: 30 }]}>
                            <Surface style={styles.surface}>
                                <Title style={styles.counterHelper, styles.container}>{questions[questionI].answer}</Title>
                            </Surface>

                        </Animated.View>
                    </View>
                </View >
                <View>

                    <Button style={styles.btn} onPress={() => this.flipCard()} transparent danger block >
                        <Text style={{ fontSize: 20, alignSelf: "flex-end" }}>{this.state.flipButtonText}</Text>
                    </Button>
                </View>

                <View style={styles.wrapper}>
                    <Button
                        mode="contained"
                        icon="plus"
                        onPress={() => this.markQuestion(true)}
                        style={styles.button}
                        color={green}
                    >
                        Correct
                </Button>
                    <Button
                        mode="outlined"
                        icon="plus"
                        onPress={() => this.markQuestion(false)}
                        style={styles.button}
                        color={red}
                    >
                        Incorrect
                </Button>
                </View>
            </React.Fragment >
        )
    }

    rNoQuestion() {
        return (
            <React.Fragment>
                <Header props={this.props} />

                <View >
                    <Text style={{ fontSize: 20, alignSelf: "center", marginLeft: 20, margin: 20, color: gray }}>Sorry, you cannot take a quiz because there are no cards in the deck.</Text>
                </View>

            </React.Fragment>
        );
    }

    rQDone() {
        return (
            <React.Fragment>
                <Header props={this.props} />

                <Surface style={styles.surface}>
                    <View>
                        <Text style={{ fontSize: 20, padding: 10, alignSelf: "center" }}>Quiz Completed</Text>

                        <AnimatedCircularProgress
                            size={200}
                            width={25}
                            fill={Math.round((this.state.correctA / this.props.deck.questions.length) * 100)}
                            backgroundColor={red}
                            tintColor='#a7c0cd'
                            arcSweepAngle={240}
                            rotation={240}
                            lineCap="round"
                            duration={1500}>
                            {
                                (fill) => (
                                    <Text style={{ fontSize: 14 }}>
                                        Your score is {Math.round((this.state.correctA / this.props.deck.questions.length) * 100)}%
                                    </Text>
                                )
                            }
                        </AnimatedCircularProgress>
                        <Text style={{ fontSize: 16, alignSelf: "center" }}>Total Cards: {this.state.questionI}</Text>
                        <Text style={{ fontSize: 16, padding: 5, alignSelf: "center" }}>Correct Answers: {this.state.correctA}</Text>
                    </View>
                </Surface>
                <View style={styles.wrapper}>
                    <Button
                        mode="contained"
                        icon="restart"
                        onPress={() => this.restartQuiz()}
                        style={styles.button}

                    >
                        Restart Quiz
                </Button>
                    <Button
                        mode="outlined"
                        icon="plus"
                        onPress={() => this.props.navigation.goBack()}
                        style={styles.button}
                        color={red}
                    >
                        Back to Deck
                </Button>
                </View>
            </React.Fragment>
        );
    }


};


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
)(Quiz);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    backView: {
        position: "absolute",
        top: 0
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
    helpersWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wrapper: {
        padding: 50,

    },
    button: {
        margin: 10,

    },
    inputContainerStyle: {
        marginLeft: 18,
        fontSize: 20,
        paddingTop: 15
    }

});