import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/UI/Card";

class GameOverScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Game Over</Text>
        <Card style={styles.card}>
          <Text>Total Rounds Taken</Text>
          <NumberContainer>{this.props.totalRounds}</NumberContainer>
          <Text>Your Number was: {this.props.userNumber}</Text>
          <Button onPress={this.props.restartGame} title="Restart Game" />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  card: {
    alignItems: "center",
    marginTop: 20,
    width: 300,
    padding: 20,
    maxWidth: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
});

export default GameOverScreen;
