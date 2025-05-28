import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { getDailyDeals } from '../../../src/services/api';
import { Product } from '../../../src/types';
import { ChevronRight, Clock } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../src/context/LanguageContext';

interface DailyDealProduct extends Product {
  oldPrice: number;
  timeLeft: string;
}

const DealItem = ({ item }: { item: DailyDealProduct }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <Text style={styles.oldPrice}>${item.oldPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeLeft}>Time Left: {item.timeLeft}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DailyDeals = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const router = useRouter();
  const [dailyDeals, setDailyDeals] = useState<DailyDealProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDailyDeals();
  }, []);

  const loadDailyDeals = async () => {
    try {
      const products = await getDailyDeals();
      setDailyDeals(products as DailyDealProduct[]);
    } catch (error) {
      console.error('Error loading daily deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: DailyDealProduct }) => <DealItem item={item} />;

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading daily deals...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('Daily Deals')}</Text>
        <View style={styles.seeAllContainer}>
          <Text style={styles.seeAll}>{t('See All')}</Text>
          <ChevronRight size={16} color="#36c7f6" style={{ 
            transform: [{ rotate: language === 'ar' ? '180deg' : '0deg' }] 
          }} />
        </View>
      </View>
      <FlatList
        data={dailyDeals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default DailyDeals;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAll: {
    fontSize: 12,
    color: '#36c7f6',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  productCard: {
    width: 180,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  timeContainer: {
    backgroundColor: '#FFE0E0',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  timeLeft: {
    fontSize: 12,
    color: '#FF4444',
    textAlign: 'center',
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
});