import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<any>({});

  // ------------------------------
  // VALIDATION
  // ------------------------------
  function validate() {
    const newErrors: any = {};

    if (!name || name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ------------------------------
  // PHOTO PICKER
  // ------------------------------
  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Access denied. Enable photos permission in Settings.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const img = result.assets?.[0];
      if (img?.uri) {
        setAvatar(img.uri);
      }
    }
  }

  // ------------------------------
  // SUBMIT HANDLER
  // ------------------------------
  function handleSubmit() {
    if (!validate()) return;

    // Нічого не робимо — по ТЗ логіки немає
  }

  // ------------------------------
  // RENDER
  // ------------------------------
  return (
   <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Create Account</Text>

      {/* Avatar picker */}
      <TouchableOpacity onPress={pickImage}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text>Select photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Name */}
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      {/* Email */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/* Password */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/* Submit */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Go to Sign In */}
      <TouchableOpacity onPress={() => router.push("/signin")}>
        <Text style={styles.link}>Go to Sign In</Text>
      </TouchableOpacity>
   </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 25 },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 20,
  },

  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: "#ddd",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },

  button: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#2636EB",
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: { marginTop: 20, textAlign: "center", color: "#2636EB", fontSize: 16 },
  error: { color: "red", marginTop: 4 },
});
