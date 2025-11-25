import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RegistrationScreen({ navigation }) {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  // Validation state
  const [errors, setErrors] = useState({});

  // Regex for email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!name || name.length < 2) {
      newErrors.name = 'Name must contain at least 2 characters';
    }

    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password || password.length < 8 || !/[A-Za-z]/.test(password)) {
      newErrors.password =
        'Password must be at least 8 characters long and contain letters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Select photo
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status === 'denied') {
      Alert.alert(
        'Permission Needed',
        'Access to the file system is denied. Enable it in Settings and restart the app.'
      );
      return;
    }

    if (permission.status !== 'granted') return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  // Remove photo
  const removeImage = () => {
    setAvatar(null);
  };

  // Handle submit
  const handleSubmit = () => {
    const isValid = validate();
    if (isValid) {
      console.log('Fields are valid. Nothing happens (UI only).');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder} />
        )}

        <View style={styles.avatarButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
            <Text style={styles.iconText}>✏️</Text>
          </TouchableOpacity>

          {avatar && (
            <TouchableOpacity style={styles.iconButton} onPress={removeImage}>
              <Text style={styles.iconText}>🗑️</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Name */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/* Sign Up button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Go to Sign In */}
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.link}>Go To Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#111827',
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  placeholder: {
    width: 120,
    height: 120,
    backgroundColor: '#E5E7EB',
    borderRadius: 60,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  iconButton: {
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  iconText: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginTop: 12,
    color: '#111827',
  },
  error: {
    color: '#DC2626',
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    color: '#2563EB',
    fontSize: 16,
  },
});
