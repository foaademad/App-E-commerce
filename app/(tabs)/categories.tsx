import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesApi } from '../../src/store/api/categoryApi';
import { getallProductByCategoryId } from '../../src/store/api/productApi';
import { RootState } from '../../src/store/store';
import { CategoryDto } from '../../src/store/utility/interfaces/categoryInterface';

interface CategoryItemProps {
  category: CategoryDto;
  level: number;
  onPress: (category: CategoryDto) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, level, onPress }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  const handlePress = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onPress(category);
    }
  };

  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { paddingLeft: 20 + level * 24, backgroundColor: level === 0 ? '#fff' : '#eaf6fb', borderRadius: 18, marginVertical: 6, shadowOpacity: 0.15 },
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.categoryContent}>
          <Ionicons name={hasChildren ? 'folder-open-outline' : 'pricetag-outline'} size={22} color={level === 0 ? '#36c7f6' : '#2c3e50'} style={{ marginRight: 10 }} />
          <Text style={styles.categoryName}>
            {category.nameEn || category.name}
          </Text>
          {hasChildren && (
            <Ionicons
              name={isExpanded ? 'chevron-down' : 'chevron-forward'}
              size={20}
              color="#36c7f6"
            />
          )}
        </View>
      </TouchableOpacity>

      {isExpanded && hasChildren && (
        <View style={styles.subCategoriesContainer}>
          {category.children.map((child, index) => (
            <CategoryItem
              key={child.id || `${category.id}-child-${index}`}
              category={child}
              level={level + 1}
              onPress={onPress}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default function CategoriesScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { categories, loading, error } = useSelector((state: RootState) => state.category);

  const mainCategoriesWithChildren = useMemo(
    () =>
      categories.filter(
        (category) =>
          !category.parentId && category.children && category.children.length > 0
      ),
    [categories]
  );

  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(mainCategoriesWithChildren);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredCategories(mainCategoriesWithChildren);
    } else {
      const lower = search.trim().toLowerCase();
      setFilteredCategories(
        mainCategoriesWithChildren.filter(
          (cat) =>
            (cat.nameEn && cat.nameEn.toLowerCase().includes(lower)) ||
            (cat.name && cat.name.toLowerCase().includes(lower))
        )
      );
    }
  }, [search, mainCategoriesWithChildren]);

  useEffect(() => {
    dispatch(getCategoriesApi() as any);
  }, [dispatch]);

  const handleCategoryPress = (category: CategoryDto) => {
    if (!category.children?.length) {
      const categoryId = category.id;
      console.log("Selected categoryId: ", categoryId);
      if (categoryId) {
        dispatch(getallProductByCategoryId(categoryId) as any);
        router.push('category-products' as any);
      }
    }
  };

  const renderCategory = ({ item }: { item: CategoryDto }) => (
    <CategoryItem
      category={item}
      level={0}
      onPress={handleCategoryPress}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#36c7f6" />
        <Text style={styles.loadingText}>Loading categories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading categories: {error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(getCategoriesApi() as any)}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="grid-outline" size={28} color="#fff" style={{ position: 'absolute', left: 24, top: 62 }} />
        <Text style={styles.headerTitle}>Categories</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#36c7f6" style={{ marginHorizontal: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a category..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {filteredCategories.length > 0 ? (
        <FlatList
          data={filteredCategories}
          renderItem={renderCategory}
          keyExtractor={(item, index) => item.id || `category-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="grid-outline" size={64} color="#36c7f6" style={{ marginBottom: 8 }} />
          <Text style={styles.emptyText}>No matching categories</Text>
          <Text style={styles.emptySubText}>Try searching with a different name or check if categories exist</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#36c7f6',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#36c7f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -24,
    marginBottom: 8,
    borderRadius: 16,
    paddingHorizontal: 8,
    shadowColor: '#36c7f6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#2c3e50',
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#2c3e50',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#36c7f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
    paddingTop: 8,
  },
  categoryContainer: {
    marginBottom: 2,
  },
  categoryItem: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingRight: 20,
    borderBottomWidth: 0,
    marginHorizontal: 16,
    marginVertical: 2,
    borderRadius: 18,
    shadowColor: '#36c7f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  categoryName: {
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    color: '#2c3e50',
    flex: 1,
    marginLeft: 2,
  },
  subCategoriesContainer: {
    backgroundColor: '#eaf6fb',
    marginHorizontal: 24,
    marginTop: 2,
    borderRadius: 12,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#36c7f6',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#2c3e50',
    textAlign: 'center',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
});
