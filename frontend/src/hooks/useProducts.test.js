import { renderHook, waitFor } from '@testing-library/react';
import useProducts from './useProducts';
import getProducts from '../services/product.service';

jest.mock('../services/product.service');

describe('useProducts', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('Inicia com isLoading true e error null', () => {
    getProducts.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useProducts());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  test('Popula products/preferences/features e encerra o carregamento em caso de sucesso', async () => {
    const products = [
      {
        id: 1,
        name: 'RD Station CRM',
        category: 'Vendas',
        preferences: ['Preferência A', 'Preferência B'],
        features: ['Funcionalidade A', 'Funcionalidade B'],
      },
    ];
    getProducts.mockResolvedValue(products);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.products).toEqual(products);
    expect(result.current.preferences).toEqual(
      expect.arrayContaining(['Preferência A', 'Preferência B'])
    );
    expect(result.current.features).toEqual(
      expect.arrayContaining(['Funcionalidade A', 'Funcionalidade B'])
    );
  });

  test('Define mensagem de erro amigável e encerra o carregamento quando a busca falha', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const technicalError = new Error('Network Error');
    getProducts.mockRejectedValue(technicalError);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe(
      'Não foi possível carregar os produtos. Tente novamente mais tarde.'
    );
    expect(result.current.products).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao obter os produtos:',
      technicalError
    );
  });
});
