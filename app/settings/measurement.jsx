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
import { useUser } from "../../context/UserContext";
import Cluster, { ClusterItem } from "../../components/Cluster";

export default function Measurement() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleSave = (formData) => {
    router.back();
    if (formData.name.trim() === "") return;
    if (formData.name.trim() === user.name) return;
    setUser((prev) => ({ ...prev, name: formData.name.trim() }));
  };

  return (
    <ModalContent
      title="Measurement"
      onSubmit={handleSave}
      onClose={() => router.back()}
      initialFormData={{ name: user.name }}
      submitButtonText="Save Changes"
      cancelButtonText="Cancel"
      noInput
    >
      <Cluster>
        <ClusterItem text="Metric" />
      </Cluster>
    </ModalContent>
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
