import { TextInput, StyleSheet } from "react-native";

type InputProps = {
  placeholder: string;
  secureTextEntry?: boolean;
};

export default function Input({ placeholder, secureTextEntry }: InputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});
