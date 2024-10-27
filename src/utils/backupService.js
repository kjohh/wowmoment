export async function uploadToGoogleDrive(data, accessToken) {
    const backupData = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const metadata = {
      name: `wow-moments-backup-${new Date().toISOString()}.json`,
      mimeType: 'application/json'
    };
  
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('file', backupData);
  
    try {
      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: form
      });
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      return response.json();
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }
  
  export async function getLatestBackup(accessToken) {
    try {
      const response = await fetch(
        'https://www.googleapis.com/drive/v3/files?q=name contains "wow-moments-backup"&orderBy=createdTime desc&pageSize=1',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to get backup files');
      }
  
      const data = await response.json();
      if (data.files?.length > 0) {
        const fileId = data.files[0].id;
        const fileResponse = await fetch(
          `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          }
        );
  
        if (!fileResponse.ok) {
          throw new Error('Failed to get backup content');
        }
  
        return fileResponse.json();
      }
      return null;
    } catch (error) {
      console.error('Backup retrieval error:', error);
      throw error;
    }
  }