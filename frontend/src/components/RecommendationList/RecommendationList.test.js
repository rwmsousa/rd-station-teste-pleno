import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationList from './RecommendationList';

describe('RecommendationList', () => {
  test('Exibe "Nenhuma recomendação encontrada." quando a lista está vazia', () => {
    render(<RecommendationList recommendations={[]} />);

    expect(screen.getByText('Nenhuma recomendação encontrada.')).toBeInTheDocument();
  });

  test('Exibe aviso de critérios não selecionados quando showMissingCriteriaHint é true', () => {
    render(<RecommendationList recommendations={[]} showMissingCriteriaHint />);

    expect(
      screen.getByText(
        'Selecione ao menos uma preferência ou funcionalidade para receber uma recomendação.'
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Nenhuma recomendação encontrada.')
    ).not.toBeInTheDocument();
  });

  test('Ignora showMissingCriteriaHint quando há recomendações e exibe os cartões', () => {
    render(
      <RecommendationList
        recommendations={[{ id: 1, name: 'RD Station CRM', category: 'Vendas' }]}
        showMissingCriteriaHint
      />
    );

    expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
    expect(screen.getByText('Vendas')).toBeInTheDocument();
    expect(
      screen.queryByText(
        'Selecione ao menos uma preferência ou funcionalidade para receber uma recomendação.'
      )
    ).not.toBeInTheDocument();
  });
});
