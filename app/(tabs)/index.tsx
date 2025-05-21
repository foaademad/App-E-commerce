// import React, { useEffect, useState } from 'react';
// import { View, ScrollView, Animated, TextInput, Text, Image, TouchableOpacity, FlatList } from 'react-native';
// import { Link } from 'expo-router';
// import { Search, Star, Clock, ChevronRight } from 'lucide-react-native';
// import { getProducts } from '@/services/api';
// import Carousel from '@/components/common/Carousel';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../../src/context/LanguageContext';
// import styles from '../../styles/home'; // استيراد التنسيقات من الملف الخارجي
// import { Ionicons } from '@expo/vector-icons';
// // البيانات الثابتة
// const banners = [
//   { id: 1, image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'summerSale' },
//   { id: 2, image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'newCollection' },
//   { id: 3, image: 'https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'trendingItems' },
// ];

// // بيانات الفئات مع أيقونات ثابتة
// const categories = [
//   { id: 1, name: 'electronics', icon: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }, // أيقونة للإلكترونيات
//   { id: 2, name: 'fashion', icon: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }, // أيقونة للأزياء
//   { id: 3, name: 'home', icon: 'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }, // أيقونة للمنزل
//   { id: 4, name: 'beauty', icon: 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }, // أيقونة للجمال
//   { id: 5, name: 'sports', icon: 'https://images.pexels.com/photos/6803503/pexels-photo-6803503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }, // أيقونة للرياضة
//   { id: 6, name: 'toys', icon: 'https://images.pexels.com/photos/6996101/pexels-photo-6996101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }, // أيقونة للألعاب
//   { id: 7, name: 'automotive', icon: 'https://images.pexels.com/photos/6803503/pexels-photo-6803503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }, // أيقونة للسيارات
//   { id: 8, name: 'jewelry', icon: 'https://images.pexels.com/photos/6996101/pexels-photo-6996101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }, // أيقونة للمجوهرات
// ];

// // بيانات المنتجات الأكثر مبيعًا
// const bestSellers = [
//   { id: 1, name: 'Wireless Earbuds', price: 49.99, rating: 4.8, image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', discount: '20%' },
//   { id: 2, name: 'Smart Watch', price: 129.99, rating: 4.6, image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', discount: '15%' },
//   { id: 3, name: 'Portable Speaker', price: 79.99, rating: 4.7, image: 'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', discount: '10%' },
//   { id: 4, name: 'Laptop Backpack', price: 59.99, rating: 4.5, image: 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', discount: '25%' },
// ];

// // بيانات العروض اليومية
// const dailyDeals = [
//   { id: 1, name: 'Coffee Maker', price: 89.99, oldPrice: 129.99, image: 'https://images.pexels.com/photos/6803503/pexels-photo-6803503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', timeLeft: '08:45:30' },
//   { id: 2, name: 'Air Fryer', price: 69.99, oldPrice: 99.99, image: 'https://images.pexels.com/photos/6996101/pexels-photo-6996101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', timeLeft: '11:23:15' },
//   { id: 3, name: 'Bluetooth Headphones', price: 49.99, oldPrice: 79.99, image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', timeLeft: '05:30:45' },
// ];

// // بيانات الاقتراحات المخصصة
// const recommendations = [
//   { id: 1, name: 'Smartphone Gimbal', price: 89.99, image: 'https://images.pexels.com/photos/12789609/pexels-photo-12789609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
//   { id: 2, name: 'Digital Camera', price: 349.99, image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
//   { id: 3, name: 'Yoga Mat', price: 29.99, image: 'https://images.pexels.com/photos/4498152/pexels-photo-4498152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
//   { id: 4, name: 'Essential Oil Diffuser', price: 34.99, image: 'https://images.pexels.com/photos/7447163/pexels-photo-7447163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
// ];

// // مكون Carousel المحسن
// const EnhancedCarousel = ({ data }) => {
//   const { t } = useTranslation();
//   const { language } = useLanguage();

