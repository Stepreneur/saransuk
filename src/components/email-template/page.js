import * as React from 'react';

export function EmailTemplate({
  firstName,
  massageType,
  duration,
  slot,
  price,
  orderId,
}) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f8f8', padding: '20px' }}>
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <div style={{ backgroundColor: '#ff7f50', color: '#fff', padding: '20px', textAlign: 'center' }}>
          <h1 style={{ margin: 0 }}>สลาญสุข ร้านนวดเพื่อคุณ</h1>
        </div>

        {/* Body */}
        <div style={{ padding: '30px', color: '#333' }}>
          <h2 style={{ color: '#ff7f50' }}>สวัสดี, {firstName}!</h2>
          <p>
            ขอบคุณที่เลือกใช้บริการที่ร้านสลาญสุข เราหวังว่าคุณจะมีประสบการณ์ที่ผ่อนคลายและสุขภาพดีขึ้น
          </p>
          <div style={{
            border: '1px solid #eee',
            borderRadius: 8,
            padding: 16,
            marginTop: 16,
            backgroundColor: '#fffaf7'
          }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>รายละเอียดการจอง</h3>
            <table style={{ width: '100%', fontSize: 14, color: '#333' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '6px 0', width: 160, color: '#666' }}>หมายเลขออเดอร์</td>
                  <td style={{ padding: '6px 0' }}><strong>{orderId || '-'}</strong></td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', color: '#666' }}>บริการ</td>
                  <td style={{ padding: '6px 0' }}>{massageType || '-'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', color: '#666' }}>ระยะเวลา</td>
                  <td style={{ padding: '6px 0' }}>{duration ? `${duration} นาที` : '-'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', color: '#666' }}>วันและเวลา</td>
                  <td style={{ padding: '6px 0' }}>{slot || '-'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', color: '#666' }}>ราคา</td>
                  <td style={{ padding: '6px 0' }}><strong style={{ color: '#0a7f2e' }}>{price ? `${price} บาท` : '-'}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <a
            href="https://your-spa-website.com"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#ff7f50',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '10px',
            }}
          >
            เยี่ยมชมเว็บไซต์
          </a>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: '#f0f0f0', padding: '15px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
          © 2025 ร้านสลาญสุข. All rights reserved.
        </div>
      </div>
    </div>
  );
}
