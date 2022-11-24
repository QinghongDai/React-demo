export const extractSolutions = solutionsData => {
  if (!solutionsData || !solutionsData.links) {
    return [];
  }
  const solutions = solutionsData.links.filter(
    link => link.issues && link.issues.length > 0
  );
  return solutions;
};
