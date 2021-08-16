export function postHtmlReplace(opt) {
  const { sourceHtmlMap = {}, htmlMap = {}, extname = 'html', imgPathPrefix } = opt;
  const sourceHtmlArr = Object.entries(sourceHtmlMap);

  return tree => {
    tree.walk(node => {
      if (node.attrs) {
        sourceHtmlArr.forEach(([k, v]) => {
          if (node.attrs[v] !== undefined) {
            const value = node.attrs[v];

            node.attrs[v] = null;
            node.attrs[htmlMap[k]] = value;
          }
        });
      }
      if (node.tag === 'include' || node.tag === 'import' && node.attrs) {
        const i = node.attrs.src.lastIndexOf('.');

        node.attrs.src = `${node.attrs.src.slice(0, i)}.${extname}`;
      }
      if (node.tag === 'image' && imgPathPrefix && node.attrs) {
        node.attrs.src = node.attrs.src.replace(/([../]*\/images\/)/g, `${imgPathPrefix}/images/`);
      }
      return node;
    });
  };
}
