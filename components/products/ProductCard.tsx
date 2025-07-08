import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProductDto } from '../../src/store/utility/interfaces/productInterface';

const { width } = Dimensions.get('window');

interface ProductCardProps {
  product: ProductDto;
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  // استخراج السعر من كائن PriceDto
  const getPrice = () => {
    if (product.price && typeof product.price === 'object') {
      return product.price.convertedPrice || product.price.originalPrice?.toString() || '0.00';
    }
    return '0.00';
  };

  const getOriginalPrice = () => {
    if (product.price && typeof product.price === 'object') {
      return product.price.originalPrice?.toString() || null;
    }
    return null;
  };

  const getCurrencySign = () => {
    if (product.price && typeof product.price === 'object') {
      return product.price.currencySign || '$';
    }
    return '$';
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ 
            uri: product.mainPictureUrl || product.pictures?.[0]?.url || 'https://via.placeholder.com/150x150?text=No+Image'
          }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={16} color="#666" />
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.category} numberOfLines={1}>
          {product.brandName || 'Category'}
        </Text>
        
        <Text style={styles.title} numberOfLines={2}>
          {product.name || product.title || 'Product Name'}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text style={styles.rating}>
            {product.vendorScore?.toString() || '4.5'}
          </Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {getCurrencySign()}{getPrice()}
          </Text>
          {getOriginalPrice() && parseFloat(getOriginalPrice() || '0') > parseFloat(getPrice() || '0') && (
            <Text style={styles.originalPrice}>
              {getCurrencySign()}{getOriginalPrice()}
            </Text>
          )}
        </View>
        
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={16} color="#36c7f6" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 12,
  },
  category: {
    fontSize: 11,
    color: '#36c7f6',
    marginBottom: 4,
    fontFamily: 'Poppins-Medium',
  },
  title: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#2c3e50',
    marginBottom: 6,
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
    fontFamily: 'Poppins-Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#36c7f6',
  },
  originalPrice: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
});

export default ProductCard;