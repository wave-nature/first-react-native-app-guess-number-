import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/UI/Card";
import TitleText from "../components/Fonts/TitleText";
import BodyText from "../components/Fonts/BodyText";
import color from "../constants/color";
import MainButton from "../components/MainButton";

class GameOverScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.screen}>
          <TitleText style={styles.title}>Game Over</TitleText>
          <View style={styles.imageContainer}>
            {/* <Image
            style={styles.image}
            source={require("../assets/success.png")}
            resizeMode="cover"
          /> */}
            <Image
              style={styles.image}
              source={{
                uri: "https://media.istockphoto.com/photos/snowcapped-k2-peak-picture-id1288385045?b=1&k=20&m=1288385045&s=170667a&w=0&h=3M3ZRl1bxOGxcvmYZ-TOtuJ3idm0psm4c7GFba1TA5g=",
              }}
            />
          </View>
          <Card style={styles.card}>
            <BodyText>Total Rounds Taken</BodyText>
            <NumberContainer>{this.props.totalRounds}</NumberContainer>
            <BodyText style={styles.textContainer}>
              Your Phone took
              <Text style={styles.highlight}>
                {" "}
                {this.props.totalRounds}
              </Text>{" "}
              rounds. To guess the number{" "}
              <Text style={styles.highlight}>{this.props.userNumber}</Text>
            </BodyText>
            <MainButton onPress={this.props.restartGame}>
              Restart Game
            </MainButton>
          </Card>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 2,
  },
  card: {
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 40,
    width: 300,
    padding: 10,
    maxWidth: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
  imageContainer: {
    height: Dimensions.get("window").width * 0.6,
    width: Dimensions.get("window").width * 0.6,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "indigo",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 20,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: color.primary,
  },
  textContainer: {
    fontSize: Dimensions.get("window").height < 400 ? 10 : 15,
    marginVertical: 15,
  },
});

export default GameOverScreen;
