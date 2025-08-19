// Authentication utilities for Squarespace membership site access control

export function checkMembershipAccess(): boolean {
  // Skip authentication check in development
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return true; // Allow server-side rendering
  }

  const referrer = document.referrer;
  const currentDomain = window.location.hostname;
  const allowedDomains = (process.env.ALLOWED_DOMAINS || '').split(',');
  
  // Check if referrer contains any allowed domain
  const isFromMembershipSite = allowedDomains.some(domain => 
    referrer.toLowerCase().includes(domain.toLowerCase().trim())
  );
  
  // Special handling for Squarespace domains (including editor/preview)
  const isSquarespaceDomain = referrer.toLowerCase().includes('squarespace.com') || 
                             currentDomain.toLowerCase().includes('squarespace.com');
  
  // Allow access from Squarespace domains or approved domains
  const hasValidAccess = isFromMembershipSite || isSquarespaceDomain;

  if (!hasValidAccess) {
    showAccessDeniedMessage();
    return false;
  }

  return true;
}

function showAccessDeniedMessage(): void {
  if (typeof document !== 'undefined') {
    document.body.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 50px 20px;
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        background-color: #f9fafb;
        color: #251f21;
        text-align: center;
      ">
        <div style="
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          max-width: 400px;
          width: 100%;
        ">
          <h2 style="
            color: #B91329;
            margin-bottom: 16px;
            font-size: 1.5em;
            font-weight: bold;
          ">Access Restricted</h2>
          <p style="
            margin-bottom: 24px;
            line-height: 1.6;
            color: #374151;
          ">
            This content is only available to Bullard Nutrition members.
          </p>
          <a href="https://bullardnutrition.com/login" style="
            display: inline-block;
            background-color: #006a39;
            color: white;
            padding: 16px 32px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s ease;
          " onmouseover="this.style.backgroundColor='#005530'" onmouseout="this.style.backgroundColor='#006a39'">
            Member Login
          </a>
        </div>
      </div>
    `;
  }
}

// Initialize authentication check
export function initializeAuth(): void {
  if (typeof window !== 'undefined') {
    // Run check after DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkMembershipAccess);
    } else {
      checkMembershipAccess();
    }
  }
}
