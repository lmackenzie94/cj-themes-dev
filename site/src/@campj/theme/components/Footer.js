import React from 'react';
// import Footer from 'cj-theme/src/components/Footer';
// only need to import the component if we want to extend it
import { Text } from '@campj/theme/src/system/index.js';

// overwrite
function Footer() {
  return <Text variant={'content'}>Testing</Text>;
}
export default Footer;

// extension
// mainly used for small changes/adding additonal props
// export default props => (
//   <Footer {...props} />
// );
