import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import ModalContent from "../../components/ModalContent";

export default function EditName() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSave = () => {
    // TODO: Implement save functionality
    router.back();
  };

  return (
    <ModalContent
      title="Change Name"
      onSubmit={handleSave}
      onClose={() => router.back()}
      initialFormData={{ name: "Dotjs" }}
      submitButtonText="Save Changes"
      cancelButtonText="Cancel"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
