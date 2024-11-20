import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../../styles/colors";
const ReusableDialog = ({
  isVisible,
  title,
  children,
  okayButtonText = "Okay",
  cancelButtonText = "Cancel",
  onClickOkay,
  onClickCancel,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClickCancel}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.dialogTitle}>{title}</Text>
          {children && <View style={styles.dialogContent}>{children}</View>}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.okayButton} onPress={onClickOkay}>
              <Text style={styles.buttonText}>{okayButtonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClickCancel}
            >
              <Text style={styles.buttonText}>{cancelButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReusableDialog;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#333",
    borderRadius: 16,
    padding: 20,
    width: "80%",
  },
  dialogTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  dialogContent: {
    fontSize: 16,
    color: "#fff",
    paddingBottom: 20,
    paddingTop: 10,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  okayButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.pColor,
    padding: 15,
    marginRight: 10,
    borderRadius: 4,
  },
  cancelButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.sColor,
    padding: 15,
    marginLeft: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
