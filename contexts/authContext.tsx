import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true); // ✅ prevents redirect flicker
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // ✅ load Firestore profile
        await updateUserData(firebaseUser.uid);
        router.replace("/(tabs)");
      } else {
        setUser(null);
        router.replace("/(auth)/welcome");
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await updateUserData(user.uid); // ✅ get full profile
      router.replace("/(tabs)");
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      console.log("error message", msg);
      if (msg.includes("(auth/invalid-credential)")) msg = "Wrong Credentials";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      return { success: false, msg };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", response.user.uid), {
        name,
        email,
        uid: response.user.uid,
        image: null,
      });
      await updateUserData(response.user.uid); // ✅ sync profile
      router.replace("/(tabs)");
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/email-already-in-use)")) msg = "This email is already in use";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      console.log("error message", msg);
      return { success: false, msg };
    }
  };

  const showLogoutAlert = () => {

    Alert.alert("Confirm", "Are you sure you want to logout?", [
      {
        text: 'Cancel',
        onPress: () => console.log("cancel logout"),
        style: "cancel"
      },
      {
        text: 'Confirm',
        onPress: () => logout,
        style: "destructive",
      }
    ])

  }

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.replace("/(auth)/welcome");
    } catch (error: any) {
      console.error("Logout error:", error.message);
    }
  };

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid,
          email: data?.email || null,
          name: data?.name || null,
          image: data?.image || null,
        };
        setUser(userData);
      }
    } catch (error: any) {
      console.log("updateUserData error:", error.message);
    }
  };

  const contextValues: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
    logout,
    showLogoutAlert
  };

  if (loading) return null; // ✅ avoid rendering before auth state ready

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be wrapped inside AuthProvider");
  return context;
};
