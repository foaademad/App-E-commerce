import { useLanguage } from '@/src/context/LanguageContext';
import { getCategoriesApi } from '@/src/store/api/categoryApi';
import { AppDispatch, RootState } from '@/src/store/store';
import { CategoryDto } from '@/src/store/utility/interfaces/categoryInterface';
import { ChevronRight, Folder, Search } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Easing,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';

// Main Categories Data


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

interface Subcategory {
  id: number;
  name: string;
  products: Product[];
}

interface Category {
  id: number;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

const ExploreScreen = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: RootState) => state.category);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [emptyCategoryId, setEmptyCategoryId] = useState<string | null>(null);
  const [parentStack, setParentStack] = useState<CategoryDto[]>([]);
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(getCategoriesApi());
  }, [dispatch]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(borderAnim, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  // دالة لإرجاع children لأي كاتيجوري
  const getChildren = (cat: CategoryDto) => cat.children || [];

  // دالة لإرجاع الكاتيجوري الرئيسية فقط
  const getMainCategories = () => categories.filter((cat) => cat.parentId === null);

  // دالة تبديل الفتح/الإغلاق
  const toggleExpand = (id: string, childrenCount: number) => {
    if (childrenCount === 0) {
      setEmptyCategoryId(id);
    } else {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
      );
    }
  };

  // زر Back: يرجع خطوة واحدة فقط (يغلق آخر كاتيجوري مفتوحة أو يزيل رسالة no products)
  const handleBack = () => {
    if (emptyCategoryId) {
      setEmptyCategoryId(null);
    } else {
      setExpandedIds((prev) => prev.slice(0, -1));
    }
  };

  // دالة عرض الكارد مع دعم التداخل والأنيميشن
  const renderCategoryTree = (category: CategoryDto, level = 0) => {
    const isExpanded = expandedIds.includes(category.id);
    const children = getChildren(category);
    // بوردر متحرك
    const borderWidth = isExpanded ? 2 : 0;
    const animatedBorder = isExpanded ? {
      borderWidth,
      borderColor: 'transparent',
      borderRadius: 22,
      overflow: 'hidden' as 'hidden',
    } : {};
    const rotate = isExpanded ? '90deg' : '0deg';
    return (
      <View key={category.id} style={{ marginLeft: level * 18, marginBottom: 14 }}>
        <Animated.View style={animatedBorder}>
          <TouchableOpacity
            style={{
              backgroundColor: '#f7fafd',
              borderRadius: 22,
              paddingVertical: 16,
              paddingHorizontal: 18,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#36c7f6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.13,
              shadowRadius: 12,
              elevation: 5,
              zIndex: 2,
            }}
            onPress={() => toggleExpand(category.id, children.length)}
            activeOpacity={0.7}
          >
            <View style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#e3f0fa',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 14,
            }}>
              <Folder size={22} color="#36c7f6" />
            </View>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#222', flex: 1, letterSpacing: 0.1 }} numberOfLines={1}>
              {language === 'ar' ? category.nameAr : category.nameEn}
            </Text>
            {(category.children && category.children.length >= 0) && (
              <ChevronRight size={22} color="#36c7f6" style={{ transform: [{ rotate }] , marginLeft: 8 }} />
            )}
          </TouchableOpacity>
        </Animated.View>
        <Collapsible collapsed={!isExpanded} align="top">
          <View style={{ marginTop: 8 }}>
            {children.length > 0 && children.map((child) => renderCategoryTree(child, level + 1))}
          </View>
        </Collapsible>
      </View>
    );
  };

  const mainCategories = getMainCategories();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: Platform.OS === 'ios' ? 48 : 16, paddingBottom: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
        
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 12, paddingHorizontal: 12, height: 44 }}>
          <TextInput
            style={{ flex: 1, fontSize: 15, color: '#333', textAlign: language === 'ar' ? 'right' : 'left' }}
            placeholder={t('Search products')}
            placeholderTextColor="#999"
          />
          <Search size={20} color="#666" style={{ marginRight: 8 }} />
        </View>
      </View>
      {/* قائمة الكاتيجوري الشجرية مع Drop Down أو رسالة No products */}
      {emptyCategoryId ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#888', fontSize: 18, marginBottom: 20 }}>
            {language === 'ar' ? 'لا يوجد منتجات' : 'No products'}
          </Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
          {mainCategories.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>{language === 'ar' ? 'لا يوجد منتجات' : 'No products'}</Text>
          ) : (
            mainCategories.map((cat) => renderCategoryTree(cat))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 48 : 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 12,
  },
  backIcon: {
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  categoriesGrid: {
    padding: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chevronIcon: {
    marginLeft: 8,
  },
  subcategoriesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  subcategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subcategoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subcategoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productsContainer: {
    padding: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36c7f6',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
});

export default ExploreScreen;