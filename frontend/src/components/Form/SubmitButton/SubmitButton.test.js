import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  test('Renderiza o texto informado', () => {
    render(<SubmitButton text="Obter recomendação" disabled={false} />);

    expect(
      screen.getByRole('button', { name: 'Obter recomendação' })
    ).toBeInTheDocument();
  });

  test('Fica desabilitado quando a prop disabled é true', () => {
    render(<SubmitButton text="Obter recomendação" disabled />);

    expect(screen.getByRole('button', { name: 'Obter recomendação' })).toBeDisabled();
  });

  test('Fica habilitado quando a prop disabled é false', () => {
    render(<SubmitButton text="Obter recomendação" disabled={false} />);

    expect(
      screen.getByRole('button', { name: 'Obter recomendação' })
    ).not.toBeDisabled();
  });

  test('Exibe classes Tailwind de foco visível', () => {
    render(<SubmitButton text="Obter recomendação" disabled={false} />);

    const button = screen.getByRole('button', { name: 'Obter recomendação' });
    expect(button.className).toEqual(expect.stringContaining('focus:ring-2'));
  });
});
