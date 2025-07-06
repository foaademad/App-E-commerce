import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../src/store/api/productApi';
import { AppDispatch, RootState } from '../../src/store/store';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { currentProduct, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (id) dispatch(getProductById(id as string));
  }, [id]);

  console.log('Current product state:', currentProduct);

  if (loading) {
    return (
      <View style={styles.centered}><ActivityIndicator size="large" color="#36c7f6" /></View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}><Text style={styles.error}>{error}</Text></View>
    );
  }

  const product = currentProduct?.product;
  const vendor = currentProduct?.vendor;
  const vendorItems = currentProduct?.vendorItems;
  if (!product || (!product.id && !product.title)) {
    return (
      <View style={styles.centered}><Text style={styles.error}>لا توجد بيانات لهذا المنتج</Text></View>
    );
  }
  // Related products (flatten all relatedGroups)
  const relatedProducts = product.relatedGroups?.flatMap(g => g.items) || [];
  // Products from the same vendor (excluding this product)
  const vendorProducts = (vendorItems?.content || []).filter(p => p.id !== product.id);

  return (
    <ScrollView style={styles.container}>
      {/* Product Images */}
      <ScrollView horizontal pagingEnabled style={styles.imageSlider} showsHorizontalScrollIndicator={false}>
        {product.pictures?.length ? product.pictures.map((pic, idx) => (
          <Image key={idx} source={{ uri: pic.url }} style={styles.mainImage} resizeMode="cover" />
        )) : (
          <Image source={{ uri: product.mainPictureUrl }} style={styles.mainImage} resizeMode="cover" />
        )}
      </ScrollView>
      {/* Product Info */}
      <View style={styles.card}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price?.convertedPriceList?.internal?.sign} {product.price?.convertedPriceList?.internal?.price}</Text>
        <Text style={styles.usdPrice}>${product.price?.convertedPriceList?.displayedMoneys?.[0]?.price ?? '-'} USD</Text>
        <Text style={styles.label}>الوصف:</Text>
        <Text style={styles.desc}>{product.description}</Text>
        <Text style={styles.label}>العلامة التجارية: <Text style={styles.value}>{product.brandName}</Text></Text>
        <Text style={styles.label}>الوزن: <Text style={styles.value}>{product.physicalParameters?.weight ?? '-'} كجم</Text></Text>
        <Text style={styles.label}>الكمية المتوفرة: <Text style={styles.value}>{product.masterQuantity}</Text></Text>
        <Text style={styles.label}>البائع: <Text style={styles.value}>{product.vendorDisplayName || product.vendorName}</Text></Text>
      </View>
      {/* Vendor Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>معلومات البائع</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Image source={{ uri: vendor?.displayPictureUrl || vendor?.pictureUrl }} style={styles.vendorImage} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.vendorName}>{vendor?.displayName || vendor?.name}</Text>
            <Text style={styles.vendorScore}>مستوى: {vendor?.credit?.level} | تقييم: {vendor?.credit?.score}</Text>
          </View>
        </View>
        <Text style={styles.vendorLabel}>البريد الإلكتروني: <Text style={styles.value}>{vendor?.email || '-'}</Text></Text>
        <Text style={styles.vendorLabel}>الموقع: <Text style={styles.value}>{vendor?.location?.state || '-'}</Text></Text>
      </View>
      {/* Products from the same vendor */}
      {vendorProducts.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>منتجات من نفس البائع</Text>
          <FlatList
            data={vendorProducts}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.relatedCard} onPress={() => router.push(`/product/${item.id}`)}>
                <Image source={{ uri: item.mainPictureUrl }} style={styles.relatedImage} />
                <Text style={styles.relatedTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.relatedPrice}>{item.price?.convertedPriceList?.internal?.sign} {item.price?.convertedPriceList?.internal?.price}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>منتجات مرتبطة</Text>
          <FlatList
            data={relatedProducts}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.relatedCard} onPress={() => router.push(`/product/${item.id}`)}>
                <Image source={{ uri: item.image?.url || product.mainPictureUrl }} style={styles.relatedImage} />
                <Text style={styles.relatedTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.relatedPrice}>{item.price?.convertedPriceList?.internal?.sign} {item.price?.convertedPriceList?.internal?.price}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafd' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  error: { color: 'red', fontSize: 18 },
  imageSlider: { height: 260, backgroundColor: '#fff' },
  mainImage: { width: 340, height: 260, borderRadius: 12, margin: 8, backgroundColor: '#f4f4f4' },
  card: { backgroundColor: '#fff', borderRadius: 14, margin: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1a2340', marginBottom: 8 },
  price: { fontSize: 20, color: '#36c7f6', fontWeight: 'bold', marginBottom: 2 },
  usdPrice: { fontSize: 14, color: '#888', marginBottom: 8 },
  label: { fontSize: 15, color: '#444', marginTop: 4 },
  value: { color: '#1a2340', fontWeight: 'bold' },
  desc: { fontSize: 15, color: '#333', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a2340', marginBottom: 10 },
  vendorImage: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#e3e3e3' },
  vendorName: { fontSize: 16, fontWeight: 'bold', color: '#36c7f6' },
  vendorScore: { fontSize: 13, color: '#888' },
  vendorLabel: { fontSize: 14, color: '#444', marginTop: 2 },
  relatedCard: { width: 120, marginRight: 10, backgroundColor: '#f8fafd', borderRadius: 10, alignItems: 'center', padding: 8 },
  relatedImage: { width: 90, height: 90, borderRadius: 8, backgroundColor: '#f4f4f4' },
  relatedTitle: { fontSize: 13, color: '#222', marginTop: 4, marginBottom: 2, textAlign: 'center' },
  relatedPrice: { fontSize: 13, color: '#36c7f6', fontWeight: 'bold' },
});
