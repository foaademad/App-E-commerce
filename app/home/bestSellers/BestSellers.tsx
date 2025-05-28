import { useRouter } from 'expo-router';
import { ChevronRight } from "lucide-react-native";
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getBestSellers } from '../../../src/services/api';
import { Product } from '../../../src/types';

import { useLanguage } from "../../../src/context/LanguageContext";

const ProductItem = ({ item }: { item: Product }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BestSellers = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const router = useRouter();
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBestSellers();
  }, []);

  const loadBestSellers = async () => {
    try {
      const products = await getBestSellers();
      setBestSellers(products);
    } catch (error) {
      console.error('Error loading best sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductItem item={item} />
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading best sellers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Text style={styles.title}>{t("Best Sellers")}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={styles.seeAll}>{t("See All")}</Text>
          <ChevronRight
            size={16}
            color="#36c7f6"
            style={{
              transform: [{ rotate: language === "ar" ? "180deg" : "0deg" }],
            }}
          />
        </View>
      </View>
      <FlatList
        data={bestSellers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  productCard: {
    width: 160,
    marginHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#FFD700',
    marginRight: 5,
  },
  reviews: {
    fontSize: 12,
    color: '#666',
  },
  seeAll: {
    fontSize: 12,
    color: '#36c7f6',
  },
});
