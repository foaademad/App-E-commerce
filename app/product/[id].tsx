import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../src/store/api/productApi';
import { AppDispatch, RootState } from '../../src/store/store';
import Video from 'react-native-video';
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
        
        <View style={styles.videoContainer}>
        {product.videos?.[0]?.url ? (
            <Video
            source={{ uri: product.videos[0].url }}
            style={{ width: '100%', height: 220, marginBottom: 10, borderRadius: 10 }}
            controls
            paused={true}
            resizeMode="contain"
            />
            ) : (
                <Text style={styles.desc}>No video available</Text>
            )}
        </View>
        <Text style={styles.label}>Brand: <Text style={styles.value}>{product.brandName}</Text></Text>
        <Text style={styles.label}>Weight: <Text style={styles.value}>{product.physicalParameters?.weight ?? '-'}</Text></Text>
        <Text style={styles.label}>Height: <Text style={styles.value}>{product.physicalParameters?.height ?? '-'}</Text></Text>
        <Text style={styles.label}>Width: <Text style={styles.value}>{product.physicalParameters?.width ?? '-'}</Text></Text>
        <Text style={styles.label}>Available Quantity: <Text style={styles.value}>{product.masterQuantity}</Text></Text>
        {/* <Text style={styles.label}>Seller: <Text style={styles.value}>{product.vendorDisplayName || product.vendorName}</Text></Text>
     
        <Text style={styles.label}>External Category ID: <Text style={styles.value}>{product.externalCategoryId}</Text></Text>
        <Text style={styles.label}>Vendor ID: <Text style={styles.value}>{product.vendorId}</Text></Text>
        <Text style={styles.label}>Vendor Score: <Text style={styles.value}>{product.vendorScore}</Text></Text> */}
        
        {/* Attributes */}
        <Text style={styles.sectionTitle}>Attributes</Text>
        {product.attributes?.length ? product.attributes.map((attr, idx) => (
          <Text key={idx} style={styles.value}>{attr.propertyName}: {attr.value}</Text>
        )) : <Text style={styles.value}>-</Text>}
        {/* Featured Values */}
        <Text style={styles.sectionTitle}>Featured Values</Text>
        {product.featuredValues?.length ? product.featuredValues.map((fv, idx) => (
          <Text key={idx} style={styles.value}>{fv.name}: {fv.value}</Text>
        )) : <Text style={styles.value}>-</Text>}
      </View>
      {/* Vendor Info */}
      <View style={styles.vendorCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Image source={{ uri: vendor?.displayPictureUrl || vendor?.pictureUrl }} style={styles.vendorImageLarge} />
          <View style={{ marginLeft: 14 }}>
            <Text style={styles.vendorName}>{vendor?.displayName || vendor?.name || '-'}</Text>
            <Text style={styles.vendorShopName}>{vendor?.shopName || '-'}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Text style={styles.vendorScore}>Level: {vendor?.credit?.level ?? '-'}</Text>
              <Text style={styles.vendorScore}>  |  Score: {vendor?.credit?.score ?? '-'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.vendorInfoRow}><Text style={styles.vendorInfoLabel}>Shop Logo:</Text>{vendor?.pictureUrl ? <Image source={{ uri: vendor.pictureUrl }} style={styles.vendorLogo} /> : <Text style={styles.vendorInfoValue}>-</Text>}</View>
        <View style={styles.vendorInfoRow}><Text style={styles.vendorInfoLabel}>Shop URL:</Text>{vendor?.shopName ? <Text style={[styles.vendorInfoValue, { color: '#36c7f6' }]}>{vendor.shopName}</Text> : <Text style={styles.vendorInfoValue}>-</Text>}</View>
        <View style={styles.vendorInfoRow}><Text style={styles.vendorInfoLabel}>Email:</Text><Text style={styles.vendorInfoValue}>{vendor?.email || '-'}</Text></View>
        <View style={styles.vendorInfoRow}><Text style={styles.vendorInfoLabel}>Location:</Text><Text style={styles.vendorInfoValue}>{vendor?.location?.state || '-'}</Text></View>
        <View style={styles.vendorInfoRow}><Text style={styles.vendorInfoLabel}>Delivery Score:</Text><Text style={styles.vendorInfoValue}>{vendor?.scores?.deliveryScore ?? '-'}</Text></View>
        <View style={styles.vendorInfoRow}><Text style={styles.vendorInfoLabel}>Item Score:</Text><Text style={styles.vendorInfoValue}>{vendor?.scores?.itemScore ?? '-'}</Text></View>
        <View style={styles.vendorInfoRow}><Text style={styles.vendorInfoLabel}>Service Score:</Text><Text style={styles.vendorInfoValue}>{vendor?.scores?.serviceScore ?? '-'}</Text></View>
        <View style={styles.vendorInfoRow}><Text style={styles.vendorInfoLabel}>Stars:</Text><Text style={styles.vendorInfoValue}>{vendor?.scores?.itemScore ?? '-'}</Text></View>
        <View style={styles.vendorInfoRow}><Text style={styles.vendorInfoLabel}>Years:</Text><Text style={styles.vendorInfoValue}>-</Text></View>
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
  title: { fontSize: 16, fontWeight: 'bold', color: '#1a2340', marginBottom: 8 },
  price: { fontSize: 20, color: '#36c7f6', fontWeight: 'bold', marginBottom: 2 },
  usdPrice: { fontSize: 14, color: '#888', marginBottom: 8 },
  label: { fontSize: 15, color: '#444', marginTop: 4 },
  value: { color: '#1a2340', fontWeight: 'bold' },
  desc: { fontSize: 15, color: '#333', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a2340', marginBottom: 10 },
  vendorCard: { backgroundColor: '#f8fbff', borderRadius: 16, margin: 12, padding: 18, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, elevation: 2 },
  vendorImageLarge: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#e3e3e3' },
  vendorName: { fontSize: 18, fontWeight: 'bold', color: '#1a2340' },
  vendorShopName: { fontSize: 15, color: '#36c7f6', fontWeight: '600', marginTop: 2 },
  vendorScore: { fontSize: 13, color: '#888', marginRight: 6 },
  vendorInfoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  vendorInfoLabel: { fontSize: 14, color: '#444', width: 110 },
  vendorInfoValue: { fontSize: 14, color: '#1a2340', fontWeight: '500' },
  vendorLogo: { width: 32, height: 32, borderRadius: 8, marginLeft: 6, backgroundColor: '#f4f4f4' },
  relatedCard: { width: 120, marginRight: 10, backgroundColor: '#f8fafd', borderRadius: 10, alignItems: 'center', padding: 8 },
  relatedImage: { width: 90, height: 90, borderRadius: 8, backgroundColor: '#f4f4f4' },
  relatedTitle: { fontSize: 13, color: '#222', marginTop: 4, marginBottom: 2, textAlign: 'center' },
  relatedPrice: { fontSize: 13, color: '#36c7f6', fontWeight: 'bold' },
  videoContainer: { width: '100%', height: 220, marginBottom: 10, borderRadius: 10 },
});
