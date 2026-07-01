import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService - edge cases', () => {
  test('Retorna lista vazia para SingleProduct quando nenhum critério é selecionado', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toEqual([]);
  });

  test('Retorna lista vazia para MultipleProducts quando nenhum produto tem correspondência', () => {
    const formData = {
      selectedPreferences: ['Preferência inexistente'],
      selectedFeatures: ['Funcionalidade inexistente'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toEqual([]);
  });

  test('Retorna lista vazia quando selectedPreferences e selectedFeatures estão ausentes do formData', () => {
    const formData = {
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toEqual([]);
  });

  test('Retorna lista vazia quando selectedRecommendationType é uma string vazia (nenhum tipo selecionado)', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: [],
      selectedRecommendationType: '',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toEqual([]);
  });

  test('Retorna lista vazia quando selectedRecommendationType é um tipo desconhecido', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: [],
      selectedRecommendationType: 'UnknownType',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toEqual([]);
  });

  test('Não muta o array de produtos original', () => {
    const productsCopy = [...mockProducts];
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    recommendationService.getRecommendations(formData, mockProducts);

    expect(mockProducts).toEqual(productsCopy);
  });

  test('Empate para MultipleProducts preserva a ordem original de cadastro (não ordena por score)', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station Marketing',
      'RD Conversas',
    ]);
  });
});
