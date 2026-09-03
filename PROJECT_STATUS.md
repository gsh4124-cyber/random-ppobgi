# PROJECT STATUS — random-ppobgi

- 마지막 갱신: 2026-09-03
- 저장소 역할: 랜덤뽑기 웹서비스의 코드·배포·기술상태 원본
- 상위 사업상태: 황제 Vault `자동 사업운영/바이브코딩/_INDEX.md` 및 `페이지형/랜덤뽑기_진행상태.md`
- ChatGPT 실행창: `랜덤뽑기 본부`
- 운영 주소: https://random-ppobgi.pages.dev/

## 현재 단계

**17개 언어 동일 완제품 구조 구현 / 최근 공개 다국어 UI 회귀 확인 / 수정 코드 반영 / 최신 공개 실사용 재검증 필요 / 검색 유통 구조 활성**

과거 자동 정적·Chromium QA와 공개 모바일·PC 확인을 근거로 `LIVE_VERIFIED / RELEASE_APPROVED`까지 올린 이력이 있다.

그러나 그 이후 2026-09-03 황제가 실제 해외 공개 페이지에서 다음 회귀를 직접 확인했다.

- 언어 선택기·지구 아이콘 중복
- 중복 제거 후 언어 선택기 자체 소실
- 일본어/영어 페이지 일부 한국어 잔존
- 언어 선택기 위치가 의도한 헤더/박스 오른쪽 끝과 다르게 표시

이후 관련 코드 수정이 추가됐으므로 **과거 PASS를 현재 빌드 PASS로 승계하지 않는다.**

현재 기술상태:

- 8개 게임 + 5개 게임도구 공통 코어: `IMPLEMENTED`
- 한국어 포함 17개 언어 URL: `IMPLEMENTED`
- 과거 i18n 정적/브라우저 QA: `PAST_PASS`
- 최근 실제 공개화면 회귀: `CONFIRMED`
- 최근 수정: `APPLIED`
- 최신 공개화면 최종 재검증: `REQUIRED`
- 원어민 번역 자연스러움: `UNVERIFIED`

> 코드 반영 완료 ≠ 배포 반영 완료 ≠ 최신 공개 화면 PASS

## 제품 원칙

- 해외판을 축소형 SEO 미니앱으로 만들지 않는다.
- 모든 언어는 동일한 8개 게임 + 게임도구 완제품을 사용한다.
- 언어별 기능코드 복제를 최소화한다.
- IP 강제 언어 리다이렉트는 사용하지 않는다.
- 고정 언어 URL과 검색 가능한 HTML 구조를 유지한다.
- 검색엔진 제출과 실제 색인·노출·유입을 구분한다.

지원 언어:
`ko / en / ja / es / zh / fr / de / pt / id / hi / pl / it / nl / tr / vi / th / ar`

## 최신 공개 QA Gate

최소 실제 재검증:

1. 한국어 루트
2. 영어 `/en/`
3. 일본어 `/ja/`
4. 언어 선택기가 헤더/박스 오른쪽 끝에 정확히 1개인지
5. 지구 아이콘 중복 없음
6. 현재 언어명이 맞게 표시되고 언어 이동 정상인지
7. 대표 해외 화면에 한국어 잔존이 없는지
8. 8개 게임과 5개 도구가 같은 기능으로 표시·실행되는지
9. 번호/이름 모드, 실행·결과·재추첨 동적 문구
10. 모바일 주요 폭에서 헤더 겹침·overflow 없음

대표 언어에서 문제가 발견되면 영향범위를 넓혀 17개 언어 회귀검사를 다시 수행한다.

실제 공개화면 재확인 전에는 `FULL QA PASS`, `LIVE_VERIFIED`, `RELEASE_APPROVED`를 사용하지 않는다.

## 검색 유통

UI 재검증과 검색유통은 별도 축이다.

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

AdSense는 첫 광고형 페이지 사업의 중요 Gate다. 다만 **최신 공개 UI 재검증이 먼저**다.

현재 상태:
`ADSENSE_PREP / ADDRESSABILITY_UNVERIFIED`

실제 계정에서 `random-ppobgi.pages.dev` 사이트 추가 가능 여부, 제품 완성도, 정보·정책 페이지 정합성을 확인한 뒤 다음 상태로 올린다.

## 다음 행동

1. 최신 Cloudflare 공개 배포가 최근 수정 커밋을 반영했는지 확인한다.
2. 한국어·영어·일본어 공개화면과 언어 선택기를 실제로 재검증한다.
3. 남은 한글/중복 UI/위치 문제 발견 시 최소 수정 후 영향범위를 회귀검사한다.
4. 공개 실사용 PASS 뒤 자동 QA와 상태파일을 다시 동기화한다.
5. 그 다음 AdSense 주소 등록 가능성 Gate를 진행한다.
6. 수동 검색엔진 등록은 중앙 검색엔진 등록 작업과 동기화한다.

## 사고분리

- 코드 수정 ≠ 자동 QA PASS
- 자동 QA PASS ≠ 공개 배포 PASS
- 과거 공개 PASS ≠ 최신 수정본 PASS
- 공개 PASS ≠ 검색 성공
- 검색 성공 ≠ 수익 성공

현재 최종 상태:

`IMPLEMENTED / RECENT_REAL-USE_REGRESSION_FOUND / FIXES_APPLIED / PUBLIC_REVERIFY_REQUIRED / SEARCH_DISTRIBUTION_ACTIVE / ADSENSE_PREP`
