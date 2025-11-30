# 스윙 영상 업로드 웹앱 (Vite + React)

아이폰 Safari에서도 쓰기 편한 스윙 영상 업로드 전용 프론트엔드입니다.  
백엔드(Node.js + Express)가 `/api/upload`, `/api/files`를 제공한다는 가정으로 동작합니다.

## 주요 기능
- 단일 영상 선택(`input type="file" accept="video/*"`)
- 업로드 진행/완료/실패 메시지 표시
- 업로드 완료 시 목록 자동 갱신
- `/api/files` 호출로 업로드된 파일 목록 표시

## 개발 환경
- Node.js 18+ 권장
- Vite + React + TypeScript
- `/api` 프록시가 `http://localhost:3000`으로 설정됨(`vite.config.ts`)

## 실행 방법
```bash
npm install
npm run dev
# 브라우저에서 http://localhost:5173 접속
```

## 빌드
```bash
npm run build
# 결과물은 dist/ 에 생성. 배포 시 client-dist 로 이동하거나 서버에서 static 경로를 dist로 설정하세요.
```

## 백엔드 연동
- 업로드: `POST /api/upload` (multipart/form-data, 필드명 `video`)
- 파일 목록: `GET /api/files`
- 개발 시 Vite dev 서버의 `/api` 요청은 `http://localhost:3000`으로 프록시됩니다.

## 배포 메모
- 백엔드에서 `express.static`으로 빌드 결과물을 서빙한다고 가정.
- 빌드 산출물을 `client-dist` 등으로 옮길 경우 서버 static 경로를 맞춰주세요.
