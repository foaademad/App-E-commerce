import { useLanguage } from '@/src/context/LanguageContext';
import { ChevronRight, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Main Categories Data
const mainCategories = [
  {
    id: 1,
    name: 'Electronics',
    icon: '🔌',
    subcategories: [
      {
        id: 101,
        name: 'Smartphones',
        products: [
          {
            id: 1001,
            name: 'iPhone 14 Pro',
            price: 999.99,
            image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
            rating: 4.8,
            reviews: 1234,
          },
          {
            id: 1002,
            name: 'Samsung Galaxy S23',
            price: 899.99,
            image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg',
            rating: 4.7,
            reviews: 856,
          },
        ],
      },
      {
        id: 102,
        name: 'Laptops',
        products: [
          {
            id: 1003,
            name: 'MacBook Pro M2',
            price: 1299.99,
            image: 'https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg',
            rating: 4.9,
            reviews: 2341,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Fashion',
    icon: '👕',
    subcategories: [
      {
        id: 201,
        name: 'Men\'s Clothing',
        products: [
          {
            id: 2001,
            name: 'Classic T-Shirt',
            price: 29.99,
            image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
            rating: 4.5,
            reviews: 432,
          },
        ],
      },
      {
        id: 202,
        name: 'Women\'s Clothing',
        products: [
          {
            id: 2002,
            name: 'Summer Dress',
            price: 49.99,
            image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg',
            rating: 4.6,
            reviews: 321,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Home',
    icon: '🏠',
    subcategories: [
      {
        id: 301,
        name: 'Furniture',
        products: [
          {
            id: 3001,
            name: 'Modern Sofa',
            price: 799.99,
            image: 'https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg',
            rating: 4.7,
            reviews: 567,
          },
        ],
      },
      {
        id: 302,
        name: 'Kitchen',
        products: [
          {
            id: 3002,
            name: 'Smart Coffee Maker',
            price: 129.99,
            image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
            rating: 4.4,
            reviews: 234,
          },
        ],
      },
    ],
  },
];

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryPress = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleBack = () => {
    if (selectedSubcategory) {
      setSelectedSubcategory(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    }
  };

  const renderMainCategories = () => (
    <View style={styles.categoriesGrid}>
      {mainCategories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryCard}
          onPress={() => handleCategoryPress(category)}
        >
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryEmoji}>{category.icon}</Text>
          </View>
          <Text style={styles.categoryName}>{category.name}</Text>
          <ChevronRight size={20} color="#666" style={styles.chevronIcon} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSubcategories = () => (
    <View style={styles.subcategoriesContainer}>
      <Text style={styles.sectionTitle}>{selectedCategory?.name}</Text>
      <View style={styles.subcategoriesGrid}>
        {selectedCategory?.subcategories.map((subcategory: any) => (
          <TouchableOpacity
            key={subcategory.id}
            style={styles.subcategoryCard}
            onPress={() => handleSubcategoryPress(subcategory)}
          >
            <Text style={styles.subcategoryName}>{subcategory.name}</Text>
            <Text style={styles.productCount}>
              {subcategory.products.length} Products
            </Text>
            <ChevronRight size={20} color="#666" style={styles.chevronIcon} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderProducts = () => (
    <View style={styles.productsContainer}>
      <Text style={styles.sectionTitle}>{selectedSubcategory?.name}</Text>
      <View style={styles.productsGrid}>
        {selectedSubcategory?.products.map((product: any) => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.productPrice}>${product.price}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>
                  ★ {product.rating} ({product.reviews})
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header with Search and Back Button */}
      <View style={styles.header}>
        {(selectedCategory || selectedSubcategory) && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ChevronRight
              size={24}
              color="#333"
              style={[
                styles.backIcon,
                { transform: [{ rotate: '180deg' }] },
              ]}
            />
          </TouchableOpacity>
        )}
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={[
              styles.searchInput,
              { textAlign: language === 'ar' ? 'right' : 'left' },
            ]}
            placeholder={t('Search products')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {selectedSubcategory
          ? renderProducts()
          : selectedCategory
          ? renderSubcategories()
          : renderMainCategories()}
      </ScrollView>
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