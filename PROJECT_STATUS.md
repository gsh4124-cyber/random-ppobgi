# PROJECT STATUS — random-ppobgi

- 마지막 갱신: 2026-09-01
- 저장소 역할: 랜덤뽑기 웹서비스의 코드·배포·기술상태·운영상태 단일 인계 원본
- 상위 영역: 황제 Vault `자동 사업운영/바이브코딩/`
- ChatGPT 통합 관제: `자동 사업운영`
- ChatGPT 실행창: `랜덤뽑기 Work`
- 표준 로컬 경로: `C:/Users/gsh41/Desktop/황제/자동 사업운영/바이브코딩/random-ppobgi`

## 현재 상태

**v50 운영 배포 / 익명 행동데이터 수집 / AI 운영 폐쇄루프 1차 Pilot 진행 중**

- 운영 주소: https://random-ppobgi.pages.dev/
- Cloudflare Pages 배포
- 8개 게임: 사다리 / 룰렛 / 제비 / 핀볼 / 경주 / 캡슐 / 슬롯 / 폭탄
- 번호·이름 입력, 중복 이름 개별 처리, 다시 뽑기, 당첨자 제외 재추첨, 모바일 대응
- Production D1 익명 핵심행동 계측 활성화
- Google Search Console 등록·소유권 확인 완료

## 운영 폐쇄루프

핵심 익명 이벤트:

- `game_start`
- `game_complete`
- `reroll`
- `exclude_reroll`

흐름:

> 브라우저 → `/api/events` → Cloudflare Pages Function → Production D1 → GitHub Actions → private `hwangje-vault` 집계 snapshot → AI 판단

- Production D1: `random-ppobgi-analytics`
- private snapshot: `자동 사업운영/바이브코딩/데이터/random-ppobgi/analytics_latest.json`
- workflow: `hwangje-vault/.github/workflows/random-picker-analytics-snapshot.yml`
- 최근 14일 aggregate만 저장
- 이름·당첨내용·입력문구·사용자 ID·세션 ID·광고 ID·쿠키는 수집하지 않음
- 계측 실패가 게임 동작을 막지 않도록 격리

최초 검증 snapshot은 `game_start 8 / game_complete 6`으로 표본이 매우 작고 QA·본인 테스트가 섞였을 가능성이 있어 제품 성과로 해석하지 않는다. 확인된 것은 **Production D1 → GitHub Actions → private Vault → AI 회수 경로가 실제 작동한다는 것**이다.

## 검색 노출 최근 점검 — 2026-08-31

- Google Search Console에서 홈(`/`), `/about/`, `/guide/` 3개 색인 생성 확인
- 검색 실적 화면 기간 2026-08-19~2026-08-29: 클릭 0, 노출 2, CTR 0%, 평균 게재순위 1 — 극소 표본이라 경쟁력 판단 근거로 쓰지 않음
- `sitemap.xml` 재제출 완료. 당시 기존 `가져올 수 없음` 표시가 남아 있어 처리 성공으로 간주하지 않음
- 공개 sitemap은 HTTP 200, `application/xml`, 6개 URL 제공
- 홈페이지 실제 URL 테스트는 `Google에 등록할 수 있음 / 페이지 색인을 생성할 수 있음` 통과

## 현재 확정 운영원칙

- 기존 8개 게임의 결과 로직·애니메이션·효과음·모바일 경험을 근거 없이 임의 변경하지 않음
- 사용자 입력 내용을 분석 서버로 보내지 않음
- 개인정보 식별·사용자별 행동추적을 하지 않음
- 실제 표본이 쌓이기 전 기능 추가를 성급하게 확정하지 않음
- 지원되지 않는 고유 사용자 수·재방문율·개인별 funnel을 추정하지 않음
- 비용·광고·대규모 기능변경·수익화 방식 변경은 황제 Gate

## 현재 병목·미확인

- 외부 사용 표본이 아직 작아 제품 개선·확대 판단 근거가 부족함
- QA·본인 테스트와 실제 외부 사용을 현재 집계만으로 완전히 분리하지 않음
- sitemap 재처리 성공 여부는 다음 검색 점검에서 재확인 필요
- 코드 자체의 긴급 기술 장애는 현재 확인되지 않음

## 다음 행동

1. 현 운영본과 익명 계측 유지
2. 일일 snapshot 자동 갱신이 반복 실행에서도 정상인지 확인
3. 최신 snapshot에서 먼저 표본 충분성을 판정
4. 충분한 외부 표본이 생기면 게임별 시작·완료·재추첨 사용을 비교해 개선 후보를 최대 3개로 압축
5. 다음 Search Console 점검에서 sitemap 처리 성공·발견 URL 수 확인
6. 의미 있는 구현·QA·배포 변화가 생기면 이 파일을 갱신

## 관련 Vault

- `자동 사업운영/바이브코딩/_INDEX.md`
- `자동 사업운영/바이브코딩/데이터/random-ppobgi/analytics_latest.json`

> 랜덤뽑기의 별도 한글 운영 폴더·운영문서는 만들지 않는다. 제품의 현재 상태와 운영 인계는 이 `PROJECT_STATUS.md`에 합쳐 유지하고, private 집계 데이터만 Vault에 둔다.
