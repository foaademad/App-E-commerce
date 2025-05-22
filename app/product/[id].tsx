// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '@/context/ThemeContext';
// import { useLanguage } from '@/context/LanguageContext';
// import { useCart } from '@/context/CartContext';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { ArrowLeft, Heart, Star, ShoppingBag, Share2 } from 'lucide-react-native';
// import { getProductById, getRelatedProducts } from '@/services/api';

// export default function ProductDetailScreen() {
//   const { t } = useTranslation();
//   const { colors } = useTheme();
//   const { isRTL } = useLanguage();
//   const { addToCart } = useCart();
//   const router = useRouter();
//   const { id } = useLocalSearchParams();
  
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState('description');
//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const productData = await getProductById(id);
//         setProduct(productData);
        
//         // Get related products
//         const related = await getRelatedProducts(productData.category);
//         setRelatedProducts(related);
        
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchProduct();
//     }
//   }, [id]);

//   const handleAddToCart = () => {
//     if (product) {
//       addToCart({
//         ...product,
//         quantity,
//       });
//       // Show success message or feedback
//     }
//   };

//   const handleBuyNow = () => {
//     router.push({
//       pathname: '/buy-now',
//       params: {
//         id: product.id,
//         title: product.title,
//         price: product.price,
//         quantity: quantity,
//       },
//     });
//   };

//   const handleIncreaseQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   const handleDecreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: colors.background,
//     },
//     header: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       paddingTop: 40,
//       paddingHorizontal: 16,
//       paddingBottom: 10,
//     },
//     headerButton: {
//       width: 40,
//       height: 40,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 20,
//       backgroundColor: colors.card,
//     },
//     headerActions: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//     },
//     actionButton: {
//       width: 40,
//       height: 40,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 20,
//       backgroundColor: colors.card,
//       marginLeft: isRTL ? 0 : 10,
//       marginRight: isRTL ? 10 : 0,
//     },
//     scrollView: {
//       flex: 1,
//     },
//     imageContainer: {
//       width: '100%',
//       height: 300,
//       backgroundColor: colors.card,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     productImage: {
//       width: '100%',
//       height: '100%',
//       resizeMode: 'contain',
//     },
//     contentContainer: {
//       padding: 16,
//     },
//     productCategory: {
//       fontSize: 14,
//       color: colors.primary,
//       fontFamily: 'Roboto-Medium',
//       marginBottom: 8,
//       textAlign: isRTL ? 'right' : 'left',
//     },
//     productTitle: {
//       fontSize: 24,
//       color: colors.text,
//       fontFamily: 'Roboto-Bold',
//       marginBottom: 8,
//       textAlign: isRTL ? 'right' : 'left',
//     },
//     ratingContainer: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//       alignItems: 'center',
//       marginBottom: 16,
//     },
//     ratingStars: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//     },
//     ratingText: {
//       marginLeft: isRTL ? 0 : 8,
//       marginRight: isRTL ? 8 : 0,
//       fontSize: 14,
//       color: colors.textSecondary,
//       fontFamily: 'Roboto-Regular',
//     },
//     priceContainer: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//       alignItems: 'center',
//       marginBottom: 20,
//     },
//     price: {
//       fontSize: 24,
//       color: colors.primary,
//       fontFamily: 'Roboto-Bold',
//     },
//     originalPrice: {
//       fontSize: 16,
//       color: colors.textSecondary,
//       textDecorationLine: 'line-through',
//       marginLeft: isRTL ? 0 : 10,
//       marginRight: isRTL ? 10 : 0,
//       fontFamily: 'Roboto-Regular',
//     },
//     discount: {
//       fontSize: 14,
//       color: colors.success,
//       backgroundColor: colors.successLight,
//       paddingHorizontal: 8,
//       paddingVertical: 4,
//       borderRadius: 4,
//       marginLeft: isRTL ? 0 : 10,
//       marginRight: isRTL ? 10 : 0,
//       fontFamily: 'Roboto-Medium',
//     },
//     quantityContainer: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//       alignItems: 'center',
//       marginBottom: 20,
//     },
//     quantityLabel: {
//       fontSize: 16,
//       color: colors.text,
//       fontFamily: 'Roboto-Medium',
//       marginRight: isRTL ? 0 : 16,
//       marginLeft: isRTL ? 16 : 0,
//     },
//     quantityControls: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//       alignItems: 'center',
//       borderWidth: 1,
//       borderColor: colors.border,
//       borderRadius: 8,
//       overflow: 'hidden',
//     },
//     quantityButton: {
//       width: 40,
//       height: 40,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: colors.card,
//     },
//     quantityText: {
//       width: 40,
//       textAlign: 'center',
//       fontSize: 16,
//       fontFamily: 'Roboto-Medium',
//       color: colors.text,
//     },
//     tabsContainer: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//       borderBottomWidth: 1,
//       borderBottomColor: colors.border,
//       marginBottom: 16,
//     },
//     tab: {
//       paddingVertical: 12,
//       paddingHorizontal: 16,
//       marginRight: isRTL ? 0 : 16,
//       marginLeft: isRTL ? 16 : 0,
//     },
//     activeTab: {
//       borderBottomWidth: 2,
//       borderBottomColor: colors.primary,
//     },
//     tabText: {
//       fontSize: 16,
//       color: colors.textSecondary,
//       fontFamily: 'Roboto-Medium',
//     },
//     activeTabText: {
//       color: colors.primary,
//     },
//     tabContent: {
//       marginBottom: 20,
//     },
//     descriptionText: {
//       fontSize: 14,
//       lineHeight: 22,
//       color: colors.text,
//       fontFamily: 'Roboto-Regular',
//       textAlign: isRTL ? 'right' : 'left',
//     },
//     specificationRow: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//       justifyContent: 'space-between',
//       paddingVertical: 8,
//       borderBottomWidth: 1,
//       borderBottomColor: colors.border,
//     },
//     specificationLabel: {
//       fontSize: 14,
//       color: colors.textSecondary,
//       fontFamily: 'Roboto-Regular',
//     },
//     specificationValue: {
//       fontSize: 14,
//       color: colors.text,
//       fontFamily: 'Roboto-Medium',
//       textAlign: isRTL ? 'left' : 'right',
//     },
//     buttonsContainer: {
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//       marginTop: 20,
//       marginBottom: 30,
//     },
//     cartButton: {
//       flex: 1,
//       height: 54,
//       borderWidth: 1,
//       borderColor: colors.primary,
//       borderRadius: 8,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginRight: isRTL ? 0 : 8,
//       marginLeft: isRTL ? 8 : 0,
//       flexDirection: isRTL ? 'row-reverse' : 'row',
//     },
//     cartButtonText: {
//       color: colors.primary,
//       fontSize: 16,
//       fontFamily: 'Roboto-Medium',
//       marginLeft: isRTL ? 0 : 8,
//       marginRight: isRTL ? 8 : 0,
//     },
//     buyButton: {
//       flex: 1,
//       height: 54,
//       backgroundColor: colors.primary,
//       borderRadius: 8,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginLeft: isRTL ? 0 : 8,
//       marginRight: isRTL ? 8 : 0,
//     },
//     buyButtonText: {
//       color: colors.white,
//       fontSize: 16,
//       fontFamily: 'Roboto-Bold',
//     },
//     loadingContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//   });

