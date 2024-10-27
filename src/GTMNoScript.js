import React from 'react';

const GTMNoScript = () => (
  <noscript>
    <iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-MQF69K3"
      height="0"
      width="0"
      style={{ display: 'none', visibility: 'hidden' }}
      title="Google Tag Manager NoScript"  // 加入 title 屬性來解決 accessibility 警告
    />
  </noscript>
);

export default GTMNoScript;