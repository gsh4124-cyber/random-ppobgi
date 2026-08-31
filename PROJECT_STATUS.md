# PROJECT STATUS — random-ppobgi

- 마지막 갱신: 2026-09-01
- 저장소 역할: 랜덤뽑기 웹서비스의 코드·배포·기술상태 원본
- 상위 영역: 황제 Vault `자동 사업운영/바이브코딩/랜덤뽑기/`
- ChatGPT 통합 관제: `자동 사업운영`
- ChatGPT 실행창: `랜덤뽑기 Work`
- 표준 로컬 경로: `C:/Users/gsh41/Desktop/황제/자동 사업운영/바이브코딩/랜덤뽑기/random-ppobgi`

## 현재 상태

**v50 운영 배포 / Production D1 익명 행동계측 활성화**

- 운영 주소: https://random-ppobgi.pages.dev/
- Cloudflare Pages 배포
- 8개 게임: 사다리 / 룰렛 / 제비 / 핀볼 / 경주 / 캡슐 / 슬롯 / 폭탄
- Production D1 익명 핵심행동 계측 활성화
- Google Search Console 등록·소유권 확인 완료

## 운영 데이터

- 핵심 이벤트: `game_start`, `game_complete`, `reroll`, `exclude_reroll`
- Production D1: `random-ppobgi-analytics`
- 최신 보존 snapshot: 황제 Vault `자동 사업운영/바이브코딩/랜덤뽑기/analytics_latest.json`
- 이름·당첨내용·입력문구·사용자 ID·세션 ID·광고 ID·쿠키는 수집하지 않음
- 최초 검증 snapshot은 `game_start 8 / game_complete 6`으로 표본이 작아 제품 성과로 해석하지 않음
- 2026-09-01 폴더 구조 단순화 과정에서 기존 Vault 일일 snapshot workflow는 제거됨. D1 자체 계측은 유지되지만 Vault snapshot 자동 갱신은 재연결 전까지 중단 상태

## 현재 병목

- 외부 사용 표본이 아직 작아 제품 개선·확대 판단 근거가 부족함
- QA·본인 테스트와 실제 외부 사용을 현재 집계만으로 완전히 분리하지 않음
- sitemap 재처리 성공 여부는 다음 검색 점검에서 재확인 필요
- Vault snapshot 자동 갱신 재연결 필요

## 운영 원칙

- 기존 8개 게임의 결과 로직·애니메이션·효과음·모바일 경험을 근거 없이 임의 변경하지 않음
- 사용자 입력 내용을 분석 서버로 보내지 않음
- 실제 표본이 쌓이기 전 기능 추가를 성급하게 확정하지 않음
- 비용·광고·대규모 기능변경·수익화 방식 변경은 황제 Gate

## 다음 행동

1. 현 운영본과 D1 익명 계측 유지
2. snapshot 자동 갱신 경로를 새 `바이브코딩/랜덤뽑기/` 구조에 맞게 재연결
3. 충분한 외부 표본이 생기면 게임별 시작·완료·재추첨 사용을 비교
4. 다음 Search Console 점검에서 sitemap 처리 성공 여부 확인
5. 의미 있는 구현·QA·배포 변화가 생기면 이 파일 갱신
