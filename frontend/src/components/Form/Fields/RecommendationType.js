import React from 'react';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <fieldset className="mb-5">
      <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Tipo de Recomendação <span aria-hidden="true">*</span>
        <span className="sr-only">(obrigatório)</span>
      </legend>
      <div className="flex flex-col gap-1 rounded-lg border border-gray-200 p-1.5 sm:flex-row sm:gap-2">
        <Checkbox
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          required
          onChange={() => onRecommendationTypeChange('SingleProduct')}
        >
          Produto Único
        </Checkbox>
        <Checkbox
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          required
          onChange={() => onRecommendationTypeChange('MultipleProducts')}
        >
          Múltiplos Produtos
        </Checkbox>
      </div>
    </fieldset>
  );
}

export default RecommendationType;
