import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations ] = useState([])

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-gray-100 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Recomendador de Produtos RD Station
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
            Selecione suas preferências e funcionalidades desejadas e receba recomendações
            de produtos RD Station personalizadas para o seu negócio.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 rounded-2xl bg-white/60 p-4 shadow-sm ring-1 ring-black/5 sm:p-8 md:grid-cols-2">
          <div>
            <Form onRecommendationsChange={setRecommendations} />
          </div>
          <div>
            <RecommendationList recommendations={recommendations} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
