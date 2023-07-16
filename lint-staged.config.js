const path = require('path');

const nestSrcEslint = (fileNameList = []) => {
  const lintFileList = fileNameList
    .map((file) => path.relative(process.cwd(), file))
    .filter((file) => file.startsWith('src'));
  return lintFileList.length
    ? `eslint --fix ${lintFileList.join(' ')}`
    : 'echo nothing to lint !';
};

const nestSrcPrettier = (fileNameList = []) => {
  const relativeFileList = fileNameList.map((file) =>
    path.relative(process.cwd(), file).replace(/\\/g, '/'),
  );
  return `prettier --write ${relativeFileList.join(' ')}`;
};

module.exports = {
  '*.(js,ts,json,yaml)': nestSrcPrettier,
  '*.(ts)': [nestSrcEslint, () => 'npx tsc --noEmit'],
};
