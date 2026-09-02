# PROJECT STATUS — random-ppobgi

- 마지막 갱신: 2026-09-02
- 저장소 역할: 랜덤뽑기 웹서비스의 코드·배포·기술상태 원본
- 상위 상태 원본: 황제 Vault `자동 사업운영/바이브코딩/_INDEX.md`
- ChatGPT 실행창: `랜덤뽑기 본부`
- 표준 로컬 경로: `C:/Users/gsh41/Desktop/황제/자동 사업운영/바이브코딩/페이지형/random-ppobgi`

## 현재 상태

**v50 운영본 + 17개 언어 글로벌 공통 완제품 코드 반영 / 다국어 QA·실배포 확인 대기**

- 운영 주소: https://random-ppobgi.pages.dev/
- 배포 구조: Cloudflare Pages
- 8개 게임: 사다리 / 룰렛 / 제비 / 핀볼 / 경주 / 캡슐 / 슬롯 / 폭탄
- 게임 도구 5종 유지
- Production D1 익명 핵심행동 계측 활성화
- Google Search Console 등록·소유권 확인 완료

## 글로벌 다국어 — 2026-09-02

지원 언어는 한국어 포함 17개다.

- 한국어 `/`
- 영어 `/en/`
- 일본어 `/ja/`
- 스페인어 `/es/`
- 중국어 `/zh/`
- 프랑스어 `/fr/`
- 독일어 `/de/`
- 포르투갈어 `/pt/`
- 인도네시아어 `/id/`
- 힌디어 `/hi/`
- 폴란드어 `/pl/`
- 이탈리아어 `/it/`
- 네덜란드어 `/nl/`
- 터키어 `/tr/`
- 베트남어 `/vi/`
- 태국어 `/th/`
- 아랍어 `/ar/`

구조 원칙:

- 한국어판과 해외 경량판을 따로 만들지 않는다.
- 모든 언어가 동일한 한국어 본체의 8개 게임 + 게임 도구 코어를 사용하고 UI·동적 문구만 현지화한다.
- 언어별 기능 코드를 복제하지 않는다.
- IP 기반 강제 전환을 사용하지 않는다.

2026-09-02 수정:

- 과거 `full-i18n-safe.js` / `i18n-cleanup.js` / Cloudflare middleware가 서로 언어 선택기를 만들던 구조를 끊고 새 공통 런타임으로 통합
- 한국어 루트는 `ko-language.js`, 해외 완제품은 `global-i18n.js` + `global-i18n-dynamic.js` 사용
- 언어 선택기는 헤더 오른쪽 끝의 단일 `🌐 + select` 구조를 기준으로 함
- 16개 해외 언어의 정적 UI·주요 동적 결과·번호모드 표기·게임도구를 현지화
- `/about/`, `/guide/`, `/privacy/`, `/terms/`, `/contact/`는 `?lang=` 상태를 이어받아 현지화하는 `info-i18n.js` 추가
- 아랍어는 `dir=rtl` 적용
- language URL 응답에 `html lang`, 현지화 title/description, canonical, 17개 hreflang + x-default 구성
- `sitemap.xml`은 한국어 + 16개 해외 언어 URL을 모두 포함
- `.github/workflows/i18n-smoke.yml` 추가: JS 문법, 16개 route shell, 단일 i18n 런타임 경로, sitemap, hreflang 정적 점검

중요: 이 상태는 **코드 반영 상태**다. GitHub CI 완료와 실제 Cloudflare Pages의 대표 7개 언어 브라우저 검수가 끝나기 전까지 글로벌 완료로 판정하지 않는다.

## 운영 데이터

- 핵심 이벤트: `game_start`, `game_complete`, `reroll`, `exclude_reroll`
- Production D1: `random-ppobgi-analytics`
- Vault snapshot: `자동 사업운영/바이브코딩/페이지형/랜덤뽑기_analytics_latest.json`
- workflow: `hwangje-vault/.github/workflows/random-picker-analytics-snapshot.yml`
- workflow 기준 매일 00:20 KST에 최근 14일 aggregate를 갱신하도록 복구됨
- 이름·당첨내용·입력문구·사용자 ID·세션 ID·광고 ID·쿠키는 수집하지 않음
- 최초 검증 snapshot은 `game_start 8 / game_complete 6`으로 표본이 작아 제품 성과로 해석하지 않음

## 사고분리·검증 순서

한 실행창에서 연속 작업하더라도 다음 판단을 한 덩어리로 합치지 않는다.

> 실제 데이터 회수 → 사실 정리 → 원인 가설 → 변경 설계 → 구현 → 독립 QA·회귀검수 → 배포 → 다시 실제 데이터

- 구현자가 의도한 동작은 QA 증거가 아니다.
- 내부 QA 통과는 외부 사용성과·검색성과·수익성과가 아니다.
- 배포 후 실제 데이터가 이전 가설과 다르면 가설을 수정한다.

## 현재 병목

- 2026-09-02 다국어 smoke workflow가 생성되었으나 최신 실행의 최종 PASS는 아직 회수하지 못함
- 현재 ChatGPT 실행환경에서는 `random-ppobgi.pages.dev` 공개 URL 직접 열기가 허용되지 않아 한국어/영어/일본어/스페인어/중국어/포르투갈어/아랍어의 실제 Cloudflare 화면 검수를 아직 증명하지 못함
- 최신 main 커밋에 Cloudflare 배포 성공을 증명하는 GitHub commit status가 게시되지 않음
- 따라서 17개 언어 글로벌 확장은 `IMPLEMENTED / QA_PENDING / LIVE_DEPLOY_UNVERIFIED`로 취급
- 외부 사용 표본이 아직 작아 제품 개선·확대 판단 근거가 부족함
- QA·본인 테스트와 실제 외부 사용을 현재 집계만으로 완전히 분리하지 않음
- sitemap 재처리 성공 여부는 다음 검색 점검에서 재확인 필요

## 운영 원칙

- 기존 8개 게임의 결과 로직·애니메이션·효과음·모바일 경험을 근거 없이 임의 변경하지 않음
- 사용자 입력 내용을 분석 서버로 보내지 않음
- 실제 표본이 쌓이기 전 기능 추가를 성급하게 확정하지 않음
- 비용·광고·대규모 기능변경·수익화 방식 변경은 황제 Gate

## 다음 행동

1. 최신 `i18n-smoke`가 PASS하는지 회수
2. Cloudflare Pages 최신 main 배포 여부 확인
3. 실제 공개 페이지에서 최소 한국어/영어/일본어/스페인어/중국어/포르투갈어/아랍어를 열어 언어 선택기 1개, 헤더 오른쪽 위치, 한국어 잔존, 8개 게임, 게임 도구, 번호/이름, 실행·결과·재추첨, 모바일을 확인
4. 나머지 10개 언어는 코드·문자열 기준 전수검사
5. 실제 배포 QA까지 통과한 뒤에만 글로벌 완료로 상태 변경
