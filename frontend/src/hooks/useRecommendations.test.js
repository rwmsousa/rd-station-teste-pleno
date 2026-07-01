import { renderHook } from '@testing-library/react';
import useRecommendations from './useRecommendations';
import mockProducts from '../mocks/mockProducts';

describe('useRecommendations', () => {
  test('Expõe apenas getRecommendations, sem estado interno de recommendations', () => {
    const { result } = renderHook(() => useRecommendations(mockProducts));

    expect(Object.keys(result.current)).toEqual(['getRecommendations']);
    expect(typeof result.current.getRecommendations).toBe('function');
  });

  test('getRecommendations retorna o resultado calculado pelo recommendation.service para os produtos informados', () => {
    const { result } = renderHook(() => useRecommendations(mockProducts));

    const recommendations = result.current.getRecommendations({
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    });

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });
});
