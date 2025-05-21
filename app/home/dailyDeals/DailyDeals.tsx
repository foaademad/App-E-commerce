import React from 'react';
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { ChevronRight, Clock, Link } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import  dailyDeals  from './dailyDealsData';
import styles from '@/styles/home';
import { useLanguage } from '../../../src/context/LanguageContext';

const { t } = useTranslation();

const DealItem = ({ item }: { item: any }) => {
  return (
    <TouchableOpacity
      style={{
        width: 200,
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
        style={{ width: '100%', height: 140 }}
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{
            fontSize: 16,
            fontFamily: 'Poppins-SemiBold',
            color: '#ff3b30',
          }}>
            ${item.price.toFixed(2)}
          </Text>
          <Text style={{
            fontSize: 12,
            color: '#999',
            textDecorationLine: 'line-through',
            marginLeft: 8,
          }}>
            ${item.oldPrice.toFixed(2)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Clock size={14} color="#666" />
          <Text style={{ marginLeft: 4, fontSize: 12, color: '#666' }}>
            {item.timeLeft}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DailyDeals = () => {
  const { language } = useLanguage();
  const renderDealItem = ({ item }: { item: any }) => <DealItem item={item} />;

  return (
    <View style={{
      marginVertical: 16,
      backgroundColor: '#f9f9f9',
      paddingVertical: 16,
    }}>
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
        data={dailyDeals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDealItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default DailyDeals;