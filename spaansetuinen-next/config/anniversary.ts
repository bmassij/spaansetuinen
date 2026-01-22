/**
 * Anniversary configuration for 10 jaar Spaanse Tuin & Zo
 * 
 * This config controls all anniversary-related features across the site.
 * When enabled is false or the current date exceeds endDate, 
 * NO anniversary features will render.
 */

export const anniversaryConfig = {
  /**
   * Master switch - set to false to disable all anniversary features
   */
  enabled: true,
  
  /**
   * End date for the anniversary campaign (ISO format: YYYY-MM-DD)
   * After this date, all anniversary features automatically stop rendering
   */
  endDate: '2026-12-31',
  
  /**
   * Controls whether the popup should be shown sitewide
   */
  showPopup: true,
} as const;

/**
 * Helper function to check if anniversary features should be active
 */
export function isAnniversaryActive(): boolean {
  if (!anniversaryConfig.enabled) {
    return false;
  }
  
  const today = new Date();
  const end = new Date(anniversaryConfig.endDate);
  
  return today <= end;
}
