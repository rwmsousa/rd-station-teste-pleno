import React from 'react';
import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  test('Renderiza um input do tipo checkbox por padrão, repassando props via spread', () => {
    render(
      <Checkbox value="Preferência A" onChange={jest.fn()}>
        Preferência A
      </Checkbox>
    );

    const input = screen.getByLabelText('Preferência A');
    expect(input).toHaveAttribute('type', 'checkbox');
    expect(input).toHaveAttribute('value', 'Preferência A');
  });

  test('Repassa props adicionais como required e type via spread', () => {
    render(
      <Checkbox type="radio" name="recommendationType" required onChange={jest.fn()}>
        Produto Único
      </Checkbox>
    );

    const input = screen.getByLabelText('Produto Único');
    expect(input).toHaveAttribute('type', 'radio');
    expect(input).toBeRequired();
  });

  test('Exibe classes Tailwind de foco visível', () => {
    render(<Checkbox onChange={jest.fn()}>Preferência A</Checkbox>);

    const input = screen.getByLabelText('Preferência A');
    expect(input.className).toEqual(expect.stringContaining('focus:ring-2'));
  });
});
