import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';

export const PrivacyPolicy = () => {
  return (
    <LegalPageLayout 
      title="隱私權政策" 
      lastUpdated="2024 年 10 月 31 日"
    >
      <h2>1. 簡介</h2>
      <p>歡迎使用 Wow Moments（以下簡稱「本服務」）。本隱私權政策旨在說明我們如何收集、使用、儲存和保護您的個人資料。</p>

      <h2>2. 資料收集</h2>
      <h3>2.1 您主動提供的資料</h3>
      <ul>
        <li>Google 帳號資訊（用於登入和備份功能）</li>
        <li>您記錄的精彩時刻內容</li>
        <li>使用偏好設定</li>
      </ul>

      <h3>2.2 自動收集的資料</h3>
      <ul>
        <li>裝置資訊（作業系統、瀏覽器類型）</li>
        <li>Cookie 和類似技術收集的使用數據</li>
        <li>錯誤記錄和效能數據</li>
        <li>使用者行為數據，包括但不限於：
          <ul>
            <li>應用程式使用模式（如功能使用頻率、訪問時間）</li>
            <li>使用者與應用程式的互動方式</li>
            <li>內容創建和管理相關的統計資料</li>
          </ul>
        </li>
      </ul>

      <h3>2.3 分析與統計</h3>
      <p>為了提供更好的服務品質，我們會使用第三方分析工具來收集和分析使用數據。這些工具協助我們：</p>
      <ul>
        <li>了解使用者如何使用我們的服務</li>
        <li>識別可能的技術問題</li>
        <li>評估新功能的效果</li>
        <li>改善整體使用者體驗</li>
      </ul>

      <h2>3. 資料使用目的</h2>
      <p>我們收集和使用這些資料的目的包括：</p>
      <ul>
        <li>提供和維護服務</li>
        <li>開發和改善功能</li>
        <li>提供個人化的使用體驗</li>
        <li>分析服務使用情況以做出改善</li>
        <li>偵測和預防技術問題</li>
        <li>提供更好的客戶支援服務</li>
      </ul>

      <h2>4. 資料保護與控制</h2>
      <p>我們重視您的隱私權，因此：</p>
      <ul>
        <li>所有收集的數據都會經過去識別化處理</li>
        <li>僅收集必要的資訊來改善服務品質</li>
        <li>不會將個人識別資訊用於分析用途</li>
      </ul>

      <h2>5. 資料安全</h2>
      <p>我們採取適當的技術和組織措施來保護您的資料，包括：</p>
      <ul>
        <li>加密傳輸</li>
        <li>安全存儲</li>
        <li>定期安全評估</li>
      </ul>

      <h2>6. Cookie 使用</h2>
      <p>我們使用 Cookie 來：</p>
      <ul>
        <li>維持您的登入狀態</li>
        <li>記住您的偏好設定</li>
        <li>改善服務體驗</li>
        <li>收集使用統計資料</li>
      </ul>

      <h2>7. 您的權利</h2>
      <p>您擁有以下權利：</p>
      <ul>
        <li>存取您的個人資料</li>
        <li>更正不準確的資料</li>
        <li>刪除您的資料</li>
        <li>撤回同意</li>
        <li>匯出資料</li>
      </ul>

      <h2>8. 國際傳輸</h2>
      <p>您的資料可能會傳輸和儲存在其他國家，我們確保這些傳輸符合相關法律規定。</p>

      <h2>9. 兒童隱私</h2>
      <p>本服務不適用於 13 歲以下兒童，我們不會故意收集兒童的個人資料。</p>

      <h2>10. 變更通知</h2>
      <p>我們保留更新本隱私權政策的權利，重要變更將通過網站通知。</p>

      <h2>11. 聯絡方式</h2>
      <p>如有隱私相關問題，請聯絡：</p>
      <ul>
        <li>Email: kyledesign312@gmail.com</li>
      </ul>
      <h2>12. 使用者選擇與控制</h2>
      <p>我們尊重您對個人資料的控制權：</p>
      <ul>
        <li>您可以在應用程式設定中：
          <ul>
            <li>查看我們收集的資料類型</li>
            <li>選擇是否參與使用分析</li>
            <li>調整資料收集的範圍</li>
            <li>要求匯出或刪除您的資料</li>
          </ul>
        </li>
      </ul>
    </LegalPageLayout>
  );
};