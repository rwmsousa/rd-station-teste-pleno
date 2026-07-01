import React from 'react';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <fieldset className="mb-4">
      <legend className="text-lg font-bold mb-2">
        Tipo de Recomendação: <span aria-hidden="true">*</span>
        <span className="sr-only">(obrigatório)</span>
      </legend>
      <div className="flex items-center">
        <Checkbox
          id="SingleProduct"
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          required
          onChange={() => onRecommendationTypeChange('SingleProduct')}
          className="mr-2"
        />
        <label htmlFor="SingleProduct" className="mr-4">Produto Único</label>
        <Checkbox
          id="MultipleProducts"
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          required
          onChange={() => onRecommendationTypeChange('MultipleProducts')}
          className="mr-2"
        />
        <label htmlFor="MultipleProducts">Múltiplos Produtos</label>
      </div>
    </fieldset>
  );
}

export default RecommendationType;
