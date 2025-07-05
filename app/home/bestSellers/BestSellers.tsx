import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../src/store/store';
import { ProductDto } from '../../../src/store/utility/interfaces/productInterface';

const ProductItem = ({ item }: { item: ProductDto }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}`)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.mainPictureUrl }} style={styles.productImage} resizeMode="cover" />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.weight}>⚖ {item.physicalParameters?.weight ?? '-'} kg</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ 0</Text>
          <Text style={styles.reviews}>(0)</Text>
        </View>
        <Text style={styles.productPrice}>
          {item.price?.convertedPriceList?.internal?.sign} {item.price?.convertedPriceList?.internal?.price}
        </Text>
        <Text style={styles.usdPrice}>
          ${item.price?.convertedPriceList?.displayedMoneys?.[0]?.price ?? '-'} USD
        </Text>
        <Text style={styles.quantity}>{item.masterQuantity} left</Text>
        <View style={styles.vendorRow}>
          <Text style={styles.vendor}>{item.vendorDisplayName || item.vendorName}</Text>
          <Text style={styles.verified}>✔ Verified</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BestSellers = () => {
  const productsBest = useSelector((state: RootState) => state.product.productsBest);

  const renderItem = ({ item }: { item: ProductDto }) => (
    <ProductItem item={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Sellers</Text>
      <FlatList
        data={productsBest}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default BestSellers;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 15,
    color: '#222',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  productCard: {
    width: 180,
    marginHorizontal: 7,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#f4f4f4',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  weight: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  rating: {
    fontSize: 12,
    color: '#FFD700',
    marginRight: 3,
  },
  reviews: {
    fontSize: 12,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36c7f6',
    marginBottom: 2,
  },
  usdPrice: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  quantity: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  vendorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  vendor: {
    fontSize: 12,
    color: '#36c7f6',
    fontWeight: 'bold',
    marginRight: 6,
  },
  verified: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
