import React from 'react';

export function AboutUsView() {
  // 전체 너비 사용 (width: 100%)
  return (
    <div className="menu-view" style={{ textAlign: 'left', width: '100%', lineHeight: '1.6', boxSizing: 'border-box' }}>
      
      {/* 0. 헤더 */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '3rem' }}>
          About Us
        </h2>
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
          Team 경로당 (Capstone Design Project)
        </p>
      </div>

      {/* 1. 프로젝트 개요 & 목적 */}
      <section style={{ marginBottom: '50px' }}>
        <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', color: '#1e3a8a' }}>
          📘 프로젝트 개요
        </h3>
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <p style={{ marginBottom: '15px' }}>
            본 프로젝트는 사용자가 업로드한 오디오 파일에서 <strong>드럼 사운드를 자동으로 인식하는 AI 시스템</strong>입니다.
          </p>
          <ul style={{ paddingLeft: '20px', color: '#4b5563' }}>
            <li>🎵 <strong>음원 분리:</strong> 오디오 파일에서 드럼 트랙만 정교하게 추출</li>
            <li>🥁 <strong>AI 분류:</strong> 3가지 클래스 (<strong>Kick, Snare, Hi-hat</strong>) 자동 인식</li>
            <li>🎼 <strong>악보 생성:</strong> 분석된 데이터를 기반으로 <strong>MIDI 파일</strong> 및 <strong>PDF 악보</strong> 자동 생성</li>
          </ul>
        </div>
      </section>

      {/* 3. 상세 기술 스택 (README 기반) */}
      <section style={{ marginBottom: '50px' }}>
        <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', color: '#1e3a8a' }}>
          🛠️ 사용 기술 스택
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
          {/* Backend */}
          <div style={{ background: '#f0fdf4', padding: '15px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
            <strong style={{ color: '#15803d', display: 'block', marginBottom: '5px' }}>Backend</strong>
            Python, Flask
          </div>
          {/* Frontend */}
          <div style={{ background: '#eff6ff', padding: '15px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
            <strong style={{ color: '#1d4ed8', display: 'block', marginBottom: '5px' }}>Frontend</strong>
            React, Vite, Axios
          </div>
          {/* AI Model */}
          <div style={{ background: '#fff7ed', padding: '15px', borderRadius: '12px', border: '1px solid #fed7aa' }}>
            <strong style={{ color: '#c2410c', display: 'block', marginBottom: '5px' }}>AI / Deep Learning</strong>
            TensorFlow (Keras), TFLite, MLflow, CNN (2D)
          </div>
          {/* Audio & Score */}
          <div style={{ background: '#faf5ff', padding: '15px', borderRadius: '12px', border: '1px solid #e9d5ff' }}>
            <strong style={{ color: '#7e22ce', display: 'block', marginBottom: '5px' }}>Audio & Score</strong>
            Demucs, Librosa, PrettyMIDI, Music21, MuseScor  e 3
          </div>
          {/* Infra */}
          <div style={{ background: '#ffffffff', padding: '15px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <strong style={{ color: '#374151', display: 'block', marginBottom: '5px' }}>Deployment</strong>
            Docker (NVIDIA CUDA 11.8)
          </div>
        </div>
      </section>

      {/* 4. 팀원 정보 (업데이트된 역할 반영) */}
      <section>
        <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', color: '#1e3a8a' }}>
          👥 Team 경로당
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95em' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #d1d5db' }}>
                <th style={{ padding: '12px', textAlign: 'left', width: '15%' }}>이름</th>
                <th style={{ padding: '12px', textAlign: 'left', width: '20%' }}>학번</th>
                <th style={{ padding: '12px', textAlign: 'left', width: '25%' }}>역할</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>상세 업무</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>윤상일</td>
                <td style={{ padding: '12px' }}>2020E7424</td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#d97706' }}>AI/ML</td>
                <td style={{ padding: '12px' }}>모델 설계 및 학습</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>양태양</td>
                <td style={{ padding: '12px' }}>2021E7411</td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#059669' }}>Frontend</td>
                <td style={{ padding: '12px' }}>UI 개발</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>최유진</td>
                <td style={{ padding: '12px' }}>2023E7518</td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#059669' }}>Frontend</td>
                <td style={{ padding: '12px' }}>UI 디자인</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>이준행</td>
                <td style={{ padding: '12px' }}>2020E7427</td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#2563eb' }}>Backend</td>
                <td style={{ padding: '12px' }}>AI, 풀스택 개발</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>정서영</td>
                <td style={{ padding: '12px' }}>2020U2329</td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#2563eb' }}>Backend</td>
                <td style={{ padding: '12px' }}>백엔드,프론트엔드 지원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ textAlign: 'center', fontSize: '0.9em', color: '#9ca3af', borderTop: '1px solid #e5e7eb', paddingTop: '40px' }}>
        <p>Copyright © 2025. Team 경로당. All Rights Reserved.</p>
      </div>
    </div>
  );
}