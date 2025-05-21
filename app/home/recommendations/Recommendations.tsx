import React from 'react';
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import  recommendations  from './recommendationsData';
import styles from '@/styles/home';
import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useLanguage } from '../../../src/context/LanguageContext';

const { t } = useTranslation();
const ProductItem = ({ item }: { item: any }) => {

  return (
    <TouchableOpacity
      style={{
        width: 160,
        marginRight: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginBottom: 16,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: '100%', height: 120 }}
        resizeMode="cover"
      />
      <View style={{ padding: 12 }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
            color: '#333',
            marginBottom: 4,
          }}
        >
          {item.name}
        </Text>
        <Text style={{
          fontSize: 14,
          fontFamily: 'Poppins-SemiBold',
          color: '#1abc9c',
        }}>
          ${item.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Recommendations = () => {
  const { language } = useLanguage();
  const renderProductItem = ({ item }: { item: any }) => <ProductItem item={item} />;

  return (
    <View style={{ marginVertical: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginHorizontal: 10 }}>
        <Text style={styles.sectionTitle}>{t('Best Sellers')}</Text>
        <Link href="bestSellers">
          <Text style={styles.seeAll}>{t('See All')}</Text>
          <ChevronRight size={16} color="#36c7f6" style={{ 
            transform: [{ rotate: language === 'ar' ? '180deg' : '0deg' }] 
          }} />
        </Link>
      </View>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default Recommendations;