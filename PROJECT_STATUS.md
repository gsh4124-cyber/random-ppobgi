# PROJECT STATUS — random-ppobgi

- 마지막 갱신: 2026-09-02
- 저장소 역할: 랜덤뽑기 웹서비스의 코드·배포·기술상태 원본
- 상위 상태 원본: 황제 Vault `자동 사업운영/바이브코딩/_INDEX.md`
- ChatGPT 실행창: `랜덤뽑기 본부`
- 표준 로컬 경로: `C:/Users/gsh41/Desktop/황제/자동 사업운영/바이브코딩/페이지형/random-ppobgi`

## 현재 상태

**v50 운영본 + 17개 언어 글로벌 공통 완제품 구현 / 정적 QA PASS / Chromium 다국어 QA PASS / 실제 Cloudflare 최신 배포 확인 대기**

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
- 모든 언어가 동일한 `index.html`의 8개 게임 + 게임 도구 코어를 사용하고 UI·동적 문구만 현지화한다.
- 언어별 기능 코드를 복제하지 않는다.
- IP 기반 강제 전환을 사용하지 않는다.

현재 활성 구조:

- 해외 완제품 로더: `full-app-loader.js`
- 16개 해외 언어 카탈로그: `locales.js`
- 공통 해외 현지화 런타임: `i18n-v2.js`
- 단일 언어 선택기: `language-switch.js`
- 정보·법적 페이지 현지화 데이터: `info-locales.js`
- 정보 페이지 런타임: `info-page.js`
- 자동 검수: `.github/workflows/i18n-smoke.yml` + `tests/i18n-browser-smoke.mjs`

2026-09-02 최종 수정·검증:

- 과거 중복 언어 선택기 및 서로 경쟁하던 번역 레이어를 정리하고 공통 선택기/공통 런타임 구조로 통합
- 언어 선택기는 기존 헤더 오른쪽 끝에 `🌐 + 현재 언어` 형태로 하나만 생성
- 현재 언어를 선택기에 표시하고 동일 완제품의 해당 언어 URL로 이동
- 16개 해외 언어의 정적 UI, 동적 게임 결과·진행문구, 게임도구, 접근성 `aria-label/title/placeholder`를 현지화
- 동적으로 다시 생성되던 8개 게임명도 현지어로 재치환
- 폭탄 시간 단위 및 직접 입력 접근성 문구 등 잔존 한국어 수정
- 해외 정보 링크는 각 언어의 `/LANG/about/`, `/LANG/guide/`, `/LANG/privacy/`, `/LANG/terms/`, `/LANG/contact/` 경로를 유지
- 아랍어는 RTL 적용
- 언어 URL에 `html lang`, 현지화 title/description, canonical, hreflang + x-default 구조 적용
- `sitemap.xml`에서 한국어 + 16개 해외 언어 URL 검증

## QA 결과

### 정적 QA — PASS

GitHub Actions `i18n-smoke` 최신 검수에서 다음 항목이 모두 PASS했다.

- JavaScript syntax
- 16개 해외 locale catalog 존재
- 16개 language route shell
- 단일 활성 localization runtime path
- 핵심 기능 localization key
- sitemap 17개 언어 URL
- SEO language alternate

### Chromium 브라우저 QA — PASS

GitHub Actions run `33622411890` / browser job `100222229034`에서 PASS했다.

- 16개 해외 언어 초기 화면 전수검사
- 언어 선택기 정확히 1개
- 지구 아이콘 정확히 1개
- 현재 언어 선택값 일치
- 8개 뽑기 게임 존재
- 게임도구 5종 존재
- 번호/이름 모드 존재
- 초기 화면 한국어 잔존 검사
- `aria-label/title/placeholder` 한국어 잔존 검사
- 아랍어 RTL 검사
- 영어/일본어/스페인어/중국어/포르투갈어/아랍어 모바일에서 실제 룰렛 실행·결과 확인·게임도구 전환
- 위 6개 해외 언어 모바일 가로 overflow 검사
- 상호작용 후 언어 선택기 중복 재발 검사
- 한국어 모바일에서 공통 언어 선택기 1개, 8개 게임, 5개 도구, 가로 overflow 검사

따라서 저장소 코드와 로컬 Chromium 기준 다국어 기능/문자열 QA Gate는 PASS다.

## 운영 데이터

- 핵심 이벤트: `game_start`, `game_complete`, `reroll`, `exclude_reroll`
- Production D1: `random-ppobgi-analytics`
- Vault snapshot: `자동 사업운영/바이브코딩/페이지형/랜덤뽑기_analytics_latest.json`
- workflow: `hwangje-vault/.github/workflows/random-picker-analytics-snapshot.yml`
- 이름·당첨내용·입력문구·사용자 ID·세션 ID·광고 ID·쿠키는 수집하지 않음
- 최초 검증 snapshot은 표본이 작아 제품 성과로 해석하지 않음

## 사고분리·검증 순서

> 실제 데이터 회수 → 사실 정리 → 원인 가설 → 변경 설계 → 구현 → 독립 QA·회귀검수 → 배포 → 다시 실제 데이터

- 구현 완료와 QA 통과를 구분한다.
- QA 통과와 실제 공개 배포 확인을 구분한다.
- 공개 배포와 실제 시장 성공을 구분한다.
- 내부 QA 통과는 외부 사용성·검색성·수익성을 증명하지 않는다.

## 현재 병목

- 저장소 최신 코드는 정적 QA와 Chromium QA를 통과했다.
- 현재 ChatGPT 실행환경에서는 `random-ppobgi.pages.dev` DNS/공개 URL을 독립적으로 열지 못해 **Cloudflare Pages가 최신 main을 실제 제공하고 있는지는 아직 검증하지 못했다.**
- 따라서 현재 Gate는 `IMPLEMENTED / QA_PASS / LIVE_DEPLOY_UNVERIFIED`다.
- 외부 사용 표본이 아직 작아 제품 개선·확대 판단 근거가 부족하다.
- sitemap의 검색엔진 재처리 결과는 별도 검색 점검에서 확인한다.

## 운영 원칙

- 기존 8개 게임의 결과 로직·애니메이션·효과음·모바일 경험을 근거 없이 임의 변경하지 않음
- 사용자 입력 내용을 분석 서버로 보내지 않음
- 실제 표본이 쌓이기 전 기능 추가를 성급하게 확정하지 않음
- 비용·광고·대규모 기능변경·수익화 방식 변경은 황제 Gate

## 다음 행동

1. Cloudflare Pages가 최신 main을 실제 배포했는지 확인
2. 공개 주소에서 최소 한국어/영어/일본어/스페인어/중국어/포르투갈어/아랍어를 최종 확인
3. 공개 배포 QA가 통과하면 글로벌 다국어 구현을 `LIVE_DEPLOY_VERIFIED`로 승격
4. 이후 Search Console 및 실제 외부 사용 데이터를 회수해 검색·사용 성과를 별도 판단
