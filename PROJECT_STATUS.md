# PROJECT STATUS — random-ppobgi

- 마지막 갱신: 2026-09-02
- 저장소 역할: 랜덤뽑기 웹서비스의 코드·배포·기술상태 원본
- 상위 상태 원본: 황제 Vault `자동 사업운영/바이브코딩/_INDEX.md`
- ChatGPT 실행창: `랜덤뽑기 본부`
- 표준 로컬 경로: `C:/Users/gsh41/Desktop/황제/자동 사업운영/바이브코딩/페이지형/random-ppobgi`

## 현재 상태

**v50 운영본 + 17개 언어 글로벌 공통 완제품 구현 / 해외 언어 클라이언트 로딩 단계 제거 / 최종 정적 QA PASS / 최종 Chromium 다국어·모바일 헤더 QA PASS / 실제 Cloudflare 최신 배포 확인 대기**

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

- Cloudflare Pages `functions/_middleware.js`가 `/en/` 등 16개 해외 언어 요청에서 `context.env.ASSETS.fetch('/')`로 동일한 본체 정적 자산을 edge에서 직접 가져와 첫 HTML 응답으로 제공한다.
- 따라서 production 경로에서는 과거의 `Loading… → full-app-loader.js → /index.html 재요청 → document.write()` 단계를 사용하지 않는다.
- `full-app-loader.js`와 각 언어 route shell은 Pages Functions가 동작하지 않는 정적 fallback으로만 유지한다.
- 16개 해외 언어 카탈로그: `locales.js`
- 공통 해외 현지화 런타임: `i18n-v2.js`
- 단일 언어 선택기: `language-switch.js`
- 정보·법적 페이지 현지화는 `info-i18n.js` 하나만 활성 사용한다. 미사용 병렬 구조였던 `info-locales.js`, `info-page.js`는 최종 감사에서 삭제했다.
- 자동 검수: `.github/workflows/i18n-smoke.yml` + `tests/i18n-browser-smoke.mjs`

2026-09-02 최종 수정·감사:

- 과거 중복 언어 선택기 및 서로 경쟁하던 번역 레이어를 제거하고 공통 선택기/공통 런타임으로 통합
- 언어 선택기는 헤더에 `🌐 + 현재 언어` 형태로 하나만 생성
- 모바일 헤더에서 로고 / 효과음 / 초기화 / 언어 선택기를 한 줄에 유지하도록 크기와 수직 정렬을 통일
- 390px와 360px 폭 모두에서 헤더 요소 겹침·수평 overflow·수직 정렬을 자동 검사
- RTL인 아랍어도 좌우 방향을 가정하지 않는 기하학 검사로 별도 검증
- 16개 해외 언어의 정적 UI, 동적 게임 결과·진행문구, 게임도구, 접근성 `aria-label/title/placeholder` 현지화
- 언어 선택기의 `한국어` 옵션은 정상 기능이므로 해외 UI 한글 잔존 검사 대상에서 명시적으로 제외하고, 본문·접근성 속성의 실제 한글 잔존은 계속 실패 처리
- 동적으로 다시 생성되던 8개 게임명, 폭탄 시간 단위, 직접 입력 접근성 문구 등 잔존 한국어 수정
- 해외 URL의 명시적 `Loading full Random Picker…` 단계를 제거하고 Cloudflare edge에서 본체 HTML을 직접 응답하도록 변경
- 아랍어 RTL 적용
- 언어 URL에 `html lang`, 현지화 title/description, canonical, hreflang + x-default 구조 적용
- `sitemap.xml`에서 한국어 + 16개 해외 언어 URL 검증
- Android Studio가 생성한 `.idea/`, `*.iml` 파일이 저장소 변경으로 잡히지 않도록 `.gitignore` 추가
- 미사용 정보페이지 현지화 중복 파일 `info-locales.js`, `info-page.js` 삭제 및 재발 방지 CI 검사 추가
- README의 옛 실행창 이름과 옛 로컬 경로를 최신 기준으로 수정

