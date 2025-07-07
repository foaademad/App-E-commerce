import { useLanguage } from '@/src/context/LanguageContext';
import styles from '@/styles/home';
import { Search } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../src/store/api/productApi';
import { AppDispatch, RootState } from '../../src/store/store';
import EnhancedCarousel from '../home/banners/Banners';
import BestSellers from '../home/bestSellers/BestSellers';
import Categories from '../home/categories/Categories';
import DailyDeals from '../home/dailyDeals/DailyDeals';
import NewArrivals from '../home/newArrivals/NewArrivals';
const HomeScreen = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  const { currentCategory } = useSelector((state: RootState) => state.product);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
          <TextInput style={styles.searchText} placeholder={t('searchProducts')} />
          <Search size={20} color="#666" style={dynamicSearchIconStyle} />
        </View>
      </View>
       {/* athor component here  */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <EnhancedCarousel />
        <Categories />
        <NewArrivals />
        <BestSellers />
        <DailyDeals />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;