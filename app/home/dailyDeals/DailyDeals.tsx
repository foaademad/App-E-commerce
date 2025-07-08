import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../../../components/products/ProductCard';
import api from '../../../src/store/utility/api/api';
import { ProductDto } from '../../../src/store/utility/interfaces/productInterface';

const CATEGORY_IDS = [
  'otc-49',
  'otc-50',
  'abb-10048',
  'otc-51',
  'abb-10054',
  'abb-1031607',
  'abb-1031633',
  'abb-1033898',
  'abb-124022010',
  'abb-1336',
  'abb-201301601',
  'abb-10112',
  'abb-1045423',
  'abb-345',
];

export default function DailyDeals() {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState<{
    categoryId: string;
    name?: string;
    loading: boolean;
    error?: string;
    products: ProductDto[];
  }[]>([]);

  useEffect(() => {
    setCategoriesData(
      CATEGORY_IDS.map((id) => ({ categoryId: id, loading: true, products: [] }))
    );
    CATEGORY_IDS.forEach(async (categoryId, idx) => {
      try {
        const response = await api.get(`/Product/getalltocatgeory?categoryId=${categoryId}&page=1&pageSize=20`);
        let products: ProductDto[] = [];
        let name = '';
        if (response && response.data && response.data.result) {
          if (Array.isArray(response.data.result)) {
            products = response.data.result;
          } else {
            products = response.data.result.products || [];
            name = response.data.result.category?.nameEn || response.data.result.category?.name || '';
          }
        }
        setCategoriesData(prev => prev.map((cat, i) =>
          i === idx ? { ...cat, loading: false, products, name } : cat
        ));
      } catch (err: any) {
        setCategoriesData(prev => prev.map((cat, i) =>
          i === idx ? { ...cat, loading: false, error: err?.message || 'Error loading products', products: [] } : cat
        ));
      }
    });
  }, []);

  const handleProductPress = (product: ProductDto) => {
    router.push(`/product/${product.id}` as any);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Daily Deals</Text>
      {categoriesData.map((cat, idx) => (
        <View key={cat.categoryId} style={styles.categorySection}>
        
          {cat.loading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="small" color="#36c7f6" />
              <Text style={styles.loadingText}>Loading products...</Text>
            </View>
          ) : cat.error ? (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={18} color="#e74c3c" />
              <Text style={styles.errorText}>{cat.error}</Text>
            </View>
          ) : cat.products.length === 0 ? (
            <View style={styles.emptyRow}>
              <Ionicons name="bag-outline" size={18} color="#36c7f6" />
              <Text style={styles.emptyText}>No products available</Text>
            </View>
          ) : (
            <View style={styles.productsGrid}>
              {cat.products.map((product, i) => (
                <View key={product.id} style={styles.productWrapper}>
                  <ProductCard product={product} onPress={() => handleProductPress(product)} />
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'left',
  },
  categorySection: {
    marginBottom: 28,
    paddingHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#36c7f6',
    marginBottom: 10,
    marginLeft: 4,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingLeft: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingLeft: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#e74c3c',
    marginLeft: 8,
  },
  emptyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingLeft: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingLeft: 10,
  },
  productWrapper: {
    width: '48%',
    marginBottom: 14,
  },
});
