import styles from '@/styles/home';
import { ChevronRight, TrendingUp } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../../src/context/LanguageContext';
import trending from './trendingData';

const TrendingItem = ({ item }: { item: any }) => {
  return (
    <TouchableOpacity
      style={{
        width: 180,
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
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: 140 }}
          resizeMode="cover"
        />
        <View
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: '#ff3b30',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TrendingUp size={12} color="#fff" style={{ marginRight: 4 }} />
          <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
            {item.trending}
          </Text>
        </View>
      </View>
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-SemiBold',
              color: '#1abc9c',
            }}
          >
            ${item.price.toFixed(2)}
          </Text>
        </View>
        <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          {item.sales.toLocaleString()} sales
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Trending = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const renderTrendingItem = ({ item }: { item: any }) => (
    <TrendingItem item={item} />
  );

  return (
    <View style={{ marginVertical: 16, backgroundColor: '#f9f9f9', paddingVertical: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 10,
        }}
      >
        <Text style={styles.sectionTitle}>{t('Trending Now')}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.seeAll}>{t('See All')}</Text>
          <ChevronRight
            size={16}
            color="#36c7f6"
            style={{
              transform: [{ rotate: language === 'ar' ? '180deg' : '0deg' }],
            }}
          />
        </View>
      </View>
      <FlatList
        data={trending}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTrendingItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default Trending; 