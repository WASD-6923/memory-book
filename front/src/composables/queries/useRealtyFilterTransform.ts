import { LocationQuery } from 'vue-router'
export const useRealtyFilterTransform = (query: LocationQuery) => {
  return {
    address: query.address ?? undefined,
    categoryId: query.categoryId ?? undefined,
    description: query.description ?? undefined,
    legalStatuses: query.legalStatuses ?? undefined,
    name: query.name ?? undefined,
    priceGte: query.priceGte ? parseFloat(query.priceGte as string) : undefined,
    priceLte: query.priceLte ? parseFloat(query.priceLte as string) : undefined,
    statuses: query.statuses ?? undefined,
    cadastralNumber: query.cadastralNumber ?? undefined,
  }
}
