import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Cloud, AlertCircle, CheckCircle } from 'lucide-react';

const FOLDER_NAME = 'Wow Moments Backups';

const BackupComponent = forwardRef((props, ref) => {
  const [backupStatus, setBackupStatus] = useState('idle');
  const [lastBackupDate, setLastBackupDate] = useState(null);
  const [googleApi, setGoogleApi] = useState(null);
  const [tokenClient, setTokenClient] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getOrCreateFolder = async (token) => {
    try {
      const searchResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      const searchResult = await searchResponse.json();

      if (searchResult.files && searchResult.files.length > 0) {
        return searchResult.files[0].id;
      }

      const metadata = {
        name: FOLDER_NAME,
        mimeType: 'application/vnd.google-apps.folder'
      };

      const createResponse = await fetch(
        'https://www.googleapis.com/drive/v3/files',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(metadata)
        }
      );

      const folder = await createResponse.json();
      return folder.id;
    } catch (error) {
      console.error('Folder creation error:', error);
      throw error;
    }
  };

  const uploadToGoogleDrive = async (data, token) => {
    try {
      const folderId = await getOrCreateFolder(token);

      const backupData = new Blob([JSON.stringify(data)], {type: 'application/json'});
      const metadata = {
        name: `wow-moments-backup-${new Date().toISOString()}.json`,
        mimeType: 'application/json',
        parents: [folderId]
      };

      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
      form.append('file', backupData);

      const response = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      return response.json();
    } catch (error) {
      console.error('Upload error:', error);
      if (error.message.includes('401') || error.message.includes('403')) {
        setAccessToken(null);
        if (tokenClient) {
          tokenClient.requestAccessToken();
        }
      }
      throw error;
    }
  };

  const handleBackupWithToken = useCallback(async (token) => {
    try {
      const moments = localStorage.getItem('wowMoments');
      if (!moments) {
        throw new Error('沒有可備份的資料');
      }

      await uploadToGoogleDrive(JSON.parse(moments), token);
      setLastBackupDate(new Date());
      setBackupStatus('success');
      return true;
    } catch (error) {
      console.error('備份失敗:', error);
      setBackupStatus('error');
      throw error;
    }
  }, []);

  const handleTokenResponse = useCallback(async (response) => {
    if (response.access_token) {
      setAccessToken(response.access_token);
      await handleBackupWithToken(response.access_token);
    }
  }, [handleBackupWithToken]);

  useEffect(() => {
    const loadGoogleAPI = () => {
      setIsLoading(true);
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const google = window.google;
        setGoogleApi(google);
        
        const client = google.accounts.oauth2.initTokenClient({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/drive.file',
          callback: handleTokenResponse,
          prompt: '',
        });
        
        setTokenClient(client);
        setIsLoading(false);
      };
      document.head.appendChild(script);

      return () => {
        const scriptElement = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (scriptElement) {
          document.head.removeChild(scriptElement);
        }
      };
    };

    loadGoogleAPI();
  }, [handleTokenResponse]);

  const handleBackup = useCallback(async () => {
    if (!googleApi || !tokenClient) {
      console.error('Google API not loaded');
      setBackupStatus('error');
      return false;
    }

    setBackupStatus('loading');
    
    try {
      if (accessToken) {
        await handleBackupWithToken(accessToken);
        return true;
      } else {
        tokenClient.requestAccessToken();
        return false;
      }
    } catch (error) {
      console.error('Failed to initialize Google client:', error);
      setBackupStatus('error');
      return false;
    }
  }, [googleApi, tokenClient, accessToken, handleBackupWithToken]);

  // Expose handleBackup method to parent component
  useImperativeHandle(ref, () => ({
    handleBackup
  }), [handleBackup]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">資料備份</h2>
      
      <div className="space-y-4">
        {lastBackupDate && (
          <div className="p-4 border rounded-lg bg-blue-50">
            <p className="font-medium">上次備份時間</p>
            <p>{lastBackupDate.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">備份位置：{FOLDER_NAME}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleBackup}
            disabled={backupStatus === 'loading' || !googleApi || isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg 
              ${(backupStatus === 'loading' || !googleApi || isLoading)
                ? 'bg-gray-300' 
                : 'bg-blue-600 hover:bg-blue-700'} 
              text-white`}
          >
            <Cloud className="h-4 w-4" />
            {isLoading ? 'Loading...' : 
             backupStatus === 'loading' ? '備份中...' : 
             '開始備份'}
          </button>
        </div>

        {backupStatus === 'success' && (
          <div className="p-4 border rounded-lg bg-green-50 text-green-800">
            <p className="font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              備份成功
            </p>
          </div>
        )}

        {backupStatus === 'error' && (
          <div className="p-4 border rounded-lg bg-red-50 text-red-800">
            <p className="font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              備份失敗
            </p>
            <p className="text-sm">請檢查網路連線後重試</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default BackupComponent;