## QA 결과

### 최종 정적 QA — PASS

최신 `i18n-smoke`에서 다음을 검사한다.

- JavaScript syntax
- 16개 해외 locale catalog 존재
- 16개 language route fallback 존재
- 해외 언어 production 경로가 `context.env.ASSETS.fetch` 기반 직접 edge-render 구조인지
- production middleware가 `full-app-loader.js`를 사용하지 않는지
- 단일 활성 localization runtime path
- 정보페이지 localization runtime이 `info-i18n.js` 하나뿐인지
- 과거 중복 정보페이지 런타임이 다시 생기지 않았는지
- 8개 게임 + 5개 게임 도구 localization key
- sitemap 17개 언어 URL
- canonical / hreflang / x-default / description 검색 신호

### 최종 Chromium 브라우저 QA — PASS

최종 강화 검수의 기준 run은 `33628544310`이며 static-smoke와 browser-smoke 모두 PASS했다.

- 16개 해외 언어 초기 화면 전수검사
- 언어 선택기 정확히 1개 / 지구 아이콘 정확히 1개 / 현재 언어 선택값 일치
- 8개 뽑기 게임 / 게임도구 5종 / 번호·이름 모드 존재
- 해외 본문 한국어 잔존 검사
- `aria-label/title/placeholder` 한국어 잔존 검사
- 아랍어 RTL 검사
- 영어/일본어/스페인어/중국어/포르투갈어/아랍어에서 실제 룰렛 실행·결과·게임도구 전환
- 위 6개 해외 언어를 390px와 360px 모바일 폭에서 각각 검사
- 모바일 가로 overflow, 헤더 한 줄 정렬, 로고/액션 겹침, 컨트롤 수직 정렬 검사
- 상호작용 후 언어 선택기 중복 재발 검사
- 한국어도 390px와 360px에서 공통 선택기/8개 게임/5개 도구/헤더 정렬/가로 overflow 검사

최종 중복 파일 제거 후에도 같은 CI를 다시 실행해 최신 HEAD가 PASS해야 최종 코드 QA 완료로 유지한다.

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

- 저장소 코드는 최종 감사에서 중복·레거시 정리까지 수행했다.
- 최신 HEAD CI PASS를 마지막으로 회수한다.
- 현재 ChatGPT 실행환경에서는 `random-ppobgi.pages.dev` 공개 URL을 독립적으로 열지 못해 **Cloudflare Pages가 최신 main을 실제 제공하고 있는지는 아직 독립 검증하지 못했다.**
- 따라서 공개화면 확인 전 Gate는 `IMPLEMENTED / QA_PASS / LIVE_DEPLOY_UNVERIFIED`다.
- 외부 사용 표본이 아직 작아 제품 개선·확대 판단 근거가 부족하다.
- sitemap의 검색엔진 재처리 결과는 별도 검색 점검에서 확인한다.

## 운영 원칙

- 기존 8개 게임의 결과 로직·애니메이션·효과음·모바일 경험을 근거 없이 임의 변경하지 않음
- 사용자 입력 내용을 분석 서버로 보내지 않음
- 실제 표본이 쌓이기 전 기능 추가를 성급하게 확정하지 않음
- 비용·광고·대규모 기능변경·수익화 방식 변경은 황제 Gate

## 다음 행동

1. 최종 정리 HEAD의 GitHub Actions static/browser PASS 회수
2. Cloudflare Pages가 최신 main을 실제 배포했는지 공개 화면에서 확인
3. 공개 주소에서 해외 언어 진입 시 `Loading full Random Picker…`가 보이지 않고 모바일 헤더가 한 줄인지 확인
4. 공개 배포 QA가 통과하면 `LIVE_DEPLOY_VERIFIED`로 승격
5. 이후 Search Console 및 실제 외부 사용 데이터를 회수해 검색·사용 성과를 별도 판단
