# PROJECT STATUS — random-ppobgi

- 마지막 갱신: 2026-09-01
- 저장소 역할: 랜덤뽑기 웹서비스의 코드·배포·기술상태 원본
- 상위 상태 원본: 황제 Vault `자동 사업운영/바이브코딩/_INDEX.md`
- ChatGPT 통합 관제: `자동 사업운영`
- ChatGPT 실행창: `랜덤뽑기 Work`
- 표준 로컬 경로: `C:/Users/gsh41/Desktop/황제/자동 사업운영/바이브코딩/random-ppobgi`

## 현재 상태

**v50 운영 배포 / Production D1 익명 행동계측 활성화 / Vault 일일 aggregate snapshot 경로 복구**

- 운영 주소: https://random-ppobgi.pages.dev/
- Cloudflare Pages 배포
- 8개 게임: 사다리 / 룰렛 / 제비 / 핀볼 / 경주 / 캡슐 / 슬롯 / 폭탄
- Production D1 익명 핵심행동 계측 활성화
- Google Search Console 등록·소유권 확인 완료

## 운영 데이터

- 핵심 이벤트: `game_start`, `game_complete`, `reroll`, `exclude_reroll`
- Production D1: `random-ppobgi-analytics`
- Vault snapshot: `자동 사업운영/바이브코딩/랜덤뽑기_analytics_latest.json`
- workflow: `hwangje-vault/.github/workflows/random-picker-analytics-snapshot.yml`
- workflow 기준 매일 00:20 KST에 최근 14일 aggregate를 갱신하도록 복구됨
- 이름·당첨내용·입력문구·사용자 ID·세션 ID·광고 ID·쿠키는 수집하지 않음
- 최초 검증 snapshot은 `game_start 8 / game_complete 6`으로 표본이 작아 제품 성과로 해석하지 않음

## 사고분리·검증 순서

한 실행창에서 연속 작업하더라도 다음 판단을 한 덩어리로 합치지 않는다.

> 실제 데이터 회수 → 사실 정리 → 원인 가설 → 변경 설계 → 구현 → 독립 QA·회귀검수 → 배포 → 다시 실제 데이터

- 데이터 수치는 먼저 사실로만 정리하고, 원인 설명은 별도 가설로 둔다.
- 개선 아이디어가 떠올랐다는 이유로 성과 원인이 확인됐다고 처리하지 않는다.
- 구현자가 의도한 동작은 QA 증거가 아니다. QA는 실제 실행 결과와 기존 기능 회귀를 다시 확인한다.
- 내부 QA 통과는 외부 사용성과·검색성과·수익성과가 아니다.
- 배포 후 실제 데이터가 이전 가설과 다르면 가설을 수정한다.

## 현재 병목

- 외부 사용 표본이 아직 작아 제품 개선·확대 판단 근거가 부족함
- QA·본인 테스트와 실제 외부 사용을 현재 집계만으로 완전히 분리하지 않음
- sitemap 재처리 성공 여부는 다음 검색 점검에서 재확인 필요
- 복구된 snapshot workflow의 다음 실제 실행 성공 여부는 첫 실행 뒤 확인 필요

## 운영 원칙

- 기존 8개 게임의 결과 로직·애니메이션·효과음·모바일 경험을 근거 없이 임의 변경하지 않음
- 사용자 입력 내용을 분석 서버로 보내지 않음
- 실제 표본이 쌓이기 전 기능 추가를 성급하게 확정하지 않음
- 비용·광고·대규모 기능변경·수익화 방식 변경은 황제 Gate
- 주간 유지보수와 월간 비교개선은 황제 상황실의 통합 정기점검에서 관리

## 다음 행동

1. 현 운영본과 D1 익명 계측 유지
2. 복구된 snapshot workflow의 다음 실행 결과 확인
3. 충분한 외부 표본이 생기면 게임별 시작·완료·재추첨 사용 비교
4. 다음 Search Console 점검에서 sitemap 처리 성공 여부 확인
5. 의미 있는 구현·QA·배포 변화가 생기면 이 파일 갱신
