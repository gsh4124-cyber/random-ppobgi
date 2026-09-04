# PROJECT STATUS — random-ppobgi

- 마지막 갱신: 2026-09-04
- 저장소 역할: 랜덤뽑기 웹서비스의 실제 코드·배포·기술상태 원본
- 상위 사업상태: 황제 Vault `직장/바이브코딩/_INDEX.md` 및 `직장/바이브코딩/페이지형/_INDEX.md`
- 표준 로컬 경로: `C:/Users/gsh41/Desktop/황제/직장/바이브코딩/페이지형/random-ppobgi`
- ChatGPT 실행창: `랜덤뽑기 본부`
- 운영 주소: https://random-ppobgi.pages.dev/

## 현재 단계

**17개 언어 동일 완제품 구조 구현 / 공개 Production Browser QA 실행선 유지 / 검색 유통 활성 / 인간 실사용·원어민 자연스러움 별도 검증**

현재 기술상태:
- 8개 게임 + 5개 게임도구 공통 코어: `IMPLEMENTED`
- 한국어 포함 17개 언어 URL: `IMPLEMENTED`
- 정적/로컬 Chromium i18n QA: `PASS`
- 실제 공개 Production Browser QA: `PASS WITH FIXES`
- Cloudflare 배포 commit 일치 확인: `PASS`
- 인간의 최종 시각·체감 확인: `NOT CLAIMED BY AUTOMATION`
- 원어민 번역 자연스러움: `UNVERIFIED`

> 코드 반영 완료 ≠ CI PASS ≠ Cloudflare 배포 완료 ≠ 공개 Production QA PASS ≠ 인간 실사용·시장 성공

## 공개 Production QA

과거 공개 해외 페이지에서 언어 선택기 중복·소실, 한국어 잔존, 헤더 위치 회귀가 실제로 발견됐다. 관련 수정 뒤 공개 URL을 직접 검사하는 `Production Browser Smoke`를 운영한다.

새 commit이 아직 배포되지 않았는데 이전 공개본을 새 commit의 PASS로 오인하지 않도록, 현재 push 기반 QA는 **현재 `GITHUB_SHA`에 대한 Cloudflare Pages deployment success를 확인한 뒤** production alias에서 브라우저 검사를 시작한다.

마지막 확정 검증 기준:
- commit `f85db130468bb3788f43bddc3a6d91751023af1d`
- Cloudflare Pages exact-commit deployment check: `SUCCESS`
- Production Browser Smoke run `33753483863`: `SUCCESS`

자동검증 범위에는 대표 다국어 모바일 상호작용, 언어 선택기 중복·한국어 leakage, 8개 picker + 5개 game tool, 실행·결과·재추첨, pageerror, 모바일 overflow 등이 포함된다.

이 PASS는 원어민 문장 자연스러움, 모든 물리기기 체감, 인간이 보는 미세 레이아웃 미감을 확정하지 않는다.

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

현재 구조:
- `robots.txt`
- `sitemap.xml`
- Google Search Console 소유확인
- IndexNow 자동 제출 workflow
- Production D1 익명 aggregate 계측

제품 내부 검색기술 준비는 `GLOBAL_SEARCH_READINESS.md`를 참고한다. 로그인·소유확인·수동 등록의 현재 실행상태는 황제 Vault `직장/바이브코딩/페이지형/검색엔진_등록_상태.md`를 우선한다.

제출 성공 ≠ 크롤링 ≠ 색인 ≠ 노출 ≠ 실제 유입이다.

## 운영 데이터

핵심 aggregate 이벤트:
- `game_start`
- `game_complete`
- `reroll`
- `exclude_reroll`

Production D1: `random-ppobgi-analytics`

이름·입력문구·당첨내용·사용자 ID·세션 ID·광고 ID·쿠키는 수집하지 않는다.

운영관제용 snapshot 원본은 코드 저장소에 복제하지 않고 황제 Vault:
`직장/바이브코딩/페이지형/random-ppobgi_analytics_latest.json`
에 둔다.

## AdSense

현재 상태:
`ADSENSE_PREP / ADDRESSABILITY_UNVERIFIED`

실제 계정에서 `random-ppobgi.pages.dev` 사이트 추가 가능 여부, 제품 완성도, 정보·정책 페이지 정합성을 확인한 뒤 다음 상태로 올린다.

## 다음 행동

1. Production Browser Smoke 자동 감시 유지
2. 인간 시각·실기기에서 실제 회귀가 발견될 때 해당 범위 수정
3. 원어민 자연스러움 별도 검증
4. AdSense 사이트 주소 등록 가능성 실제 계정 확인
5. 수동 검색엔진 등록은 중앙 검색엔진 등록 상태와 동기화

현재 상태:

`IMPLEMENTED / EXACT_CLOUDFLARE_DEPLOYMENT_CONFIRMED / PRODUCTION_BROWSER_QA_PASS / HUMAN_NATIVE_FEEL_UNVERIFIED / SEARCH_DISTRIBUTION_ACTIVE / ADSENSE_PREP`
