import mixpanel from 'mixpanel-browser';

class TrackingManager {
  constructor() {
    this.environment = process.env.NODE_ENV;
    this.isLocalhost = this.checkIfLocalhost();
    this.init();
  }

  checkIfLocalhost() {
    return Boolean(
      window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    );
  }

  init() {
    mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
      debug: this.environment === 'development',
      ignore_dnt: this.environment === 'development',
      persistence: 'localStorage',
      api_host: 'https://api.mixpanel.com',
      track_pageview: true,
      property_blacklist: this.isLocalhost ? [] : ['$current_url', '$initial_referrer'],
    });

    mixpanel.register({
      environment: this.environment,
      is_localhost: this.isLocalhost,
      app_version: process.env.REACT_APP_VERSION || '1.0.0'
    });
  }

  track(eventName, properties = {}) {
    if (this.isLocalhost) {
      console.log('Tracking Event (Localhost):', {
        event: eventName,
        properties: properties
      });
    }

    const enhancedProperties = {
      ...properties,
      environment: this.environment,
      is_test_data: this.isLocalhost,
      timestamp: new Date()
    };

    mixpanel.track(eventName, enhancedProperties);
  }

  debugEvent(eventName, properties = {}) {
    if (this.isLocalhost) {
      console.group(`🔍 Debug Tracking: ${eventName}`);
      console.log('Properties:', properties);
      console.log('Environment:', this.environment);
      console.log('Is Localhost:', this.isLocalhost);
      console.groupEnd();
    }
  }
}

export const tracker = new TrackingManager();

export const useTracking = () => {
  return {
    trackEvent: (eventName, properties) => {
      tracker.track(eventName, properties);
      tracker.debugEvent(eventName, properties);
    }
  };
};

export default TrackingManager;