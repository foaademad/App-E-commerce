import React from 'react';
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../src/context/LanguageContext';
import categories from './categoriesData';
import styles from '@/styles/home';
import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

const CategoryItem = ({ item }: { item: any }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        padding: 10,
        width: 90,
      }}
    >
      <View style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      }}>
        <Image source={{ uri: item.icon }} style={{ width: '100%', height: '100%', borderRadius: 30 }} />
      </View>
      <Text style={{
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        textAlign: language === 'ar' ? 'right' : 'center',
        color: '#333',
      }}>
        {t(item.name)}
      </Text>
    </TouchableOpacity>
  );
};

const Categories = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const renderCategoryItem = ({ item }: { item: any }) => <CategoryItem item={item} />;

  return (
    <View style={{ marginVertical: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginHorizontal: 2 }}>
        <Text style={styles.sectionTitle}>{t('Categories')}</Text>
        <Link href="categories" >
          <Text style={styles.seeAll}>{t('See All')}</Text>
          <ChevronRight size={16} color="#36c7f6" style={{ 
            transform: [{ rotate: language === 'ar' ? '180deg' : '0deg' }] 
          }} />
        </Link>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategoryItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
    </View>
  );
};

export default Categories;


