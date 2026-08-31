# PROJECT STATUS — 랜덤뽑기

- 마지막 갱신: 2026-09-01
- 저장소 역할: 실제 랜덤뽑기 웹서비스 코드·배포 단일 원본
- 운영 소속: 황제 Vault `자동 사업운영/바이브코딩/00 본부/random-ppobgi_운영.md`
- ChatGPT 통합 관제: `자동 사업운영`
- ChatGPT 실행창: `랜덤뽑기 Work`
- 표준 로컬 경로: `C:/Users/gsh41/Desktop/황제/자동 사업운영/바이브코딩/random-ppobgi`

## 현재 구현 상태

- v50 운영 배포 상태
- 운영 주소: https://random-ppobgi.pages.dev/
- 8개 게임: 사다리 / 룰렛 / 제비 / 핀볼 / 경주 / 캡슐 / 슬롯 / 폭탄
- Cloudflare Pages 배포
- Production D1 익명 핵심행동 계측 활성화
- D1 → `hwangje-vault` 일일 aggregate snapshot bridge 검증 완료

## 최근 완료

- 익명 행동계측 Production 동작 확인
- D1 aggregate snapshot을 황제 Vault로 전달하는 자동 경로 작동 확인
- 한글 `랜덤뽑기/` Vault 폴더를 제거하고 운영상태·실험·데이터를 `00 본부`와 `데이터/random-ppobgi/`로 재배치
- 코드 작업 원본과 로컬 위치를 `random-ppobgi` 하나로 통일

## 현재 병목·미확인

- 외부 사용 표본이 아직 작아 제품 개선·확대 판단 근거가 부족함
- QA·본인 테스트와 실제 외부 사용을 현재 집계만으로 완전히 분리하지 않음
- 코드 자체의 긴급 기술 장애는 현재 확인되지 않음

## 다음 기술 행동

- 현 운영본과 계측을 유지
- 의미 있는 외부 표본이 쌓이기 전 근거 없는 기능 추가를 하지 않음
- 실제 기술 수정·배포가 발생하면 이 파일을 함께 갱신

## 관련 Vault Canonical

- `자동 사업운영/바이브코딩/00 본부/random-ppobgi_운영.md`
- `자동 사업운영/바이브코딩/00 본부/random-ppobgi_AI_운영_폐쇄루프_1차실험.md`
- `자동 사업운영/바이브코딩/데이터/random-ppobgi/analytics_latest.json`

> 이 파일은 코드 전체를 다시 읽지 않고 현재 기술 진행 위치를 회수하기 위한 인계파일이다. 사업 판단의 최종 Canonical은 황제 Vault에 둔다.
