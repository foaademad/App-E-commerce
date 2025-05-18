import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../src/context/LanguageContext";
import { Formik } from "formik";
import * as Yup from "yup";

// مخطط التحقق من صحة الإدخال باستخدام Yup
const LoginSchema = (t: any) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t("login.email_invalid"))
      .required(t("login.email_required")),
    password: Yup.string()
      .min(6, t("login.password_min"))
      .required(t("login.password_required")),
  });

type Props = {};
const LoginScreen = (props: Props) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [isRTL, setIsRTL] = useState(language === "ar");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsRTL(language === "ar");
  }, [language]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, isRTL && { direction: "rtl" }]}>
        <View style={styles.wrapper}>
          <Text style={[styles.title]}>{t("login.title")}</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema(t)}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Login Values:", values);
              setSubmitting(false);
              // إعادة توجيه المستخدم إلى الصفحة الرئيسية
              router.push({ pathname: "/(tabs)" });
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={[styles.form, isRTL && { alignItems: "flex-end" }]}>
                {/* Email Input */}
                <View
                  style={[
                    styles.inputContainer,
                    isRTL && { flexDirection: "row-reverse" },
                  ]}
                >
                  <Ionicons name="mail-outline" size={20} color="#333" />
                  <TextInput
                    style={[styles.input, isRTL && { textAlign: "right" }]}
                    placeholder={t("login.email")}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                {/* Password Input */}
                <View
                  style={[
                    styles.inputContainer,
                    isRTL && { flexDirection: "row-reverse" },
                  ]}
                >
                  <Ionicons name="lock-closed-outline" size={20} color="#333" />
                  <TextInput
                    style={[styles.input, isRTL && { textAlign: "right" }]}
                    placeholder={t("login.password")}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIconContainer}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#333"
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Forgot Password */}
                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={[styles.forgotText, isRTL && { textAlign: "right" }]}
                  >
                    {t("login.forgot_password")}
                  </Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                >
                  <Text style={styles.loginButtonText}>
                    {t("login.login_button")}
                  </Text>
                </TouchableOpacity>

                {/* Create Account Link */}
                <TouchableOpacity
                  onPress={() => router.push({ pathname: "/signup" })}
                >
                  <Text style={[styles.signupText]}>
                    {t("login.dont_have_account")}
                    <Text style={styles.signupLink}>{t("login.sign_up")}</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  wrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingVertical: 10,
    marginBottom: 10,
    width: "100%",
  },
  socialButtonText: {
    marginLeft: 10,
    color: "#333",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    color: "#666",
    marginVertical: 10,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 51,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  eyeIconContainer: {
    padding: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
  },
  forgotText: {
    color: "#36C7F6",
    fontSize: 14,
    textAlign: "right",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#36C7F6",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    
  },
  signupLink: {
    color: "#36C7F6",
    fontWeight: "bold",
    marginLeft: 5,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    
  },
});