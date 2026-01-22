'use client';

import JubileumPopup from './JubileumPopup';
import CookieBanner from './CookieBanner';

export default function ClientBanners() {
  return (
    <>
      <JubileumPopup disablePersistence={true} />
      <CookieBanner disablePersistence={true} />
    </>
  );
}
