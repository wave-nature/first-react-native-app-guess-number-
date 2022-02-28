import React, { Component, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/UI/Card";
import fontStyle from "../constants/fontFamil";
import BodyText from "../components/Fonts/BodyText";

const generateRandomBetween = function (min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);

  const random = Math.floor(Math.random() * (max - min)) + min; //gives random num between min and max

  if (random === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return random;
  }
};

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.randomNumber = generateRandomBetween(1, 100, this.props.userChoice);
    this.state = {
      randomNum: this.randomNumber,
      rounds: [this.randomNumber],
      deviceWidth: Dimensions.get("window").width,
      deviceHeight: Dimensions.get("window").height,
    };

    this.lowerValue = createRef();
    this.lowerValue.current = 1;
    this.higherValue = createRef();
    this.higherValue.current = 100;
  }

  componentDidUpdate(prevProp, prevState) {
    const { updateRounds } = this.props;
    if (this.state.rounds.length !== prevState.rounds.length) {
      if (this.state.randomNum === this.props.userChoice) {
        updateRounds(this.state.rounds.length);
      }
    }
  }

  nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && this.state.randomNum < this.props.userChoice) ||
      (direction === "greater" && this.state.randomNum > this.props.userChoice)
    ) {
      Alert.alert("You just lied", "Please use your mind!", [
        { text: "Close", style: "cancel" },
      ]);

      return;
    }
    if (direction === "lower") {
      this.higherValue.current = this.state.randomNum;
    } else this.lowerValue.current = this.state.randomNum;

    const nextGuess = generateRandomBetween(
      this.lowerValue.current,
      this.higherValue.current,
      this.state.randomNum
    );

    this.setState((prevState) => ({
      randomNum: nextGuess,
      rounds: [nextGuess, ...prevState.rounds],
    }));
  };

  layoutChanges = () => {
    this.setState({
      deviceWidth: Dimensions.get("window").width,
      deviceHeight: Dimensions.get("window").height,
    });
  };

  componentDidMount() {
    Dimensions.addEventListener("change", this.layoutChanges);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.layoutChanges);
  }

  render() {
    if (Dimensions.get("window").height < 450) {
      return (
        <View style={styles.screen}>
          <Text style={fontStyle.titleText}>Computer Guess</Text>
          <View style={styles.control}>
            <MainButton onPress={this.nextGuessHandler.bind(this, "lower")}>
              <Ionicons
                name="md-remove"
                size={Dimensions.get("window").width < 350 ? 12 : 24}
              />
            </MainButton>
            <NumberContainer>{this.state.randomNum}</NumberContainer>
            <MainButton onPress={this.nextGuessHandler.bind(this, "greater")}>
              <Ionicons
                name="md-add"
                size={Dimensions.get("window").width < 350 ? 12 : 24}
              />
            </MainButton>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              keyExtractor={(item) => item}
              data={this.state.rounds}
              renderItem={(listData) => (
                <View style={styles.guessContainer}>
                  <BodyText>
                    #{this.state.rounds.length - listData.index}
                  </BodyText>
                  <BodyText>{listData.item}</BodyText>
                </View>
              )}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.screen}>
        <Text style={fontStyle.titleText}>Computer Guess</Text>
        <NumberContainer>{this.state.randomNum}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton onPress={this.nextGuessHandler.bind(this, "lower")}>
            <Ionicons
              name="md-remove"
              size={Dimensions.get("window").width < 350 ? 12 : 24}
            />
          </MainButton>
          <MainButton onPress={this.nextGuessHandler.bind(this, "greater")}>
            <Ionicons
              name="md-add"
              size={Dimensions.get("window").width < 350 ? 12 : 24}
            />
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
            {this.state.rounds.map((round, i) => (
              <View style={styles.guessContainer} key={i}>
                <BodyText>#{this.state.rounds.length - i}</BodyText>
                <BodyText>{round}</BodyText>
              </View>
            ))}
          </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={this.state.rounds}
            renderItem={(listData) => (
              <View style={styles.guessContainer}>
                <BodyText>
                  #{this.state.rounds.length - listData.index}
                </BodyText>
                <BodyText>{listData.item}</BodyText>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  control: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 700 ? 20 : 2,
    width: 300,
    maxWidth: "80%",
  },
  guessContainer: {
    backgroundColor: "#d3d3d3",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: "100%",
  },
  guessNumber: {
    textAlign: "center",
  },
  listContainer: {
    width: "80%",
    flex: 1,
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default GameScreen;
