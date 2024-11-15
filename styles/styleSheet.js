const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.bgColor,
    // backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30, // Adjust the distance from the bottom as needed
    right: 30, // Adjust the distance from the right as needed
  },
  button: {
    backgroundColor: colors.pColor, // Define your button's background color
    padding: 10,
    borderRadius: 5,
    // backgroundColor: colors.pColor,
  },
  buttonText: {
    // color: "white",
    fontSize: 16,
  },
});
