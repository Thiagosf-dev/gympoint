/* eslint-disable no-console */
import app from './app';
import CONFIG from '../globalConfig';

app.listen(CONFIG.PORT, () => {
  console.log(`${CONFIG.URL}${CONFIG.PORT}`);
});
