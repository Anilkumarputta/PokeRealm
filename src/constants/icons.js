const importAll = (requireContext) => {
  const icons = {};
  requireContext.keys().forEach((key) => {
    const iconName = key.replace('./', '').replace('.png', '');
    icons[iconName] = requireContext(key);
  });
  return icons;
};

const icons = importAll(require.context('../assets/img/icons/types', false, /\.png$/));

export default icons;
