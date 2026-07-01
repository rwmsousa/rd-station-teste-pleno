import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Lista de Recomendações
      </h2>

      {recommendations.length === 0 && (
        <p className="rounded-lg border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500">
          Nenhuma recomendação encontrada.
        </p>
      )}

      <ul className="space-y-2">
        {recommendations.map((recommendation, index) => (
          <li
            key={index}
            className="rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 shadow-sm"
          >
            <p className="font-semibold text-brand-900">{recommendation.name}</p>
            {recommendation.category && (
              <span className="mt-1 inline-block rounded-full bg-brand-600 px-2 py-0.5 text-xs font-medium text-white">
                {recommendation.category}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
