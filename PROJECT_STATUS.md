# PROJECT STATUS — random-ppobgi

- 마지막 갱신: 2026-09-02
- 저장소 역할: 랜덤뽑기 웹서비스의 코드·배포·기술상태 원본
- 상위 상태 원본: 황제 Vault `자동 사업운영/바이브코딩/_INDEX.md`
- ChatGPT 실행창: `랜덤뽑기 본부`
- 표준 로컬 경로: `C:/Users/gsh41/Desktop/황제/자동 사업운영/바이브코딩/페이지형/random-ppobgi`

## 현재 상태

**v50 운영본 + 17개 언어 글로벌 공통 완제품 구현 / 해외 언어 클라이언트 로딩 단계 제거 / 최종 정적 QA PASS / 최종 Chromium 다국어·모바일 헤더 QA PASS / 모바일 공개화면 최신 배포 확인 / 글로벌 검색 유통 자동화 시작 / 수동 검색엔진 등록은 중앙 운영으로 이관**

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

최신 `i18n-smoke`에서 JavaScript syntax, 16개 locale/route, edge-render 구조, 단일 localization runtime, 정보페이지 runtime 단일화, 8개 게임 + 5개 게임 도구 localization key, sitemap 17개 URL, canonical/hreflang/x-default/description을 검사하고 PASS했다.

### 최종 Chromium 브라우저 QA — PASS

최종 강화 검수에서 16개 해외 언어 초기 화면, 언어 선택기 1개, 지구 아이콘 1개, 현재 언어 선택값, 8개 게임, 5개 도구, 번호·이름 모드, 한글 잔존, 접근성 속성, 아랍어 RTL을 전수검사했다. 영어/일본어/스페인어/중국어/포르투갈어/아랍어는 실제 룰렛 실행·결과·게임도구 전환을 390px와 360px에서 검사했고, 모바일 가로 overflow·헤더 한 줄 정렬·로고/액션 겹침·수직 정렬·중복 선택기 재발까지 PASS했다. 한국어도 390px와 360px에서 동일한 모바일/헤더 검사를 PASS했다.

### 공개 모바일 확인 — PASS

- 2026-09-02 황제가 실제 모바일 공개 URL에서 최신 화면이 정상 반영되고 이동이 잘 되는 것을 확인했다.
- 따라서 모바일 기준 최신 Cloudflare 배포와 헤더/언어 이동은 실제 사용자 확인까지 완료했다.
- PC 공개화면 확인은 별도 보조 확인으로 남아 있으며, 모바일 확인 결과를 PC까지 자동 확장해 단정하지 않는다.

### 번역 자연스러움 검증 — 제한적 PASS

- 황제는 외국어를 직접 정밀 검수하기 어렵기 때문에 눈에 보이는 구조·화면·동작 기준으로 합격 판정했다.
- 코드상 locale 적용, 동적 문구, 접근성 문자열, RTL 및 브라우저 동작은 자동 QA로 검증했다.
- 다만 16개 해외 언어 전체가 원어민 수준으로 자연스럽다는 별도 현지 사용자 검증은 아직 하지 않았다.
- 따라서 현재 판정은 `기능·레이아웃·현지화 적용 PASS / 원어민 자연스러움 미검증`으로 분리한다.

## 검색 유통·색인 배포 — 2026-09-02

- `robots.txt`는 모든 검색엔진 수집 허용 + `sitemap.xml` 위치 명시 상태를 확인했다.
- `sitemap.xml`에는 한국어 루트, 16개 해외 언어 URL, 핵심 정보 페이지를 포함한 총 22개 URL이 들어 있다.
- Google Search Console 등록·소유권 확인은 완료 상태다.
- Bing이 권장하는 IndexNow를 배포 파이프라인에 추가했다.
  - 키 파일: `/5e2e0b34361f1bec6589eecf94582b9f.txt`
  - workflow: `.github/workflows/indexnow-submit.yml`
  - 제품·언어·SEO 관련 파일이 main에 변경되면 sitemap의 전체 URL을 IndexNow에 자동 제출한다.
- 첫 실제 IndexNow 실행 `33634379861`에서 HTTP `202`를 받고 **22개 URL 제출 성공**을 확인했다.
- IndexNow 제출 성공은 색인 완료나 검색 노출을 의미하지 않는다. 실제 색인/노출은 각 검색엔진 결과와 Webmaster 도구 데이터로 별도 검증한다.
- 네이버 서치어드바이저, Daum 검색등록, Bing Webmaster Tools 등 계정 로그인·소유확인·외부 폼 입력이 필요한 등록은 황제 결정에 따라 **랜덤뽑기 본부에서 개별 진행하지 않고 중앙 운영에서 일괄 처리**한다.
- Baidu는 중국어 시장 후보지만 계정/소유확인 기반 등록 Gate로 중앙 검토 대상으로 둔다.
- Yandex Webmaster는 공식 가이드상 자체 도메인 요구가 있어 현재 `pages.dev` 서브도메인 운영 구조에서는 우선 대상에서 제외한다.

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
- 검색엔진 제출과 실제 색인·노출을 구분한다.
- 현지화 적용과 원어민 자연스러움 검증을 구분한다.

## 현재 Gate

- 코드 구현: PASS
- 정적/브라우저 QA: PASS
- 모바일 공개 배포 확인: PASS
- PC 공개화면 확인: 미확인
- 번역 원어민 자연스러움: 미검증
- Google Search Console: VERIFIED
- IndexNow 글로벌 제출: ACTIVE / FIRST_SUBMISSION_PASS
- Naver / Daum / Bing Webmaster / 필요 시 Baidu: CENTRAL_MANUAL_GATE
- 시장 검증: 표본 부족

현재 기술 Gate는 `IMPLEMENTED / QA_PASS / MOBILE_LIVE_VERIFIED / SEARCH_DISTRIBUTION_STARTED`다.

## 중앙 운영 인계

2026-09-02 황제 결정:

- 랜덤뽑기 본부는 제품 코드·QA·배포·제품별 상태와 자동 검색 제출 구조를 담당한다.
- Naver Search Advisor, Daum 검색등록, Bing Webmaster Tools, 필요 시 Baidu 등 **로그인·소유확인·수동 제출이 필요한 검색엔진 등록은 중앙에서 여러 페이지형 제품과 함께 일괄 처리**한다.
- 중앙 등록 완료 결과가 돌아오면 랜덤뽑기 본부는 `PROJECT_STATUS.md`와 Vault에 결과만 반영하고, 실제 색인·유입 데이터로 다음 판단을 한다.

## 운영 원칙

- 기존 8개 게임의 결과 로직·애니메이션·효과음·모바일 경험을 근거 없이 임의 변경하지 않음
- 사용자 입력 내용을 분석 서버로 보내지 않음
- 실제 표본이 쌓이기 전 기능 추가를 성급하게 확정하지 않음
- 비용·광고·대규모 기능변경·수익화 방식 변경은 황제 Gate

## 다음 행동

1. PC 공개화면에서 한 번 최종 확인
2. 중앙 운영에서 Naver / Daum / Bing Webmaster / 필요 시 Baidu 등록을 일괄 처리
3. 중앙 등록 결과를 이 상태파일과 Vault에 동기화
4. Search Console, IndexNow 참여 검색엔진 및 실제 외부 사용 데이터를 회수해 색인·검색유입·사용 성과 판단
5. 실제 데이터 기준으로 Continue / Hold / 개선 판단