//   if (loading) {
//     return (
//       <View style={[styles.container, styles.loadingContainer]}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }

//   if (!product) {
//     return (
//       <View style={[styles.container, styles.loadingContainer]}>
//         <Text style={{ color: colors.text }}>{t('productNotFound')}</Text>
//         <TouchableOpacity 
//           style={[styles.buyButton, { marginTop: 20, paddingHorizontal: 20 }]}
//           onPress={() => router.back()}
//         >
//           <Text style={styles.buyButtonText}>{t('goBack')}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.headerButton}
//           onPress={() => router.back()}
//         >
//           <ArrowLeft size={24} color={colors.text} style={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }} />
//         </TouchableOpacity>
        
//         <View style={styles.headerActions}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => setIsFavorite(!isFavorite)}
//           >
//             <Heart 
//               size={20} 
//               color={isFavorite ? colors.error : colors.text} 
//               fill={isFavorite ? colors.error : 'transparent'} 
//             />
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.actionButton}>
//             <Share2 size={20} color={colors.text} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         <View style={styles.imageContainer}>
//           <Image 
//             source={{ uri: product.image }} 
//             style={styles.productImage} 
//           />
//         </View>
        
//         <View style={styles.contentContainer}>
//           <Text style={styles.productCategory}>{t(product.category)}</Text>
//           <Text style={styles.productTitle}>{product.title}</Text>
          
