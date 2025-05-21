// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
// import { useTheme } from '@/context/ThemeContext';
// import { useLanguage } from '@/context/LanguageContext';
// import { useRouter } from 'expo-router';
// import { useTranslation } from 'react-i18next';
// import { Heart, Star, Plus } from 'lucide-react-native';
// import { useCart } from '@/context/CartContext';
// import { useFavorites } from '@/context/FavoritesContext';
// import { useAuth } from '@/context/AuthContext';

// type ProductCardProps = {
//   product: any;
//   isGridView?: boolean;
// };

// const ProductCard: React.FC<ProductCardProps> = ({ product, isGridView = true }) => {
//   const { colors } = useTheme();
//   const { isRTL } = useLanguage();
//   const { t } = useTranslation();
//   const router = useRouter();
//   const { addToCart } = useCart();
//   const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
//   const { user } = useAuth();
  
//   const handleProductPress = () => {
//     router.push(`/product/${product.id}`);
//   };
  
//   const handleAddToCart = (e: any) => {
//     e.stopPropagation();
//     if (!user) {
//       Alert.alert(
//         t('loginRequired'),
//         t('pleaseLoginToAddToCart'),
//         [
//           { text: t('cancel'), style: 'cancel' },
//           { text: t('login'), onPress: () => router.push('/login') }
//         ]
//       );
//       return;
//     }
//     addToCart({ ...product, quantity: 1 });
//     router.push('/cart');
//   };

//   const handleFavoritePress = (e: any) => {
//     e.stopPropagation();
//     if (!user) {
//       Alert.alert(
//         t('loginRequired'),
//         t('pleaseLoginToAddToFavorites'),
//         [
//           { text: t('cancel'), style: 'cancel' },
//           { text: t('login'), onPress: () => router.push('/login') }
//         ]
//       );
//       return;
//     }
//     if (isFavorite(product.id)) {
//       removeFromFavorites(product.id);
//     } else {
//       addToFavorites(product.id);
//     }
//   };

//   const styles = StyleSheet.create({
//     container: {
//       margin: 8,
//       width: isGridView ? windowWidth / 2 - 24 : '100%',
//       borderRadius: 8,
//       backgroundColor: colors.card,
//       overflow: 'hidden',
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 2,
//     },
//     listContainer: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//       width: '100%',
//     },
//     image: {
//       width: '100%',
//       height: 150,
//       resizeMode: 'cover',
//     },
//     listImage: {
//       width: 100,
//       height: 100,
//       resizeMode: 'cover',
//     },
//     contentContainer: {
//       padding: 12,
//       flex: 1,
//     },
//     favorite: {
//       position: 'absolute',
//       top: 8,
//       right: isRTL ? undefined : 8,
//       left: isRTL ? 8 : undefined,
//       width: 30,
//       height: 30,
//       borderRadius: 15,
//       backgroundColor: 'rgba(255, 255, 255, 0.8)',
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: 1,
//     },
//     category: {
//       fontSize: 12,
//       color: colors.primary,
//       marginBottom: 4,
//       fontFamily: 'Roboto-Medium',
//       textAlign: isRTL ? 'right' : 'left',
//     },
//     title: {
//       fontSize: 14,
//       fontFamily: 'Roboto-Medium',
//       color: colors.text,
//       marginBottom: 4,
//       textAlign: isRTL ? 'right' : 'left',
//     },
//     ratingContainer: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//       alignItems: 'center',
//       marginBottom: 8,
//     },
//     rating: {
//       fontSize: 12,
//       color: colors.textSecondary,
//       marginLeft: isRTL ? 0 : 4,
//       marginRight: isRTL ? 4 : 0,
//       fontFamily: 'Roboto-Regular',
//     },
//     priceContainer: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//     },
//     price: {
//       fontSize: 16,
//       fontFamily: 'Roboto-Bold',
//       color: colors.primary,
//     },
//     addButton: {
//       width: 30,
//       height: 30,
//       borderRadius: 15,
//       backgroundColor: colors.primaryLight,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//   });

//   return (
//     <TouchableOpacity
//       style={[styles.container, !isGridView && styles.listContainer]}
//       onPress={handleProductPress}
//       activeOpacity={0.8}
//     >
//       <TouchableOpacity 
//         style={styles.favorite}
//         onPress={handleFavoritePress}
//       >
//         <Heart 
//           size={16} 
//           color={isFavorite(product.id) ? colors.error : colors.text} 
//           fill={isFavorite(product.id) ? colors.error : 'transparent'}
//         />
//       </TouchableOpacity>
      
//       <Image 
//         source={{ uri: product.image }} 
//         style={isGridView ? styles.image : styles.listImage} 
//       />
      
//       <View style={styles.contentContainer}>
//         <Text style={styles.category}>{t(product.category)}</Text>
//         <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        
//         <View style={styles.ratingContainer}>
//           <Star size={14} color="#F59E0B" fill="#F59E0B" />
//           <Text style={styles.rating}>{product.rating}</Text>
//         </View>
        
//         <View style={styles.priceContainer}>
//           <Text style={styles.price}>${product.price}</Text>
//           <TouchableOpacity 
//             style={styles.addButton}
//             onPress={handleAddToCart}
//           >
//             <Plus size={16} color={colors.primary} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 375;

// export default ProductCard;