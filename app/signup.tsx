import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import * as Yup from "yup";
import { useLanguage } from "../src/context/LanguageContext";

// مخطط التحقق من صحة الإدخال باستخدام Yup للمستخدم العادي
const RegularUserSchema = (t: any) =>
  Yup.object().shape({
    username: Yup.string()
      .min(3, t("signup.username_min"))
      .required(t("signup.username_required")),
    email: Yup.string()
      .email(t("signup.email_invalid"))
      .required(t("signup.email_required")),
    password: Yup.string()
      .min(6, t("signup.password_min"))
      .required(t("signup.password_required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("signup.passwords_must_match"))
      .required(t("signup.confirm_password_required")),
  });

// مخطط التحقق من صحة الإدخال باستخدام Yup للشركة
const CompanySchema = (t: any) =>
  Yup.object().shape({
    companyName: Yup.string()
      .min(3, t("signup.company_name_min"))
      .required(t("signup.company_name_required")),
    email: Yup.string()
      .email(t("signup.email_invalid"))
      .required(t("signup.email_required")),
    password: Yup.string()
      .min(6, t("signup.password_min"))
      .required(t("signup.password_required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("signup.passwords_must_match"))
      .required(t("signup.confirm_password_required")),
    address: Yup.string().required(t("signup.address_required")),
    businessRegNumber: Yup.string().required(
      t("signup.business_reg_number_required")
    ),
  });

const SignupScreen = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [isRTL, setIsRTL] = useState(language === "ar");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("user"); // user, company
  const [userType, setUserType] = useState("regular"); // regular, marketer
  const router = useRouter();
  const [balls] = useState(() => Array(5).fill(0).map(() => ({
    x: new Animated.Value(Math.random() * Dimensions.get('window').width),
    y: new Animated.Value(Math.random() * Dimensions.get('window').height),
    size: Math.random() * 50 + 50,
  })));

  useEffect(() => {
    setIsRTL(language === "ar");
  }, [language]);

  useEffect(() => {
    const animateBalls = () => {
      const animations = balls.map(ball => {
        return Animated.parallel([
          Animated.sequence([
            Animated.timing(ball.x, {
              toValue: Math.random() * Dimensions.get('window').width,
              duration: 5000 + Math.random() * 5000,
              useNativeDriver: true,
            }),
            Animated.timing(ball.x, {
              toValue: Math.random() * Dimensions.get('window').width,
              duration: 5000 + Math.random() * 5000,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(ball.y, {
              toValue: Math.random() * Dimensions.get('window').height,
              duration: 5000 + Math.random() * 5000,
              useNativeDriver: true,
            }),
            Animated.timing(ball.y, {
              toValue: Math.random() * Dimensions.get('window').height,
              duration: 5000 + Math.random() * 5000,
              useNativeDriver: true,
            }),
          ]),
        ]);
      });

      Animated.parallel(animations).start(() => animateBalls());
    };

    animateBalls();
  }, []);

  const getInitialValues = () => {
    if (accountType === "company") {
      return {
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        businessRegNumber: "",
      };
    } else {
      return {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    }
  };

  const getValidationSchema = (t: any) => {
    return accountType === "company" ? CompanySchema(t) : RegularUserSchema(t);
  };

 const handleSubmit = (values: any, { setSubmitting }: any) => {
  // تحديد نوع الحساب بناءً على userType
    if (accountType === "user") {
      if (userType === "regular") {
        values.accountType = "user";
      } else if (userType === "marketer") {
        values.accountType = "marketer";
      } else {
        values.accountType = "company";
      }
    }
  const accountTypeValue = userType ;

  // إنشاء كائن البيانات المرسلة مع إضافة accountType
  const signupData = {
    accountType: accountTypeValue, // إضافة accountType بناءً على userType
    ...values,
  };

  console.log("Signup Values:", signupData);
  setSubmitting(false);

  // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
  router.push({ pathname: "/signin" });
};
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, isRTL && { direction: "rtl" }]}>
          {balls.map((ball, index) => (
            <Animated.View
              key={index}
              style={[
                styles.ball,
                {
                  width: ball.size,
                  height: ball.size,
                  transform: [
                    { translateX: ball.x },
                    { translateY: ball.y },
                  ],
                  backgroundColor: `rgba(54, 199, 246, ${0.1 + index * 0.1})`,
                },
              ]}
            />
          ))}
          <View style={[styles.wrapper, styles.blurContainer]}>
            <Text style={styles.title}>{t("signup.title") }</Text>

            {/* اختيار نوع الحساب */}
            <View style={styles.accountTypeContainer}>
              <Text style={styles.accountTypeLabel}>
                {t("signup.account_type")}
              </Text>
              <View style={styles.accountTypeOptions}>
                <TouchableOpacity
                  style={[
                    styles.accountTypeButton,
                    accountType === "user" && styles.activeButton,
                  ]}
                  onPress={() => setAccountType("user")}
                >
                  <Text
                    style={[
                      styles.accountTypeButtonText,
                      accountType === "user" && styles.activeButtonText,
                    ]}
                  >
                    {t("signup.user_account") }
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.accountTypeButton,
                    accountType === "company" && styles.activeButton,
                  ]}
                  onPress={() => setAccountType("company")}
                >
                  <Text
                    style={[
                      styles.accountTypeButtonText,
                      accountType === "company" && styles.activeButtonText,
                    ]}
                  >
                    {t("signup.company_account") }
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* اختيار نوع المستخدم (يظهر فقط عند اختيار حساب مستخدم) */}
            {accountType === "user" && (
              <View style={styles.userTypeContainer}>
                <Text style={styles.userTypeLabel}>
                  {t("signup.user_type") }
                </Text>
                <View style={styles.userTypeOptions}>
                  <TouchableOpacity
                    style={[
                      styles.userTypeButton,
                      userType === "regular" && styles.activeButton,
                    ]}
                    onPress={() => setUserType("regular")}
                  >
                    <Text
                      style={[
                        styles.userTypeButtonText,
                        userType === "regular" && styles.activeButtonText,
                      ]}
                    >
                      {t("signup.regular_user") }
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.userTypeButton,
                      userType === "marketer" && styles.activeButton,
                    ]}
                    onPress={() => setUserType("marketer")}
                  >
                    <Text
                      style={[
                        styles.userTypeButtonText,
                        userType === "marketer" && styles.activeButtonText,
                      ]}
                    >
                      {t("signup.marketer") || "مسوق"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <Formik
              initialValues={getInitialValues()}
              validationSchema={getValidationSchema(t)}
              onSubmit={handleSubmit}
              enableReinitialize={true}
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
                <View
                  style={[styles.form, isRTL && { alignItems: "flex-end" }]}
                >
                  {/* حقول المستخدم العادي أو المسوق */}
                  {accountType === "user" && (
                    <>
                      {/* حقل اسم المستخدم */}
                      <View
                        style={[
                          styles.inputContainer,
                          isRTL && { flexDirection: "row-reverse" },
                        ]}
                      >
                        <Ionicons name="person-outline" size={20} color="#333" />
                        <TextInput
                          style={[
                            styles.input,
                            isRTL && { textAlign: "right" },
                          ]}
                          placeholder={t("signup.username") }
                          onChangeText={handleChange("username")}
                          onBlur={handleBlur("username")}
                          value={values.username}
                          autoCapitalize="none"
                        />
                      </View>
                      {touched.username && errors.username && (
                        <Text style={styles.errorText}>{errors.username}</Text>
                      )}
                    </>
                  )}

                  {/* حقول الشركة */}
                  {accountType === "company" && (
                    <>
                      {/* حقل اسم الشركة */}
                      <View
                        style={[
                          styles.inputContainer,
                          isRTL && { flexDirection: "row-reverse" },
                        ]}
                      >
                        <Ionicons name="business-outline" size={20} color="#333" />
                        <TextInput
                          style={[
                            styles.input,
                            isRTL && { textAlign: "right" },
                          ]}
                          placeholder={t("signup.company_name")}
                          onChangeText={handleChange("companyName")}
                          onBlur={handleBlur("companyName")}
                          value={values.companyName}
                        />
                      </View>
                      {touched.companyName && errors.companyName && (
                        <Text style={styles.errorText}>{errors.companyName}</Text>
                      )}
                    </>
                  )}

                  {/* حقل البريد الإلكتروني (مشترك) */}
                  <View
                    style={[
                      styles.inputContainer,
                      isRTL && { flexDirection: "row-reverse" },
                    ]}
                  >
                    <Ionicons name="mail-outline" size={20} color="#333" />
                    <TextInput
                      style={[styles.input, isRTL && { textAlign: "right" }]}
                      placeholder={t("signup.email")}
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

                  {/* حقل كلمة المرور (مشترك) */}
                  <View
                    style={[
                      styles.inputContainer,
                      isRTL && { flexDirection: "row-reverse" },
                    ]}
                  >
                    <Ionicons name="lock-closed-outline" size={20} color="#333" />
                    <TextInput
                      style={[styles.input, isRTL && { textAlign: "right" }]}
                      placeholder={t("signup.password") }
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

                  {/* حقل تأكيد كلمة المرور (مشترك) */}
                  <View
                    style={[
                      styles.inputContainer,
                      isRTL && { flexDirection: "row-reverse" },
                    ]}
                  >
                    <Ionicons name="lock-closed-outline" size={20} color="#333" />
                    <TextInput
                      style={[styles.input, isRTL && { textAlign: "right" }]}
                      placeholder={
                        t("signup.confirm_password") 
                      }
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.eyeIconContainer}
                    >
                      <Ionicons
                        name={
                          showConfirmPassword ? "eye-outline" : "eye-off-outline"
                        }
                        size={20}
                        color="#333"
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                  )}

                  {/* حقول إضافية للشركة */}
                  {accountType === "company" && (
                    <>
                      {/* حقل عنوان الشركة */}
                      <View
                        style={[
                          styles.inputContainer,
                          isRTL && { flexDirection: "row-reverse" },
                        ]}
                      >
                        <Ionicons name="location-outline" size={20} color="#333" />
                        <TextInput
                          style={[
                            styles.input,
                            isRTL && { textAlign: "right" },
                          ]}
                          placeholder={t("signup.company_address") }
                          onChangeText={handleChange("address")}
                          onBlur={handleBlur("address")}
                          value={values.address}
                        />
                      </View>
                      {touched.address && errors.address && (
                        <Text style={styles.errorText}>{errors.address}</Text>
                      )}

                      {/* حقل رقم السجل التجاري */}
                      <View
                        style={[
                          styles.inputContainer,
                          isRTL && { flexDirection: "row-reverse" },
                        ]}
                      >
                        <Ionicons name="document-outline" size={20} color="#333" />
                        <TextInput
                          style={[
                            styles.input,
                            isRTL && { textAlign: "right" },
                          ]}
                          placeholder={
                            t("signup.business_reg_number") 
                          }
                          onChangeText={handleChange("businessRegNumber")}
                          onBlur={handleBlur("businessRegNumber")}
                          value={values.businessRegNumber}
                        />
                      </View>
                      {touched.businessRegNumber && errors.businessRegNumber && (
                        <Text style={styles.errorText}>
                          {errors.businessRegNumber}
                        </Text>
                      )}
                    </>
                  )}

                  {/* زر التسجيل */}
                  <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => handleSubmit() }
                    disabled={isSubmitting}
                  >
                    <Text style={styles.signupButtonText}>
                      {t("signup.signup_button") }
                    </Text>
                  </TouchableOpacity>

                  {/* رابط تسجيل الدخول */}
                  <TouchableOpacity
                    onPress={() => router.push({ pathname: "/signin" })}
                  >
                    <Text style={styles.loginText}>
                      {t("signup.already_have_account")}
                      <Text style={styles.loginLink}>
                        {t("signup.login")}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f7fa",
    overflow: "hidden",
  },
  ball: {
    position: "absolute",
    borderRadius: 1000,
    opacity: 0.6,
  },
  wrapper: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    backdropFilter: "blur(10px)",
  },
  blurContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  accountTypeContainer: {
    marginBottom: 20,
  },
  accountTypeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  accountTypeOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accountTypeButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  activeButton: {
    backgroundColor: "#36C7F6",
    borderColor: "#36C7F6",
  },
  accountTypeButtonText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  activeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  userTypeContainer: {
    marginBottom: 20,
  },
  userTypeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  userTypeOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userTypeButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
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
    paddingVertical: 10,
  },
  eyeIconContainer: {
    padding: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginStart: 15,
    textAlign: "left",
  },
  signupButton: {
    backgroundColor: "#36C7F6",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  loginLink: {
    color: "#36C7F6",
    fontWeight: "bold",
    marginLeft: 5,
  },
  userTypeButtonText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
    },
});