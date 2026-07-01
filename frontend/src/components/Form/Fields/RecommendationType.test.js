import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecommendationType from './RecommendationType';

describe('RecommendationType', () => {
  test('Agrupa os radios em um fieldset com legend', () => {
    render(<RecommendationType onRecommendationTypeChange={jest.fn()} />);

    const group = screen.getByRole('group', { name: /Tipo de Recomendação/ });
    expect(group).toBeInTheDocument();
  });

  test('Indica obrigatoriedade de forma acessível (texto sr-only)', () => {
    render(<RecommendationType onRecommendationTypeChange={jest.fn()} />);

    expect(screen.getByText('(obrigatório)')).toBeInTheDocument();
  });

  test('Ambos os radios possuem o atributo required', () => {
    render(<RecommendationType onRecommendationTypeChange={jest.fn()} />);

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    radios.forEach((radio) => expect(radio).toBeRequired());
  });

  test('Chama onRecommendationTypeChange com o valor correto ao selecionar cada opção', () => {
    const onRecommendationTypeChange = jest.fn();
    render(
      <RecommendationType onRecommendationTypeChange={onRecommendationTypeChange} />
    );

    const [singleProductRadio, multipleProductsRadio] = screen.getAllByRole('radio');

    fireEvent.click(singleProductRadio);
    expect(onRecommendationTypeChange).toHaveBeenCalledWith('SingleProduct');

    fireEvent.click(multipleProductsRadio);
    expect(onRecommendationTypeChange).toHaveBeenCalledWith('MultipleProducts');
  });
});
