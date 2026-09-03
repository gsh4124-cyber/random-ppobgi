# PROJECT STATUS — random-ppobgi

- 마지막 갱신: 2026-09-03
- 저장소 역할: 랜덤뽑기 웹서비스의 코드·배포·기술상태 원본
- 상위 사업상태: 황제 Vault `자동 사업운영/바이브코딩/_INDEX.md` 및 `페이지형/랜덤뽑기_진행상태.md`
- ChatGPT 실행창: `랜덤뽑기 본부`
- 운영 주소: https://random-ppobgi.pages.dev/

## 현재 단계

**17개 언어 동일 완제품 구조 구현 / 최근 공개 다국어 UI 회귀 수정 / 실제 Cloudflare Pages 공개 Production Browser QA PASS / 검색 유통 구조 활성 / 인간 실사용·원어민 자연스러움 별도 검증**

2026-09-03 황제가 실제 해외 공개 페이지에서 다음 회귀를 직접 확인한 이력이 있다.

- 언어 선택기·지구 아이콘 중복
- 중복 제거 후 언어 선택기 자체 소실
- 일본어/영어 페이지 일부 한국어 잔존
- 언어 선택기 위치가 의도한 헤더/박스 오른쪽 끝과 다르게 표시

관련 수정 후 자동 정적 QA뿐 아니라 **실제 `random-ppobgi.pages.dev` 공개 URL을 여는 Production Browser QA**를 별도 운영한다.

현재 기술상태:

- 8개 게임 + 5개 게임도구 공통 코어: `IMPLEMENTED`
- 한국어 포함 17개 언어 URL: `IMPLEMENTED`
- 정적/로컬 Chromium i18n QA: `PASS`
- 실제 공개 Production Browser QA: `PASS WITH FIXES`
- Cloudflare 배포 commit 일치 확인: `PASS`
- 인간의 최종 시각·체감 확인: `NOT CLAIMED BY AUTOMATION`
- 원어민 번역 자연스러움: `UNVERIFIED`

> 코드 반영 완료 ≠ CI PASS ≠ Cloudflare 배포 완료 ≠ 공개 Production QA PASS ≠ 인간 실사용·시장 성공

## 2026-09-03 공개 Production QA 강화

기존 `Production Browser Smoke`는 공개 URL이 열리기만 하면 테스트를 시작했기 때문에 새 commit의 Cloudflare 배포가 아직 끝나지 않은 순간에 이전 배포본을 새 commit의 PASS로 검사할 가능성이 있었다.

Cloudflare GitHub App이 각 commit에 `Cloudflare Pages` check run을 남기고, 해당 check에는 실제 배포 commit과 배포 성공 여부가 포함되는 것을 확인했다.

따라서 현재 push 기반 Production QA는:

1. 현재 `GITHUB_SHA`의 GitHub check-runs를 조회한다.
2. app slug가 `cloudflare-workers-and-pages`이고 이름이 `Cloudflare Pages`인 check를 기다린다.
3. **현재 commit의 Cloudflare Pages check가 completed + success가 된 뒤에만** 공개 QA를 시작한다.
4. 그 뒤 production alias `https://random-ppobgi.pages.dev`에서 기존 다국어 browser smoke 전체를 실행한다.

최종 확인:
- commit `f85db130468bb3788f43bddc3a6d91751023af1d`
- Cloudflare Pages exact-commit deployment check: **SUCCESS**
- Production Browser Smoke run `33753483863`: **SUCCESS**
- `Wait for Cloudflare Pages deployment of this exact commit`: SUCCESS
- `Wait for public production alias`: SUCCESS
- `Run multilingual behavior QA against production`: SUCCESS

현재 공개 QA는 다음을 자동 검증한다.

- 16개 해외 언어 초기화면
- 대표 `en / ja / es / zh / pt / ar`의 390px·360px 상호작용
- 한국어 모바일/header
- 언어 선택기 정확성·중복 방지
- 초기·동적 UI의 한국어 leakage
- 8개 picker + 5개 game tool 존재
- 번호/이름 모드
- 실행·결과·재추첨 후 pageerror
- 모바일 horizontal overflow
- Arabic RTL

이 PASS는 원어민 문장 자연스러움, 실제 다양한 물리기기의 체감, 인간이 보는 미세한 레이아웃 미감을 자동으로 확정하지 않는다.

## 제품 원칙

- 해외판을 축소형 SEO 미니앱으로 만들지 않는다.
- 모든 언어는 동일한 8개 게임 + 게임도구 완제품을 사용한다.
- 언어별 기능코드 복제를 최소화한다.
- IP 강제 언어 리다이렉트는 사용하지 않는다.
- 고정 언어 URL과 검색 가능한 HTML 구조를 유지한다.
- 검색엔진 제출과 실제 색인·노출·유입을 구분한다.

지원 언어:
`ko / en / ja / es / zh / fr / de / pt / id / hi / pl / it / nl / tr / vi / th / ar`

## 검색 유통

현재 확인된 구조:
- `robots.txt`
- `sitemap.xml`
- Google Search Console 소유확인
- IndexNow 자동 제출 workflow
- Production D1 익명 aggregate 계측

상세 검색생태계는 `GLOBAL_SEARCH_READINESS.md`를 참고하되, 로그인·소유확인·수동 등록의 현재 실행상태는 황제 Vault `검색엔진_등록_상태.md`를 우선한다.

제출 성공 ≠ 크롤링 ≠ 색인 ≠ 노출 ≠ 실제 유입이다.

## 운영 데이터

핵심 이벤트:
- `game_start`
- `game_complete`
- `reroll`
- `exclude_reroll`

Production D1: `random-ppobgi-analytics`

이름·입력문구·당첨내용·사용자 ID·세션 ID·광고 ID·쿠키는 수집하지 않는다.

Vault snapshot:
`자동 사업운영/바이브코딩/페이지형/랜덤뽑기_analytics_latest.json`

## AdSense

현재 상태:
`ADSENSE_PREP / ADDRESSABILITY_UNVERIFIED`

실제 계정에서 `random-ppobgi.pages.dev` 사이트 추가 가능 여부, 제품 완성도, 정보·정책 페이지 정합성을 확인한 뒤 다음 상태로 올린다.

## 다음 행동

1. Production Browser Smoke를 자동 감시로 유지한다.
2. 인간 시각·실기기에서 대표 한국어·영어·일본어와 언어 선택기의 미세한 체감 문제가 있으면 그때만 수정한다.
3. 원어민 자연스러움은 별도 검증으로 남긴다.
4. 다음 상업 Gate인 AdSense 사이트 주소 등록 가능성을 실제 계정에서 확인한다.
5. 수동 검색엔진 등록은 중앙 검색엔진 등록 작업과 동기화한다.

## 사고분리

- 코드 수정 ≠ 자동 QA PASS
- 자동 QA PASS ≠ Cloudflare 배포 완료
- Cloudflare 배포 완료 ≠ 공개 Production QA PASS
- 공개 자동 QA PASS ≠ 인간 실사용·원어민 자연스러움
- 공개 PASS ≠ 검색 성공
- 검색 성공 ≠ 수익 성공

현재 최종 상태:

`IMPLEMENTED / RECENT_REAL-USE_REGRESSION_FIXED / EXACT_CLOUDFLARE_DEPLOYMENT_CONFIRMED / PRODUCTION_BROWSER_QA_PASS / HUMAN_NATIVE_FEEL_UNVERIFIED / SEARCH_DISTRIBUTION_ACTIVE / ADSENSE_PREP`
