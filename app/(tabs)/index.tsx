import { getProducts } from '@/services/api';
import { useLanguage } from '@/src/context/LanguageContext';
import styles from '@/styles/home';
import { Search } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, ScrollView, TextInput, View } from 'react-native';
import EnhancedCarousel from '../home/banners/Banners';
import BestSellers from '../home/bestSellers/BestSellers';
import Categories from '../home/categories/Categories';
import DailyDeals from '../home/dailyDeals/DailyDeals';
import FeaturedBrands from '../home/featuredBrands/FeaturedBrands';
import NewArrivals from '../home/newArrivals/NewArrivals';


const HomeScreen = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data as any[]);
        setLoading(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const dynamicSearchContainerStyle = {
    ...styles.searchContainer,
    flexDirection: language === 'ar' ? 'row-reverse' : 'row' as 'row-reverse' | 'row',
  };

  const dynamicSearchBarStyle = {
    ...styles.searchBar,
    flexDirection: language === 'ar' ? 'row-reverse' : 'row' as 'row-reverse' | 'row',
  };

  const dynamicSearchIconStyle = {
    ...styles.searchIcon,
    marginRight: language === 'ar' ? 0 : 8,
    marginLeft: language === 'ar' ? 8 : 0,
  };

  return (
    <View style={styles.container}>
      <View style={dynamicSearchContainerStyle}>
        <View style={dynamicSearchBarStyle}>
          <Search size={20} color="#666" style={dynamicSearchIconStyle} />
          <TextInput style={styles.searchText} placeholder={t('searchProducts')} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <EnhancedCarousel />
          <Categories />
          <NewArrivals />
          <BestSellers />
          <FeaturedBrands />
          <DailyDeals />
         
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;