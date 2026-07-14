import type { Config } from 'postcss-load-config';

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const config: Config = {
    plugins: [autoprefixer(), cssnano()],
};

export default config;
