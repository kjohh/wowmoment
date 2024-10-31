import mixpanel from 'mixpanel-browser';
import React, { useEffect } from 'react';
import { tracker, useTracking } from './TrackingManager';

const CoreMetricsTracking = () => {
  const { trackEvent } = useTracking();

  useEffect(() => {
    
  }, [trackEvent]);
    // 未來可能需要追蹤的核心指標可以加在這裡 
  return null;
};

export const CoreMetrics = {
  trackMemoryCreated: (memoryContent) => {
    tracker.track('Memory Created', {
      content_length: memoryContent.length,
      has_image: memoryContent.includes('image'),
      memory_type: 'text'
    });

    mixpanel.people.increment('total_memories');
  },

  trackMemoryViewed: (memoryId) => {
    tracker.track('Memory Viewed', {
      memory_id: memoryId
    });
  },

  trackMemoryDeleted: (memoryId) => {
    tracker.track('Memory Deleted', {
      memory_id: memoryId
    });
  }
};

export default CoreMetricsTracking;