//   return (
//     <View style={{ marginBottom: 16 }}>
//       <Carousel
//         data={data}
//         autoPlay={true}
//         autoPlayInterval={3000}
//         paginationStyle={{
//           dotStyle: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#ccc' },
//           activeDotStyle: { backgroundColor: '#1abc9c' },
//         }}
//         renderItem={({ item }) => (
//           <View style={{
//             borderRadius: 16,
//             overflow: 'hidden',
//             elevation: 3,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.2,
//             shadowRadius: 4,
//           }}>
//             <Image
//               source={{ uri: item.image }}
//               style={{ width: '100%', height: 200 }}
//               resizeMode="cover"
//             />
//             <View style={{
//               position: 'absolute',
//               bottom: 0,
//               left: 0,
//               right: 0,
//               height: '50%',
//               backgroundColor: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
//             }} />
//             <Text style={{
//               position: 'absolute',
//               bottom: 16,
//               left: 16,
//               color: '#fff',
//               fontFamily: 'Poppins-SemiBold',
//               fontSize: 18,
//             }}>
//               {t(item.title)}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// // مكون فئة
// const CategoryItem = ({ item, language }) => {
//   const { t } = useTranslation();
  
//   return (
//     <TouchableOpacity 
//       style={{
//         alignItems: 'center',
//         padding: 10,
//         width: 90,
//       }}
//     >
//       <View style={{
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         backgroundColor: '#f5f5f5',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 8,
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//       }}>
//         <Image source={{ uri: item.icon }} style={{ width: '100%', height: '100%', borderRadius: 30 }} />
//       </View>
//       <Text style={{
//         fontSize: 12,
//         fontFamily: 'Poppins-Medium',
//         textAlign: 'center',
//         color: '#333',
//       }}>
//         {t(item.name)}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// // مكون منتج
// const ProductItem = ({ item, showDiscount = false, showRating = false }) => {
//   const { t } = useTranslation();
  
//   return (
//     <TouchableOpacity 
//       style={{
//         width: 160,
//         marginRight: 12,
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         overflow: 'hidden',
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//         marginBottom: 16,
//       }}
//     >
//       <Image 
//         source={{ uri: item.image }} 
//         style={{ width: '100%', height: 120 }} 
//         resizeMode="cover" 
//       />
      
//       {showDiscount && item.discount && (
//         <View style={{
//           position: 'absolute',
//           top: 8,
//           right: 8,
//           backgroundColor: '#ff3b30',
//           paddingHorizontal: 6,
//           paddingVertical: 2,
//           borderRadius: 4,
//         }}>
//           <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
//             -{item.discount}
//           </Text>
//         </View>
//       )}
      
//       <View style={{ padding: 12 }}>
//         <Text 
//           numberOfLines={1} 
//           style={{
//             fontSize: 14,
//             fontFamily: 'Poppins-Medium',
//             color: '#333',
//             marginBottom: 4,
//           }}
//         >
//           {item.name}
//         </Text>
        
//         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Text style={{
//             fontSize: 14,
//             fontFamily: 'Poppins-SemiBold',
//             color: '#1abc9c',
//           }}>
//             ${item.price.toFixed(2)}
//           </Text>
          
//           {item.oldPrice && (
//             <Text style={{
//               fontSize: 12,
//               color: '#999',
//               textDecorationLine: 'line-through',
//               marginLeft: 4,
//             }}>
//               ${item.oldPrice.toFixed(2)}
//             </Text>
//           )}
//         </View>
        
//         {showRating && (
//           <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
//             <Star size={12} color="#ffc107" fill="#ffc107" />
//             <Text style={{ marginLeft: 4, fontSize: 12, color: '#666' }}>
//               {item.rating}
//             </Text>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// // مكون العرض اليومي
// const DealItem = ({ item }) => {
//   return (
//     <TouchableOpacity 
//       style={{
//         width: 200,
//         marginRight: 12,
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         overflow: 'hidden',
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//         marginBottom: 16,
//       }}
//     >
//       <Image 
//         source={{ uri: item.image }} 
//         style={{ width: '100%', height: 140 }} 
//         resizeMode="cover" 
//       />
      
