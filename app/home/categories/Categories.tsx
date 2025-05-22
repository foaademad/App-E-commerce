

import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../src/context/LanguageContext";
import { ChevronDown, X } from "lucide-react-native";

// بيانات الفئات
const categoriesData = [
  { id: 1, name: "All" },
  { id: 2, name: "Personal Care & Household Cleaning" },
  { id: 3, name: "Mother & Baby" },
  { id: 4, name: "Electronics" },
  { id: 5, name: "Fashion" },
  { id: 6, name: "Home & Kitchen" },
  { id: 7, name: "Beauty" },
  { id: 8, name: "Toys & Games" },
  { id: 9, name: "Sports & Outdoors" },
  { id: 10, name: "Automotive" },
  { id: 11, name: "Books & Stationery" },
  { id: 12, name: "Jewelry & Watches" },
];

// مكون عنصر الفئة
const CategoryItem = ({ item, isSelected, onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => onPress(item.id)}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginRight: 8,
        borderBottomWidth: isSelected ? 2 : 0,
        borderBottomColor: "#36c7f6",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Poppins-Medium",
          color: isSelected ? "#36c7f6" : "#666",
          textAlign: "center",
        }}
      >
        {t(item.name)}
      </Text>
    </TouchableOpacity>
  );
};

// مكون عنصر الفئة في المودال
const ModalCategoryItem = ({ item, onPress, isSelected }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => onPress(item.id)}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 8,
        backgroundColor: isSelected ? "#36c7f6" : "transparent",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Poppins-Medium",
          color: isSelected ? "#eee" : "#333",
        }}
      >
        {t(item.name)}
      </Text>
    </TouchableOpacity>
  );
};

// المكون الرئيسي للفئات
const Categories = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(1); // افتراضيًا الفئة "All" مختارة
  const [modalVisible, setModalVisible] = useState(false);

  const windowWidth = Dimensions.get("window").width;

  // معالج الضغط على الفئة
  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
    setModalVisible(false);
  };

  // معالج فتح وإغلاق المودال
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // عرض عنصر الفئة في القائمة الأفقية
  const renderCategoryItem = ({ item }) => (
    <CategoryItem
      item={item}
      isSelected={selectedCategory === item.id}
      onPress={handleCategoryPress}
    />
  );

  return (
    <View>
      {/* شريط الفئات الأفقي مع زر عرض الكل */}
      <View
        style={{
          flexDirection: language === "ar" ? "row-reverse" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: language === "ar" ? "row-reverse" : "row",
            flex: 1,
          }}
        >
          <FlatList
            data={categoriesData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCategoryItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: language === "ar" ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
 {/* see all text */}
        <TouchableOpacity
          onPress={toggleModal}
          style={{
            flexDirection: language === "ar" ? "row-reverse" : "row",
            alignItems: "center",
            paddingHorizontal: 0,
            paddingVertical: 0,
          }}
        >
         
          <Text
            style={{
              fontSize: 14,
              color: "#666",
              fontFamily: "Poppins-Medium",
              marginRight: language === "ar" ? 2 : 0,
              marginLeft: language === "ar" ? 0 : 2,
              // textShadowColor: "#eee", // White shadow color
              // textShadowOffset:
              //   language === "ar"
              //     ? { width: 2, height: 0 }
              //     : { width: -2, height: 0 }, // Right for ar, left for en
              // textShadowRadius: 4, // Blur radius for the shadow
            }}
          >
            {t("See All")}
          </Text>
          <ChevronDown size={16} color="#666" />
        </TouchableOpacity>
      </View>
      {/* خط رمادي فاصل أسفل شريط الفئات */}
      <View
        style={{
          height: 1,
          backgroundColor: "#eee",
        }}
      />

      {/* المودال لعرض كل الفئات */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={toggleModal}
        >
          <Pressable
            style={{
              width: windowWidth * 0.85,
              maxHeight: 400,
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 16,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins-SemiBold",
                  color: "#333",
                }}
              >
                {t("Categories")}
              </Text>
              <TouchableOpacity onPress={toggleModal}>
                <X size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 16,
              }}
            >
              {categoriesData.map((category) => (
                <ModalCategoryItem
                  key={category.id}
                  item={category}
                  isSelected={selectedCategory === category.id}
                  onPress={handleCategoryPress}
                />
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Categories;
