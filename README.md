# 💰 부자될거지(Poor-To-Rich)
> **차트를 통해 소비·수입 흐름을 한눈에 확인하고 관리할 수 있는 웹 기반 가계부**

<br/>

## 🧠 기획 의도
- 단순 기록을 넘어 **소비 습관을 분석하고 개선할 수 있는 도구**를 만들고자 시작
- 반복되는 고정 지출/수입도 관리할 수 있도록 반복 가계부 기능 추가
- 앱처럼 동작하도록 PWA 적용 → 설치형 UX 제공

<br/>

## 🔗 배포 링크
https://www.poortorich.site/

<br/>

## ✨ 주요 기능

- 🔐 로그인/회원가입 (JWT 인증 기반)
- 💰 지출/수입 내역 등록 및 목록 조회
- 📊 주간/월간 소비 통계 시각화 (Recharts)
- 🧾 무한 스크롤 적용
- ✅ 실시간 폼 유효성 검사 (React Hook Form + Zod)
- 🧪 Vitest를 활용한 테스트 환경 구성
- 📱 PWA 적용

<br/>

## 📸 시연 GIF 
#### 🔐 회원가입: 아이디,닉네임 중복 검사 / 이메일 인증
<div>
 <img src="https://github.com/user-attachments/assets/f7ac7242-72fd-4386-bd68-f90f4af7fc6b" width="250"/>
</div>

<br/>

#### 📅 캘린더 및 상세 내역 조회
- 주별 상세내역 조회 시 무한 스크롤 적용
<table>
  <tr>
    <td align="center">
      <p>📆 달력형</p>
      <img src="https://github.com/user-attachments/assets/1ca01c52-bd20-45d9-b67d-792ad9306670" width="250"/>
    </td>
    <td align="center" colspan="2">
      <p>📂 월별/주별 조회</p>
      <img src="https://github.com/user-attachments/assets/07065f26-d64c-4450-b379-e2f129e34ed8" width="300"/>
    </td>
  </tr>
</table>

<br/>

#### ✏️ 가계부 추가/수정/삭제
<table>
  <tr>
    <td align="center">
      <p>➕ 추가</p>
      <img src="https://github.com/user-attachments/assets/45403856-0292-47c3-b144-659d18d67280" width="250"/>
    </td>
    <td align="center">
      <p>✏️ 수정</p>
      <img src="https://github.com/user-attachments/assets/cf5896a8-6731-4b77-ad70-413ce811d2b1" width="250"/>
    </td>
    <td align="center">
      <p>🗑️ 삭제</p>
      <img src="https://github.com/user-attachments/assets/94922f5d-6872-4fd1-baa0-00a32182f12e" width="250"/>
    </td>
  </tr>
</table>

<br/>

#### ♻️ 반복 가계부 추가/수정/삭제
- 수정/삭제 3가지 옵션 제공 : "이 내역에만 적용" , "이후 내역에도 적용", "모든 내역에 적용"
<table>
  <tr>
    <td align="center">
      <p>➕ 반복 가계부 추가</p>
      <img src="https://github.com/user-attachments/assets/ee9d2d10-e524-4ddd-a946-96bd41dda423" width="250"/>
    </td>
    <td align="center">
      <p>✏️ 반복 가계부 수정</p>
      <img src="https://github.com/user-attachments/assets/0b4e8d11-2f70-4d4e-ac55-e06d47406a2a" width="250"/>
    </td>
    <td align="center">
      <p>🗑️ 반복 가계부 삭제</p>
      <img src="https://github.com/user-attachments/assets/34eea243-f1b4-4577-aaa3-acd0c49c4468" width="250"/>
    </td>
  </tr>
</table>

<br/>

#### 📊 월별/연별 소비,수입 통계 시각화
- 상세 차트 내역 조회시 무한 스크롤 적용
<table>
  <tr>
    <td align="center">
      <p>📈 월별/연별 차트 조회</p>
      <img src="https://github.com/user-attachments/assets/debbdf01-4297-409d-a7b6-0e41df8dc849" width="250"/>
    </td>
    <td align="center">
      <p>📊 월별 상세 차트 조회</p>
      <img src="https://github.com/user-attachments/assets/3347a368-5877-4136-a3fc-59201aa6d238" width="250"/>
    </td>
    <td align="center">
      <p>📊 연별 상세 차트 조회</p>
      <img src="https://github.com/user-attachments/assets/8b46df69-0300-42ab-af6a-87a9a1a2989e" width="250"/>
    </td>
  </tr>
</table>

<br/>

#### 📱 PWA 설치 안내 모달
- 처음 접속 했을 때 1회 노출
<table>
  <tr>
    <td align="center">
      <p>📌 데스크톱 설치 안내</p>
      <img src="https://github.com/user-attachments/assets/f3d0fc48-a6b1-413d-92ad-245cf02445c8" width="250"/>
    </td>
    <td align="center">
      <p>📱 ios 설치 안내</p>
      <img src="https://github.com/user-attachments/assets/6e531dd8-eaee-47bc-8a5c-c04624507c61" width="250"/>
    </td>
    <td align="center">
      <p>🌐 안드로이드 설치 안내</p>
      <img src="https://github.com/user-attachments/assets/193eec31-8203-4cce-8789-bc2a51503cd8" width="250"/>
    </td>
  </tr>
</table>

<br/>

## 🚀 기술 스택

### 💻 FrontEnd

<div>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"/>
<img src="https://img.shields.io/badge/pnpm-CB3837?style=for-the-badge&logo=pnpm&logoColor=white"/>

<img src="https://img.shields.io/badge/Reacthookform-EC5990?style=for-the-badge&logo=React-hook-form&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white"/>

<img src="https://img.shields.io/badge/Reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/Zustand-FEC111?style=for-the-badge&logo=Zustand&logoColor=white"/>
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>

<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img src="https://img.shields.io/badge/Recharts-8884d8?style=for-the-badge&logo=Recharts&logoColor=white"/>

<img src="https://img.shields.io/badge/Storybook-FF1154?style=for-the-badge&logo=Storybook&logoColor=white"/>
<img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=Vitest&logoColor=white"/>
</div>

### 협업 툴

<div>
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/notion-FFFFFB?style=for-the-badge&logo=notion&logoColor=black">
 <img src="https://img.shields.io/badge/figma-EF2D5E?style=for-the-badge&logo=figma&logoColor=black">
</div>

<br/>

## 팀원

### 💻 FrontEnd
| <a href=https://github.com/woic-ej><img src="https://avatars.githubusercontent.com/u/77326820?v=4" width=100px/><br/><sub><b>@woic-ej</b></sub></a><br/> 
|:----------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                                                                           최은진                                                                           |

### 💻 BackEnd
| <a href=https://github.com/sseen2><img src="https://avatars.githubusercontent.com/u/59137639?v=4" width=100px/><br/><sub><b>@sseen2</b></sub></a><br/> | <a href=https://github.com/belight2><img src="https://avatars.githubusercontent.com/u/112684671?v=4" width=100px/><br/><sub><b>@belight2</b></sub></a><br/> |
|:----------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                                                                           김세은                                                                           |                                                                            최준혁                                                                             |
<br/>