//       <View style={{ padding: 12 }}>
//         <Text 
//           numberOfLines={1} 
//           style={{
//             fontSize: 14,
//             fontFamily: 'Poppins-Medium',
//             color: '#333',
//             marginBottom: 4,
//           }}
//         >
//           {item.name}
//         </Text>
        
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
//           <Text style={{
//             fontSize: 16,
//             fontFamily: 'Poppins-SemiBold',
//             color: '#ff3b30',
//           }}>
//             ${item.price.toFixed(2)}
//           </Text>
          
//           <Text style={{
//             fontSize: 12,
//             color: '#999',
//             textDecorationLine: 'line-through',
//             marginLeft: 8,
//           }}>
//             ${item.oldPrice.toFixed(2)}
//           </Text>
//         </View>
        
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <Clock size={14} color="#666" />
//           <Text style={{ marginLeft: 4, fontSize: 12, color: '#666' }}>
//             {item.timeLeft}
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// // مكون قسم مع عنوان وزر عرض الكل
// const SectionHeader = ({ title, onSeeAll, language }) => {
//   const { t } = useTranslation();
  
//   return (
//     <View style={{
//       flexDirection: language === 'ar' ? 'row-reverse' : 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: 12,
//       paddingHorizontal: 16,
//     }}>
//       <Text style={{
//         fontSize: 18,
//         fontFamily: 'Poppins-SemiBold',
//         color: '#333',
//       }}>
//         {t(title)}
//       </Text>
      
//       <TouchableOpacity
//         onPress={onSeeAll}
//         style={{
//           flexDirection: language === 'ar' ? 'row-reverse' : 'row',
//           alignItems: 'center',
//         }}
//       >
//         <Text style={{ 
//           fontSize: 14, 
//           color: '#1abc9c',
//           fontFamily: 'Poppins-Medium',
//         }}>
//           {t('seeAll')}
//         </Text>
//         <ChevronRight size={16} color="#1abc9c" style={{ 
//           transform: [{ rotate: language === 'ar' ? '180deg' : '0deg' }] 
//         }} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// // المكون الرئيسي
// export default function HomeScreen() {
//   const { t } = useTranslation();
//   const { language } = useLanguage();
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const fadeAnim = useState(new Animated.Value(0))[0];

//   // جلب البيانات
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getProducts();
//         setProducts(data);
//         setLoading(false);
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 800,
//           useNativeDriver: true,
//         }).start();
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // تخصيص التنسيق بناءً على اللغة
//   const dynamicSearchContainerStyle = {
//     ...styles.searchContainer,
//     flexDirection: language === 'ar' ? 'row-reverse' : 'row',
//   };

//   const dynamicSearchBarStyle = {
//     ...styles.searchBar,
//     flexDirection: language === 'ar' ? 'row-reverse' : 'row',
//   };

//   const dynamicSearchIconStyle = {
//     ...styles.searchIcon,
//     marginRight: language === 'ar' ? 0 : 8,
//     marginLeft: language === 'ar' ? 8 : 0,
//   };

//   const dynamicSectionTitleStyle = {
//     ...styles.sectionTitle,
//     textAlign: language === 'ar' ? 'right' : 'left',
//   };

//   // المعالجات
//   const handleSeeAll = (section) => {
//     console.log(`See all pressed for ${section}`);
//     // يمكن التنقل إلى صفحة التصنيف المناسبة هنا
//   };

//   return (
//     <View style={styles.container}>
//       <View style={dynamicSearchContainerStyle}>
//         <View style={dynamicSearchBarStyle}>
//           <Search size={20} color="#666" style={dynamicSearchIconStyle} />
//           <TextInput style={styles.searchText} placeholder={t('searchProducts')} />
//         </View>
//       </View>

//       <ScrollView 
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* قسم البانر */}
//         <EnhancedCarousel data={banners} />
        
//         <Animated.View style={{ opacity: fadeAnim }}>

//           {/* قسم الفئات */}
//           <View style={{ marginVertical: 16 }}>
//             <SectionHeader 
//               title="Categories" 
//               onSeeAll={() => handleSeeAll('categories')} 
//               language={language}
//             />
//             <FlatList
//               data={categories}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => <CategoryItem item={item} language={language} />}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingHorizontal: 12 }}
//             />
//           </View>
          
