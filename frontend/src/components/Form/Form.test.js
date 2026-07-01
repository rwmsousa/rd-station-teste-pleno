import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import useProducts from '../../hooks/useProducts';

jest.mock('../../hooks/useProducts');

describe('Form', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Exibe indicação de carregamento (role="status") enquanto os dados ainda não chegaram', () => {
    useProducts.mockReturnValue({
      preferences: [],
      features: [],
      products: [],
      isLoading: true,
      error: null,
    });

    render(<Form onRecommendationsChange={jest.fn()} />);

    expect(screen.getByRole('status')).toHaveTextContent('Carregando produtos...');
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });

  test('Exibe mensagem de erro (role="alert") quando o carregamento falha', () => {
    useProducts.mockReturnValue({
      preferences: [],
      features: [],
      products: [],
      isLoading: false,
      error: 'Não foi possível carregar os produtos. Tente novamente mais tarde.',
    });

    render(<Form onRecommendationsChange={jest.fn()} />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Não foi possível carregar os produtos. Tente novamente mais tarde.'
    );
  });

  test('Renderiza o formulário quando os dados carregam com sucesso', () => {
    useProducts.mockReturnValue({
      preferences: ['Automação de marketing'],
      features: ['Rastreamento de interações com clientes'],
      products: [],
      isLoading: false,
      error: null,
    });

    render(<Form onRecommendationsChange={jest.fn()} />);

    expect(
      screen.getByRole('button', { name: 'Obter recomendação' })
    ).toBeInTheDocument();
  });

  test('Botão de submissão inicia desabilitado e habilita ao selecionar um tipo de recomendação', () => {
    useProducts.mockReturnValue({
      preferences: [],
      features: [],
      products: [],
      isLoading: false,
      error: null,
    });

    render(<Form onRecommendationsChange={jest.fn()} />);

    const submitButton = screen.getByRole('button', { name: 'Obter recomendação' });
    expect(submitButton).toBeDisabled();

    const [singleProductRadio] = screen.getAllByRole('radio');
    fireEvent.click(singleProductRadio);

    expect(submitButton).not.toBeDisabled();
  });

  test('Chama onRecommendationsChange com o resultado da recomendação ao submeter', () => {
    useProducts.mockReturnValue({
      preferences: [],
      features: [],
      products: [
        {
          id: 1,
          name: 'RD Conversas',
          category: 'Omnichannel',
          preferences: ['Integração com chatbots'],
          features: [],
        },
      ],
      isLoading: false,
      error: null,
    });

    const onRecommendationsChange = jest.fn();

    render(<Form onRecommendationsChange={onRecommendationsChange} />);

    const [singleProductRadio] = screen.getAllByRole('radio');
    fireEvent.click(singleProductRadio);
    fireEvent.click(screen.getByRole('button', { name: 'Obter recomendação' }));

    expect(onRecommendationsChange).toHaveBeenCalledTimes(1);
    expect(onRecommendationsChange).toHaveBeenCalledWith([]);
  });

  test('Substitui integralmente o resultado anterior a cada nova submissão', () => {
    useProducts.mockReturnValue({
      preferences: ['Integração com chatbots'],
      features: [],
      products: [
        {
          id: 1,
          name: 'RD Conversas',
          category: 'Omnichannel',
          preferences: ['Integração com chatbots'],
          features: [],
        },
      ],
      isLoading: false,
      error: null,
    });

    const onRecommendationsChange = jest.fn();

    render(<Form onRecommendationsChange={onRecommendationsChange} />);

    const [singleProductRadio] = screen.getAllByRole('radio');
    fireEvent.click(singleProductRadio);
    fireEvent.click(screen.getByLabelText('Integração com chatbots'));

    const submitButton = screen.getByRole('button', { name: 'Obter recomendação' });
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(onRecommendationsChange).toHaveBeenCalledTimes(2);
    expect(onRecommendationsChange.mock.calls[0][0]).toHaveLength(1);
    expect(onRecommendationsChange.mock.calls[1][0]).toHaveLength(1);
  });
});