//           <View style={styles.ratingContainer}>
//             <View style={styles.ratingStars}>
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   size={16}
//                   color={star <= Math.floor(product.rating) ? colors.warning : colors.border}
//                   fill={star <= Math.floor(product.rating) ? colors.warning : 'transparent'}
//                 />
//               ))}
//             </View>
//             <Text style={styles.ratingText}>{product.rating} ({Math.floor(Math.random() * 100) + 50} {t('reviews')})</Text>
//           </View>
          
//           <View style={styles.priceContainer}>
//             <Text style={styles.price}>${product.price.toFixed(2)}</Text>
//             {Math.random() > 0.5 && (
//               <>
//                 <Text style={styles.originalPrice}>${(product.price * 1.2).toFixed(2)}</Text>
//                 <Text style={styles.discount}>20% {t('off')}</Text>
//               </>
//             )}
//           </View>
          
//           <View style={styles.quantityContainer}>
//             <Text style={styles.quantityLabel}>{t('quantity')}</Text>
//             <View style={styles.quantityControls}>
//               <TouchableOpacity 
//                 style={styles.quantityButton}
//                 onPress={handleDecreaseQuantity}
//                 disabled={quantity <= 1}
//               >
//                 <Text style={{ fontSize: 20, color: quantity <= 1 ? colors.textSecondary : colors.text }}>-</Text>
//               </TouchableOpacity>
              
//               <Text style={styles.quantityText}>{quantity}</Text>
              
//               <TouchableOpacity 
//                 style={styles.quantityButton}
//                 onPress={handleIncreaseQuantity}
//               >
//                 <Text style={{ fontSize: 20, color: colors.text }}>+</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
          
//           <View style={styles.tabsContainer}>
//             <TouchableOpacity 
//               style={[styles.tab, activeTab === 'description' && styles.activeTab]}
//               onPress={() => setActiveTab('description')}
//             >
//               <Text style={[styles.tabText, activeTab === 'description' && styles.activeTabText]}>
//                 {t('description')}
//               </Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[styles.tab, activeTab === 'specifications' && styles.activeTab]}
//               onPress={() => setActiveTab('specifications')}
//             >
//               <Text style={[styles.tabText, activeTab === 'specifications' && styles.activeTabText]}>
//                 {t('specifications')}
//               </Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
//               onPress={() => setActiveTab('reviews')}
//             >
//               <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
//                 {t('reviews')}
//               </Text>
//             </TouchableOpacity>
//           </View>
          
//           <View style={styles.tabContent}>
//             {activeTab === 'description' && (
//               <Text style={styles.descriptionText}>
//                 {product.description || `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam 
//                 auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget
//                 aliquam nunc nisl eget nunc. Nullam auctor, nisl eget ultricies
//                 tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget
//                 nunc.`}
//               </Text>
//             )}
            
//             {activeTab === 'specifications' && (
//               <View>
//                 <View style={styles.specificationRow}>
//                   <Text style={styles.specificationLabel}>{t('brand')}</Text>
//                   <Text style={styles.specificationValue}>Brand Name</Text>
//                 </View>
//                 <View style={styles.specificationRow}>
//                   <Text style={styles.specificationLabel}>{t('model')}</Text>
//                   <Text style={styles.specificationValue}>Model XYZ</Text>
//                 </View>
//                 <View style={styles.specificationRow}>
//                   <Text style={styles.specificationLabel}>{t('color')}</Text>
//                   <Text style={styles.specificationValue}>Multiple</Text>
//                 </View>
//                 <View style={styles.specificationRow}>
//                   <Text style={styles.specificationLabel}>{t('material')}</Text>
//                   <Text style={styles.specificationValue}>Premium</Text>
//                 </View>
//                 <View style={styles.specificationRow}>
//                   <Text style={styles.specificationLabel}>{t('warranty')}</Text>
//                   <Text style={styles.specificationValue}>1 Year</Text>
//                 </View>
//               </View>
//             )}
            
//             {activeTab === 'reviews' && (
//               <Text style={styles.descriptionText}>
//                 {t('reviewsComingSoon')}
//               </Text>
//             )}
//           </View>
          
//           <View style={styles.buttonsContainer}>
//             <TouchableOpacity 
//               style={styles.cartButton}
//               onPress={handleAddToCart}
//             >
//               <ShoppingBag size={20} color={colors.primary} />
//               <Text style={styles.cartButtonText}>{t('addToCart')}</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.buyButton}
//               onPress={handleBuyNow}
//             >
//               <Text style={styles.buyButtonText}>{t('buyNow')}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