//           {/* قسم الأكثر مبيعاً */}
//           <View style={{ marginVertical: 16  }}>
//             <SectionHeader 
//               title="Best Sellers" 
//               onSeeAll={() => handleSeeAll('bestSellers')} 
//               language={language}
//             />
//             <FlatList
//               data={bestSellers}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => <ProductItem item={item} showDiscount showRating />}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingHorizontal: 16 }}
//             />
//           </View>
          
//           {/* قسم العروض اليومية */}
//           <View style={{
//             marginVertical: 16,
//             backgroundColor: '#f9f9f9',
//             paddingVertical: 16,
//           }}>
//             <SectionHeader 
//               title="Daily Deals" 
//               onSeeAll={() => handleSeeAll('dailyDeals')} 
//               language={language}
//             />
//             <FlatList
//               data={dailyDeals}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => <DealItem item={item} />}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingHorizontal: 16 }}
//             />
//           </View>
          
//           {/* قسم التوصيات الشخصية */}
//           <View style={{ marginVertical: 16 }}>
//             <SectionHeader 
//               title="Recommendations" 
//               onSeeAll={() => handleSeeAll('recommendations')} 
//               language={language}
//             />
//             <FlatList
//               data={recommendations}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => <ProductItem item={item} />}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingHorizontal: 16 }}
//             />
//           </View>
          
//           {/* بانر ترويجي */}
//           <TouchableOpacity
//             style={{
//               marginHorizontal: 16,
//               marginVertical: 16,
//               borderRadius: 12,
//               overflow: 'hidden',
//               elevation: 2,
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: 2 },
//               shadowOpacity: 0.1,
//               shadowRadius: 3,
//             }}
//           >
//             <Image
//               source={{ uri: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
//               style={{ width: '100%', height: 120 }}
//               resizeMode="cover"
//             />
//             <View style={{
//               position: 'absolute',
//               top: 0,
//               bottom: 0,
//               left: 0,
//               right: 0,
//               justifyContent: 'center',
//               alignItems: language === 'ar' ? 'flex-end' : 'flex-start',
//               padding: 16,
//               backgroundColor: 'rgba(0,0,0,0.3)',
//             }}>
//               <Text style={{
//                 fontSize: 22,
//                 color: '#fff',
//                 fontFamily: 'Poppins-Bold',
//                 marginBottom: 4,
//               }}>
//                 {t('specialOffer')}
//               </Text>
//               <Text style={{
//                 fontSize: 14,
//                 color: '#fff',
//                 fontFamily: 'Poppins-Medium',
//                 marginBottom: 8,
//               }}>
//                 {t('upTo50Off')}
//               </Text>
//               <TouchableOpacity style={{
//                 backgroundColor: '#fff',
//                 paddingHorizontal: 12,
//                 paddingVertical: 6,
//                 borderRadius: 4,
//               }}>
//                 <Text style={{
//                   color: '#1abc9c',
//                   fontSize: 12,
//                   fontFamily: 'Poppins-SemiBold',
//                 }}>
//                   {t('shopNow')}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>

//         </Animated.View>
//       </ScrollView>
//     </View>
//   );
// }

import React, { useEffect, useState } from 'react';
import { View, ScrollView, Animated, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/src/context/LanguageContext';
import styles from '@/styles/home';
import EnhancedCarousel from '../home/banners/Banners';
import Categories from '../home/categories/Categories';
import BestSellers from '../home/bestSellers/BestSellers';
import DailyDeals from '../home/dailyDeals/DailyDeals';
import Recommendations from '../home/recommendations/Recommendations';
import PromotionalBanner from '../home/promotionalBanner/PromotionalBanner';
import { getProducts } from '@/services/api';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const dynamicSearchContainerStyle = {
    ...styles.searchContainer,
    flexDirection: language === 'ar' ? 'row-reverse' : 'row',
  };

  const dynamicSearchBarStyle = {
    ...styles.searchBar,
    flexDirection: language === 'ar' ? 'row-reverse' : 'row',
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
          <Search size={20} color="#666" style={dynamicSearchIconStyle} />
          <TextInput style={styles.searchText} placeholder={t('searchProducts')} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <EnhancedCarousel />
          <Categories />
          <BestSellers />
          <DailyDeals />
          <Recommendations />
          <PromotionalBanner />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;