import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Form from './components/Form/Form';

jest.mock('./components/Form/Form');

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Exibe "Nenhuma recomendação encontrada." antes de qualquer submissão', () => {
    Form.mockImplementation(() => <div>Form mock</div>);

    render(<App />);

    expect(screen.getByText('Nenhuma recomendação encontrada.')).toBeInTheDocument();
  });

  test('Repassa onRecommendationsChange={setRecommendations} ao Form e reflete o novo resultado na RecommendationList, substituindo o anterior', () => {
    const firstResult = [{ id: 1, name: 'RD Station CRM' }];
    const secondResult = [{ id: 3, name: 'RD Conversas' }];

    Form.mockImplementation(({ onRecommendationsChange }) => (
      <div>
        <button onClick={() => onRecommendationsChange(firstResult)}>
          Simular primeira submissão
        </button>
        <button onClick={() => onRecommendationsChange(secondResult)}>
          Simular segunda submissão
        </button>
      </div>
    ));

    render(<App />);

    fireEvent.click(screen.getByText('Simular primeira submissão'));
    expect(screen.getByText('RD Station CRM')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Simular segunda submissão'));
    expect(screen.queryByText('RD Station CRM')).not.toBeInTheDocument();
    expect(screen.getByText('RD Conversas')).toBeInTheDocument();
  });

  test('Exibe aviso de critérios não selecionados quando o Form retorna lista vazia sem preferências/funcionalidades', () => {
    Form.mockImplementation(({ onRecommendationsChange }) => (
      <div>
        <button onClick={() => onRecommendationsChange([], false)}>
          Simular submissão sem critérios
        </button>
        <button onClick={() => onRecommendationsChange([], true)}>
          Simular submissão com critérios sem correspondência
        </button>
      </div>
    ));

    render(<App />);

    fireEvent.click(screen.getByText('Simular submissão sem critérios'));
    expect(
      screen.getByText(
        'Selecione ao menos uma preferência ou funcionalidade para receber uma recomendação.'
      )
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Simular submissão com critérios sem correspondência'));
    expect(screen.getByText('Nenhuma recomendação encontrada.')).toBeInTheDocument();
  });
});
