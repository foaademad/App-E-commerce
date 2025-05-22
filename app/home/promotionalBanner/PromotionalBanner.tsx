import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../src/context/LanguageContext';
import  promotionalBanner  from './promotionalBannerData';

const PromotionalBanner = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 16,
        marginVertical: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}
    >
      <Image
        source={{ uri: promotionalBanner.image }}
        style={{ width: '100%', height: 120 }}
        resizeMode="cover"
      />
      <View style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: language === 'ar' ? 'flex-end' : 'flex-start',
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}>
        <Text style={{
          fontSize: 22,
          color: '#fff',
          fontFamily: 'Poppins-Bold',
          marginBottom: 4,
        }}>
          {t(promotionalBanner.title)}
        </Text>
        <Text style={{
          fontSize: 14,
          color: '#fff',
          fontFamily: 'Poppins-Medium',
          marginBottom: 8,
        }}>
          {t(promotionalBanner.subtitle)}
        </Text>
        <TouchableOpacity style={{
          backgroundColor: '#fff',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 4,
        }}>
          <Text style={{
            color: '#1abc9c',
            fontSize: 12,
            fontFamily: 'Poppins-SemiBold',
          }}>
            {t(promotionalBanner.cta)}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
  
export default PromotionalBanner;