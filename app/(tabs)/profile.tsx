import { useShop } from '@/src/context/ShopContext';
import { useRouter } from 'expo-router';
import {
  ArrowRight,
  Bell,
  CreditCard,
  Heart,
  HelpCircle,
  History,
  LogOut,
  MapPin,
  Package,
  Settings,
  Shield
} from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { wishlistCount, orderHistory } = useShop();

  const menuItems = [
    {
      title: t('My Orders'),
      icon: <Package size={24} color="#2196F3" />,
      onPress: () => router.push('/orders' as any),
      badge: orderHistory.length.toString(),
    },
    {
      title: t('Wishlist'),
      icon: <Heart size={24} color="#2196F3" />,
      onPress: () => router.push('/whishList' as any),
      badge: wishlistCount.toString(),
    },
    {
      title: t('Shipping Addresses'),
      icon: <MapPin size={24} color="#2196F3" />,
      onPress: () => router.push('/addresses' as any),
    },
    {
      title: t('Payment Methods'),
      icon: <CreditCard size={24} color="#2196F3" />,
      onPress: () => router.push('/payment-methods' as any),
    },
    {
      title: t('Order History'),
      icon: <History size={24} color="#2196F3" />,
      onPress: () => router.push('/order-history' as any),
    },
  ];

  const settingsItems = [
    {
      title: t('Notifications'),
      icon: <Bell size={24} color="#666" />,
      onPress: () => router.push('/notifications' as any),
    },
    {
      title: t('Privacy & Security'),
      icon: <Shield size={24} color="#666" />,
      onPress: () => router.push('/privacy' as any),
    },
    {
      title: t('Help & Support'),
      icon: <HelpCircle size={24} color="#666" />,
      onPress: () => router.push('/support' as any),
    },
    {
      title: t('Settings'),
      icon: <Settings size={24} color="#666" />,
      onPress: () => router.push('/settings' as any),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.editProfileButton}
          onPress={() => router.push('/edit-profile' as any)}
        >
          <Text style={styles.editProfileText}>{t('Edit Profile')}</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>{t('Orders')}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>{t('Addresses')}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>{t('Cards')}</Text>
        </View>
      </View>

      {/* Main Menu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('My Account')}</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <View style={styles.menuItemRight}>
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
              <ArrowRight size={20} color="#666" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Settings Menu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('Settings')}</Text>
        {settingsItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <ArrowRight size={20} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={24} color="#ff3b30" />
        <Text style={styles.logoutText}>{t('Logout')}</Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editProfileButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  editProfileText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  badge: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
    gap: 8,
  },
  logoutText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 16,
    marginBottom: 32,
  },
});