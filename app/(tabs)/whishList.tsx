import { useShop } from '@/src/context/ShopContext';
import { Heart, ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const WishlistScreen = () => {
  const { t } = useTranslation();
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('Wishlist')}</Text>
        <Text style={styles.itemCount}>{wishlist.length} {t('items')}</Text>
      </View>

      <ScrollView style={styles.content}>
        {wishlist.map((item) => (
          <View key={item.id} style={styles.wishlistItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>★ {item.rating}</Text>
                <Text style={styles.reviews}>({item.reviews} {t('reviews')})</Text>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.addToCartButton]}
                onPress={() => addToCart(item)}
              >
                <ShoppingCart size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.removeButton]}
                onPress={() => removeFromWishlist(item.id)}
              >
                <Heart size={20} color="#ff3b30" fill="#ff3b30" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {wishlist.length === 0 && (
        <View style={styles.emptyState}>
          <Heart size={48} color="#ccc" />
          <Text style={styles.emptyStateText}>{t('Your wishlist is empty')}</Text>
          <Text style={styles.emptyStateSubtext}>
            {t('Add items to your wishlist to see them here')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  wishlistItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36c7f6',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffb800',
    marginRight: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    justifyContent: 'space-between',
    paddingLeft: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: '#36c7f6',
  },
  removeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff3b30',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
}); 