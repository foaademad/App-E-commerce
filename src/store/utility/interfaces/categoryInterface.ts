export interface CategoryDto {
  id: string;
  providerType: string;
  isHidden: boolean;
  isInternal: boolean;
  isVirtual: boolean;
  updatedTime: string | null;
  nameEn: string;
  nameAr: string;
  externalId: string;
  parentId: string | null;
  children: CategoryDto[];
}

export interface CategoryApiResponse {
  message: string;
  isSuccess: boolean;
  statusCode: number;
  result: CategoryDto[];
}
