import { ChevronDown, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../../src/context/LanguageContext";
import { getCategoriesApi } from "../../../src/store/api/categoryApi";
import { AppDispatch, RootState } from "../../../src/store/store";
import { CategoryDto } from "../../../src/store/utility/interfaces/categoryInterface";

// مكون عنصر الفئة
const CategoryItem = ({
  item,
  isSelected,
  onPress,
}: {
  item: CategoryDto;
  isSelected: boolean;
  onPress: (id: string) => void;
}) => {
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
        {t(item.nameEn)}
      </Text>
    </TouchableOpacity>
  );
};

// مكون عنصر الفئة في المودال
const ModalCategoryItem = ({
  item,
  onPress,
  isSelected,
}: {
  item: CategoryDto;
  onPress: (id: string) => void;
  isSelected: boolean;
}) => {
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
        {t(item.nameEn)}
      </Text>
    </TouchableOpacity>
  );
};

// المكون الرئيسي للفئات
const Categories = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: RootState) => state.category);

  // استخراج جميع الأبناء (subcategories) من جميع الكاتيجوري الرئيسية
  const subCategories: CategoryDto[] = categories
    .filter((cat) => cat.parentId === null)
    .flatMap((cat) => cat.children || []);

  // إضافة خيار ALL في البداية
  const allCategory = { id: 'all', nameEn: 'All' } as CategoryDto;
  const categoriesWithAll = [allCategory, ...subCategories];

  
  // افتراضياً ALL هي المختارة
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalVisible, setModalVisible] = useState(false);

  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    dispatch(getCategoriesApi());
  }, [dispatch]);

  // معالج الضغط على الفئة
  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setModalVisible(false);
  };

  // معالج فتح وإغلاق المودال
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // عرض عنصر الفئة في القائمة الأفقية
  const renderCategoryItem = ({ item }: { item: CategoryDto }) => (
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
            data={categoriesWithAll}
            keyExtractor={(item) => item.id}
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
              {categoriesWithAll.map((category) => (
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