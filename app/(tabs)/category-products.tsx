import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getallProductByCategoryId } from '../../src/store/api/productApi';
import { RootState } from '../../src/store/store';
import { ProductDto } from '../../src/store/utility/interfaces/productInterface';

export default function CategoryProductsScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentCategory, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    // إذا لم يكن هناك كاتيجوري محدد، ارجع للصفحة السابقة
    if (!currentCategory) {
      router.back();
    }
  }, [currentCategory, router]);

  const handleProductPress = (product: ProductDto) => {
    if (product.id) {
      router.push(`/product/${product.id}`);
    }
  };

  const renderProduct = ({ item }: { item: ProductDto }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.mainPictureUrl || item.pictures?.[0]?.url }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>
          {item.price.convertedPrice}
        </Text>
        <Text style={styles.productBrand}>
          {item.brandName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#36c7f6" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading products: {typeof error === 'string' ? error : 'Unknown error occurred'}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            if (currentCategory) {
              const categoryId = currentCategory.categoryId;
              if (categoryId) {
                dispatch(getallProductByCategoryId(categoryId) as any);
              }
            }
          }}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentCategory) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No category selected</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {currentCategory.nameEn || currentCategory.name}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {currentCategory.products && currentCategory.products.length > 0 ? (
        <FlatList
          data={currentCategory.products}
          renderItem={renderProduct}
          keyExtractor={(item, index) => item.id || `product-${index}`}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="bag-outline" size={64} color="#666" />
          <Text style={styles.emptyText}>No products in this category</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#36c7f6',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#2c3e50',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#36c7f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
  productsList: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2c3e50',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#36c7f6',
    marginBottom: 2,
  },
  productBrand: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
}); 