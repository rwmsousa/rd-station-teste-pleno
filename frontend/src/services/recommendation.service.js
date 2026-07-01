// getRecommendations.js

const normalizeFormData = (formData = {}) => ({
  selectedPreferences: [],
  selectedFeatures: [],
  selectedRecommendationType: '',
  ...formData,
});

const scoreByPreferences = (product, criteria) => {
  const preferencesSet = new Set(product.preferences);
  return criteria.selectedPreferences.filter((preference) =>
    preferencesSet.has(preference)
  ).length;
};

const scoreByFeatures = (product, criteria) => {
  const featuresSet = new Set(product.features);
  return criteria.selectedFeatures.filter((feature) =>
    featuresSet.has(feature)
  ).length;
};

const SCORING_CRITERIA = [scoreByPreferences, scoreByFeatures];

const calculateProductScore = (product, criteria) =>
  SCORING_CRITERIA.reduce(
    (score, scorer) => score + scorer(product, criteria),
    0
  );

const buildScoredProducts = (products, criteria) =>
  products.map((product) => ({
    product,
    score: calculateProductScore(product, criteria),
  }));

const pickTopScoredProduct = (scoredProducts) => {
  let best = null;

  scoredProducts.forEach((scoredProduct) => {
    if (!best || scoredProduct.score >= best.score) {
      best = scoredProduct;
    }
  });

  if (!best || best.score === 0) {
    return [];
  }

  return [best.product];
};

const pickAllPositiveScoredProducts = (scoredProducts) =>
  scoredProducts
    .filter((scoredProduct) => scoredProduct.score > 0)
    .map((scoredProduct) => scoredProduct.product);

const RECOMMENDATION_STRATEGIES = {
  SingleProduct: pickTopScoredProduct,
  MultipleProducts: pickAllPositiveScoredProducts,
};

const getRecommendations = (formData, products) => {
  const criteria = normalizeFormData(formData);
  const scoredProducts = buildScoredProducts(products, criteria);
  const strategy = RECOMMENDATION_STRATEGIES[criteria.selectedRecommendationType];

  if (!strategy) {
    return [];
  }

  return strategy(scoredProducts);
};

const recommendationService = { getRecommendations };

export default recommendationService;
